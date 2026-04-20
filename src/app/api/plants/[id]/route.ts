import { type NextRequest } from 'next/server';
import { getLocalPlant, localPlantToDetails } from '@/lib/plant-database';
import { fetchWikipediaImage } from '@/lib/wikipedia-images';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // ── 1. Check if this is a local plant ──
  if (id.startsWith('local-')) {
    const localPlant = getLocalPlant(id);
    if (localPlant) {
      const details = localPlantToDetails(localPlant);
      
      // Replace blocked Pixabay URLs with Wikipedia images
      const imgUrl = details.default_image?.original_url || '';
      if (!imgUrl || imgUrl.includes('cdn.pixabay.com')) {
        const wikiImg = await fetchWikipediaImage(
          localPlant.scientific_name[0],
          localPlant.common_name
        );
        if (wikiImg) {
          details.default_image = {
            original_url: wikiImg,
            regular_url: wikiImg,
            medium_url: wikiImg,
          };
          details.images = [wikiImg];
        }
      }
      
      return Response.json(details);
    }
    return Response.json({ error: 'Plant not found' }, { status: 404 });
  }

  // ── 2. Check if this is a Trefle plant ──
  if (id.startsWith('trefle-')) {
    const trefleId = id.replace('trefle-', '');
    const trefleToken = process.env.TREFLE_API_KEY;
    if (!trefleToken) {
      return Response.json({ error: 'Trefle API key not configured' }, { status: 500 });
    }

    try {
      const res = await fetch(
        `https://trefle.io/api/v1/species/${trefleId}?token=${trefleToken}`,
        { next: { revalidate: 86400 } }
      );
      if (!res.ok) {
        return Response.json({ error: 'Plant not found on Trefle' }, { status: 404 });
      }
      const raw = await res.json();
      const sp = raw.data || raw;

      // Normalize Trefle response to our app format
      return Response.json({
        id: id,
        common_name: sp.common_name || sp.scientific_name || 'Unknown',
        scientific_name: [sp.scientific_name || ''],
        other_name: sp.synonyms?.map((s: any) => s.name || s) || [],
        family: sp.family?.name || sp.family_common_name || null,
        origin: sp.distributions?.native?.map((d: any) => d.name) || [],
        type: sp.rank || 'Species',
        cycle: sp.duration?.[0] || '',
        watering: '',
        sunlight: sp.light != null ? (sp.light > 6 ? ['Full Sun'] : sp.light > 3 ? ['Part Shade'] : ['Shade']) : [],
        soil: [],
        pruning_month: [],
        growth_rate: sp.growth_rate || '',
        maintenance: '',
        care_level: '',
        hardiness: { min: String(sp.minimum_temperature?.deg_c ?? ''), max: String(sp.maximum_temperature?.deg_c ?? '') },
        flowers: sp.flower?.color ? true : false,
        flowering_season: sp.bloom_months?.join(', ') || null,
        fruits: sp.fruit_or_seed ? true : false,
        edible_fruit: sp.edible ? true : false,
        harvest_season: null,
        indoor: false,
        medicinal: false,
        poisonous_to_humans: sp.toxicity ? true : false,
        poisonous_to_pets: sp.toxicity ? true : false,
        drought_tolerant: sp.drought_tolerance ? true : false,
        invasive: false,
        tropical: false,
        pest_susceptibility: null,
        description: sp.observations || sp.bibliography || `${sp.common_name || sp.scientific_name} is a species in the ${sp.family?.name || 'plant'} family.`,
        default_image: sp.image_url ? {
          original_url: sp.image_url,
          regular_url: sp.image_url,
          medium_url: sp.image_url,
        } : null,
        care_guide: [],
        attracts: [],
        propagation: [],
      });
    } catch (error) {
      console.error('Trefle details error:', error);
      return Response.json({ error: 'Failed to fetch from Trefle' }, { status: 500 });
    }
  }

  // ── 2. Fetch from Perenual API ──
  const apiKey = process.env.PERENUAL_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const detailsRes = await fetch(
      `https://perenual.com/api/v2/species/details/${id}?key=${apiKey}`,
      { next: { revalidate: 86400 } }
    );

    if (!detailsRes.ok) {
      if (detailsRes.status === 404) {
        return Response.json({ error: 'Plant not found in database.' }, { status: 404 });
      }
      if (detailsRes.status === 429) {
        return Response.json(
          { error: 'API rate limit reached. Please wait a moment and try again.' },
          { status: 429 }
        );
      }
      throw new Error(`Details API returned ${detailsRes.status}`);
    }

    const details = await detailsRes.json();

    // Care guide is optional — don't fail if it breaks
    let care_guide: any[] = [];
    try {
      const careRes = await fetch(
        `https://perenual.com/api/v2/species-care-guide-list?key=${apiKey}&species_id=${id}`,
        { next: { revalidate: 86400 } }
      );
      // Only parse if response is actually JSON (API sometimes returns HTML error pages)
      const contentType = careRes.headers.get('content-type') || '';
      if (careRes.ok && contentType.includes('application/json')) {
        const careData = await careRes.json();
        care_guide = careData.data?.[0]?.section || [];
      }
    } catch (careError) {
      // Silently ignore — care guide is non-critical
    }

    // Build multi-image array for carousel
    const images: string[] = [];
    if (details.default_image) {
      if (details.default_image.original_url) images.push(details.default_image.original_url);
      if (details.default_image.regular_url && details.default_image.regular_url !== details.default_image.original_url) {
        images.push(details.default_image.regular_url);
      }
    }
    // Some Perenual responses have additional image fields
    if (details.other_images && Array.isArray(details.other_images)) {
      for (const img of details.other_images) {
        if (img.original_url) images.push(img.original_url);
      }
    }

    return Response.json({ ...details, care_guide, images });
  } catch (error) {
    console.error('Plant details error:', error);
    return Response.json(
      { error: 'Failed to fetch plant details. The API may be temporarily unavailable.' },
      { status: 500 }
    );
  }
}
