/**
 * Wikipedia Image Fetcher
 * 
 * Fetches plant images from Wikipedia's REST API using the plant's
 * scientific name or common name. Cached by Next.js revalidate.
 */

// In-memory cache to avoid re-fetching within the same server lifecycle
const imageCache = new Map<string, string | null>();

// Manual overrides for plants whose Wikipedia page returns wrong/generic images
const IMAGE_OVERRIDES: Record<string, string> = {
  'rosa': 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Rose_Carmen_%E3%83%90%E3%83%A9_%E3%82%AB%E3%83%AL%E3%83%A1%E3%83%B3_%286902618905%29.jpg',
  'rose': 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Rose_Carmen_%E3%83%90%E3%83%A9_%E3%82%AB%E3%83%AL%E3%83%A1%E3%83%B3_%286902618905%29.jpg',
};

/**
 * Fetch a plant image URL from Wikipedia by name.
 * Tries scientific name first, then common name, then with "(plant)" suffix.
 * Returns a direct Wikimedia Commons URL or null.
 */
export async function fetchWikipediaImage(
  scientificName?: string,
  commonName?: string
): Promise<string | null> {
  // Build query list: scientific name, common name, and "(plant)" variants
  const queries: string[] = [];
  if (scientificName) queries.push(scientificName);
  if (commonName) {
    queries.push(commonName);
    queries.push(`${commonName} (plant)`);
  }

  // Check manual overrides first
  for (const q of queries) {
    const override = IMAGE_OVERRIDES[q.toLowerCase()];
    if (override) return override;
  }

  // Check combined cache key
  const cacheKey = queries.join('|').toLowerCase();
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey) || null;

  for (const query of queries) {
    try {
      const encoded = encodeURIComponent(query.replace(/\s+/g, '_'));
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`,
        {
          headers: { 'User-Agent': 'FloraBase/1.0 (plant-encyclopedia)' },
          next: { revalidate: 86400 }, // Cache for 24h
        }
      );

      if (res.ok) {
        const data = await res.json();
        const imageUrl =
          data.originalimage?.source ||
          data.thumbnail?.source?.replace(/\/\d+px-/, '/800px-') ||
          null;

        if (imageUrl) {
          imageCache.set(cacheKey, imageUrl);
          return imageUrl;
        }
      }
    } catch {
      // Silently continue to next query
    }
  }

  imageCache.set(cacheKey, null);
  return null;
}

/**
 * Batch-fetch Wikipedia images for multiple plants.
 * Skips plants that already have valid images.
 */
export async function enrichWithWikipediaImages(
  plants: any[]
): Promise<any[]> {
  const promises = plants.map(async (plant) => {
    // Skip if plant already has a valid image
    const existingImg =
      plant.default_image?.original_url ||
      plant.default_image?.medium_url ||
      plant.default_image?.regular_url;

    // Skip if image exists and is NOT a Pixabay URL (which is blocked)
    if (existingImg && !existingImg.includes('cdn.pixabay.com')) {
      return plant;
    }

    try {
      const imageUrl = await fetchWikipediaImage(
        plant.scientific_name?.[0],
        plant.common_name
      );

      if (imageUrl) {
        return {
          ...plant,
          default_image: {
            ...(plant.default_image || {}),
            image_id: 0,
            license: 0,
            license_name: 'Wikipedia',
            license_url: '',
            original_url: imageUrl,
            regular_url: imageUrl,
            medium_url: imageUrl,
            small_url: imageUrl,
            thumbnail: imageUrl,
          },
        };
      }
    } catch {
      // Keep original
    }

    return plant;
  });

  // Run in parallel batches of 10 to avoid overwhelming Wikipedia
  const results: any[] = [];
  for (let i = 0; i < promises.length; i += 10) {
    const batch = promises.slice(i, i + 10);
    const batchResults = await Promise.allSettled(batch);
    for (const r of batchResults) {
      results.push(r.status === 'fulfilled' ? r.value : plants[results.length]);
    }
  }

  return results;
}
