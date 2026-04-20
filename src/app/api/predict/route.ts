import { type NextRequest } from 'next/server';
import { getSeason, scorePlant } from '@/lib/prediction';
import { PlantListItem } from '@/types/plant';
import { smartGenerateText } from '@/lib/ai-provider';

/**
 * Indian regional plant queries mapped by state/region.
 * These are common plants grown in each specific Indian state,
 * used to seed the Perenual database search for relevant results.
 */
const INDIA_REGIONAL_PLANTS: Record<string, string[]> = {
  // Goa
  goa: ['coconut', 'cashew', 'mango', 'jackfruit', 'banana', 'hibiscus', 'jasmine'],
  // Karnataka  
  karnataka: ['sandalwood', 'coffee', 'ragi', 'jasmine', 'turmeric', 'coconut', 'areca palm'],
  // Tamil Nadu
  'tamil nadu': ['neem', 'banana', 'coconut', 'rice', 'jasmine', 'hibiscus', 'tulsi'],
  // Gujarat
  gujarat: ['cotton', 'groundnut', 'mango', 'neem', 'tulsi', 'marigold', 'aloe vera'],
  // Kerala
  kerala: ['pepper', 'cardamom', 'coconut', 'rubber', 'banana', 'turmeric', 'ginger'],
  // Telangana
  telangana: ['rice', 'cotton', 'turmeric', 'chili', 'marigold', 'neem', 'mango'],
  // Andhra Pradesh
  'andhra pradesh': ['rice', 'chili', 'cotton', 'mango', 'coconut', 'jasmine', 'neem'],
};

/**
 * General tropical / Indian climate plant queries
 */
const TROPICAL_QUERIES = {
  indoor: ['tulsi', 'aloe', 'money plant', 'fern', 'snake plant', 'peace lily', 'jade'],
  outdoor: ['hibiscus', 'jasmine', 'mango', 'neem', 'marigold', 'rose', 'banana', 'coconut', 'tulsi'],
};

/**
 * Detect if coordinates are in India and find closest region.
 */
function detectIndianRegion(lat: number, lon: number): string | null {
  // Rough bounding box for India: lat 6-36, lon 68-98
  if (lat < 6 || lat > 36 || lon < 68 || lon > 98) return null;

  const regions: { name: string; lat: number; lon: number }[] = [
    { name: 'goa', lat: 15.4, lon: 73.9 },
    { name: 'karnataka', lat: 14.5, lon: 75.7 },
    { name: 'tamil nadu', lat: 11.1, lon: 78.7 },
    { name: 'gujarat', lat: 22.3, lon: 71.2 },
    { name: 'kerala', lat: 10.9, lon: 76.3 },
    { name: 'telangana', lat: 17.4, lon: 78.5 },
    { name: 'andhra pradesh', lat: 15.9, lon: 79.7 },
  ];

  let closest = regions[0];
  let minDist = Infinity;

  for (const r of regions) {
    const dist = Math.sqrt(Math.pow(lat - r.lat, 2) + Math.pow(lon - r.lon, 2));
    if (dist < minDist) {
      minDist = dist;
      closest = r;
    }
  }

  return closest.name;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, lat, lon, environment } = body;

    if (!date || lat === undefined || lon === undefined || !environment) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.PERENUAL_API_KEY;
    const weatherKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey || !weatherKey) {
      return Response.json({ error: 'API keys not configured' }, { status: 500 });
    }

    // 1. Fetch weather data
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`
    );

    if (!weatherRes.ok) {
      throw new Error('Failed to fetch weather');
    }

    const weatherRaw = await weatherRes.json();
    const weather = {
      temp: weatherRaw.main.temp,
      feels_like: weatherRaw.main.feels_like,
      humidity: weatherRaw.main.humidity,
      description: weatherRaw.weather?.[0]?.description || '',
      icon: weatherRaw.weather?.[0]?.icon || '',
      wind_speed: weatherRaw.wind.speed,
      city: weatherRaw.name,
      country: weatherRaw.sys.country,
      rain: weatherRaw.rain?.['1h'] || 0,
      clouds: weatherRaw.clouds.all,
    };

    // 2. Determine season
    const plantDate = new Date(date);
    const season = getSeason(plantDate, lat);

    // 3. Build smart query list based on location
    let queries: string[];
    const indianRegion = detectIndianRegion(lat, lon);

    if (indianRegion && INDIA_REGIONAL_PLANTS[indianRegion]) {
      // Use regional plant names for Indian states
      const regional = INDIA_REGIONAL_PLANTS[indianRegion];
      const tropical = TROPICAL_QUERIES[environment as keyof typeof TROPICAL_QUERIES] || TROPICAL_QUERIES.outdoor;
      // Combine regional + tropical, remove duplicates
      queries = [...new Set([...regional, ...tropical])];
      console.log(`[Predict] Detected Indian region: ${indianRegion} → ${queries.length} queries`);
    } else if (lat >= 6 && lat <= 36 && lon >= 68 && lon <= 98) {
      // Generic India (not matched to a specific state)
      queries = TROPICAL_QUERIES[environment as keyof typeof TROPICAL_QUERIES] || TROPICAL_QUERIES.outdoor;
    } else {
      // Non-India locations: use original generic queries
      queries = environment === 'indoor'
        ? ['houseplant', 'indoor', 'fern', 'succulent']
        : ['garden', 'flower', 'vegetable', 'herb'];
    }

    // 4. Fetch plants from Perenual — query in parallel batches
    const plantPromises = queries.map((q) =>
      fetch(`https://perenual.com/api/v2/species-list?key=${apiKey}&q=${encodeURIComponent(q)}`)
        .then((r) => r.ok ? r.json() : { data: [] })
        .catch(() => ({ data: [] }))
    );

    const plantResults = await Promise.all(plantPromises);
    const allPlants: PlantListItem[] = plantResults.flatMap((r) => r.data || []);

    if (allPlants.length === 0) {
      return Response.json({
        weather,
        season,
        region: indianRegion,
        recommendations: [],
        aiInsight: "We couldn't find plant data for your area right now. Please try again later.",
      });
    }

    // 5. Remove duplicates by ID
    const uniquePlants = Array.from(
      new Map(allPlants.map((p) => [p.id, p])).values()
    );

    // 6. Score and rank
    const scored = uniquePlants
      .map((plant: PlantListItem) => {
        const { score, reasons } = scorePlant(plant, weather, season, environment);
        return { plant, score, reasons };
      })
      .filter((r) => r.score > 0) // Only show plants with at least some match
      .sort((a, b) => b.score - a.score)
      .slice(0, 6); // Show top 6 instead of just 3

    // 7. Generate AI insight (smart racing)
    let aiInsight = "";
    const regionLabel = indianRegion 
      ? `${indianRegion.charAt(0).toUpperCase() + indianRegion.slice(1)}, India`
      : weather.city;

    try {
      const { text, provider } = await smartGenerateText({
        system: "You are an expert horticultural advisor specializing in Indian and tropical agriculture.",
        prompt: `Based on a current temperature of ${weather.temp}°C, ${weather.description} conditions, and the ${season} season in ${regionLabel}, give a 2-sentence realistic advice for growing ${environment} plants in this specific climate. Mention any region-specific tips if relevant.`,
      });
      aiInsight = text;
      console.log(`[Predict] AI insight via ${provider}`);
    } catch (error) {
      console.warn("[Predict] AI insight generation failed");
      aiInsight = `Current conditions: ${Math.round(weather.temp)}°C, ${weather.description}. The ${season} season is a great time for ${environment} planting in ${regionLabel}.`;
    }

    return Response.json({
      weather,
      season,
      region: indianRegion,
      recommendations: scored,
      aiInsight,
    });
  } catch (error) {
    console.error('Prediction error:', error);
    return Response.json(
      { error: 'Failed to generate predictions' },
      { status: 500 }
    );
  }
}
