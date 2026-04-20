import { type NextRequest } from 'next/server';
import { smartGenerateText, getProviderName } from '@/lib/ai-provider';
import { searchLocalPlants, localPlantToListItem } from '@/lib/plant-database';
import { enrichWithWikipediaImages } from '@/lib/wikipedia-images';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const page = searchParams.get('page') || '1';
  const lang = searchParams.get('lang') || 'English';

  if (!query) {
    return Response.json({ error: 'Query parameter required' }, { status: 400 });
  }

  let finalQuery = query;

  // ── AI Translation for non-English queries ──
  if (lang !== 'English' && query) {
    try {
      const { text, provider } = await smartGenerateText({
        prompt: `The user searched for a plant name "${query}" in "${lang}". 
If this is a botanical/scientific name, return it exactly.
If it is a local/common name, translate to the most accurate English common name.
ONLY return the English name(s) separated by comma. No extra text.`,
      });
      console.log(`[Search] Translated "${query}" → "${text.trim()}" via ${provider}`);
      if (text && text.trim()) finalQuery = text.trim();
    } catch (error) {
      console.warn('[Search] AI translation failed, using original query');
    }
  }

  // ── 1. Local Database (instant, always reliable) ──
  const localResults = searchLocalPlants(query);
  const localByFinal = finalQuery !== query ? searchLocalPlants(finalQuery) : [];
  
  const localMap = new Map<string, any>();
  for (const p of [...localResults, ...localByFinal]) {
    if (!localMap.has(p.id)) localMap.set(p.id, localPlantToListItem(p));
  }
  const localItems = Array.from(localMap.values());

  // ── 2. Perenual API (30,000+ species) ──
  let perenualItems: any[] = [];
  let perenualLastPage = 1;

  const perenualKey = process.env.PERENUAL_API_KEY;
  if (perenualKey) {
    try {
      const params = new URLSearchParams({ key: perenualKey, q: finalQuery, page });
      const res = await fetch(`https://perenual.com/api/v2/species-list?${params}`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const data = await res.json();
        perenualItems = data.data || [];
        perenualLastPage = data.last_page || 1;
      } else {
        console.warn(`[Search] Perenual returned ${res.status}`);
      }
    } catch (error) {
      console.warn('[Search] Perenual API error:', error);
    }
  }

  // ── 3. Trefle API (417,000+ species) ──
  let trefleItems: any[] = [];

  const trefleToken = process.env.TREFLE_API_KEY;
  if (trefleToken && page === '1') {
    // Only fetch Trefle on page 1 to supplement results
    try {
      const res = await fetch(
        `https://trefle.io/api/v1/plants/search?q=${encodeURIComponent(finalQuery)}&token=${trefleToken}&page=1`,
        { next: { revalidate: 3600 } }
      );
      if (res.ok) {
        const data = await res.json();
        trefleItems = (data.data || []).map((plant: any) => ({
          id: `trefle-${plant.id}`,
          common_name: plant.common_name || plant.scientific_name || 'Unknown',
          scientific_name: [plant.scientific_name || ''],
          other_name: plant.synonyms || [],
          family: plant.family || null,
          cycle: plant.duration?.[0] || '',
          watering: '',
          sunlight: [],
          default_image: plant.image_url ? {
            image_id: 0,
            license: 0,
            license_name: 'Trefle',
            license_url: '',
            original_url: plant.image_url,
            regular_url: plant.image_url,
            medium_url: plant.image_url,
            small_url: plant.image_url,
            thumbnail: plant.image_url,
          } : null,
        }));
        console.log(`[Search] Trefle returned ${trefleItems.length} results`);
      }
    } catch (error) {
      console.warn('[Search] Trefle API error:', error);
    }
  }

  // ── 4. Merge all sources ──
  let mergedData: any[];

  if (page === '1') {
    // Deduplicate by common_name AND scientific_name (case insensitive)
    const seenNames = new Set<string>();
    const seenSci = new Set<string>();
    const deduped: any[] = [];

    // Priority order: local → Perenual → Trefle
    for (const item of [...localItems, ...perenualItems, ...trefleItems]) {
      const nameKey = (item.common_name || '').toLowerCase();
      const sciKey = (item.scientific_name?.[0] || '').toLowerCase();
      
      if (nameKey && seenNames.has(nameKey)) continue;
      if (sciKey && seenSci.has(sciKey)) continue;
      
      if (nameKey) seenNames.add(nameKey);
      if (sciKey) seenSci.add(sciKey);
      deduped.push(item);
    }
    mergedData = deduped;
  } else {
    mergedData = perenualItems;
  }

  // ── 5. Relevance ranking (images + name match) ──
  if (mergedData.length > 0) {
    const lowerQuery = query.toLowerCase();
    const lowerFinal = finalQuery.toLowerCase();

    mergedData.sort((a: any, b: any) => {
      const aCommon = a.common_name?.toLowerCase() || '';
      const bCommon = b.common_name?.toLowerCase() || '';
      const aSci = a.scientific_name?.[0]?.toLowerCase() || '';
      const bSci = b.scientific_name?.[0]?.toLowerCase() || '';

      // Exact match priority
      const aExact = aCommon === lowerQuery || aCommon === lowerFinal;
      const bExact = bCommon === lowerQuery || bCommon === lowerFinal;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      // Scientific match
      const aExactSci = aSci === lowerQuery || aSci === lowerFinal;
      const bExactSci = bSci === lowerQuery || bSci === lowerFinal;
      if (aExactSci && !bExactSci) return -1;
      if (!aExactSci && bExactSci) return 1;

      // Starts with
      const aStarts = aCommon.startsWith(lowerQuery) || aCommon.startsWith(lowerFinal);
      const bStarts = bCommon.startsWith(lowerQuery) || bCommon.startsWith(lowerFinal);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      // Prioritize results WITH images over those without
      const aHasImg = !!(a.default_image?.original_url || a.default_image?.medium_url);
      const bHasImg = !!(b.default_image?.original_url || b.default_image?.medium_url);
      if (aHasImg && !bHasImg) return -1;
      if (!aHasImg && bHasImg) return 1;

      return 0;
    });
  }

  const effectiveLastPage = Math.max(perenualLastPage, 1);

  // ── 6. Enrich results with Wikipedia images (replaces broken Pixabay URLs) ──
  const enrichedData = await enrichWithWikipediaImages(mergedData);

  return Response.json({
    data: enrichedData,
    current_page: parseInt(page),
    last_page: effectiveLastPage,
    total: enrichedData.length,
    from: 1,
    to: enrichedData.length,
    per_page: 30,
  });
}
