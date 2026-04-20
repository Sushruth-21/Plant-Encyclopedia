import {
  PlantListResponse,
  PlantDetails,
  CareGuideResponse,
  PestDiseaseResponse,
  WeatherAPIResponse,
  WeatherData,
} from '@/types/plant';

const PERENUAL_BASE = 'https://perenual.com/api';
const WEATHER_BASE = 'https://api.openweathermap.org/data/2.5';

// ========================================
// Perenual API Functions
// ========================================

export async function searchPlants(
  query: string,
  page: number = 1
): Promise<PlantListResponse> {
  const apiKey = process.env.PERENUAL_API_KEY;
  if (!apiKey) throw new Error('PERENUAL_API_KEY not configured');

  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    page: page.toString(),
  });

  const res = await fetch(`${PERENUAL_BASE}/v2/species-list?${params}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Perenual API error: ${res.status}`);
  }

  return res.json();
}

export async function getPlantDetails(id: number): Promise<PlantDetails> {
  const apiKey = process.env.PERENUAL_API_KEY;
  if (!apiKey) throw new Error('PERENUAL_API_KEY not configured');

  const res = await fetch(
    `${PERENUAL_BASE}/v2/species/details/${id}?key=${apiKey}`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    throw new Error(`Perenual API error: ${res.status}`);
  }

  return res.json();
}

export async function getCareGuide(
  speciesId: number
): Promise<CareGuideResponse> {
  const apiKey = process.env.PERENUAL_API_KEY;
  if (!apiKey) throw new Error('PERENUAL_API_KEY not configured');

  const params = new URLSearchParams({
    key: apiKey,
    species_id: speciesId.toString(),
  });

  const res = await fetch(
    `${PERENUAL_BASE}/species-care-guide-list?${params}`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    throw new Error(`Perenual API error: ${res.status}`);
  }

  return res.json();
}

export async function getPestDiseases(
  page: number = 1
): Promise<PestDiseaseResponse> {
  const apiKey = process.env.PERENUAL_API_KEY;
  if (!apiKey) throw new Error('PERENUAL_API_KEY not configured');

  const params = new URLSearchParams({
    key: apiKey,
    page: page.toString(),
  });

  const res = await fetch(`${PERENUAL_BASE}/pest-disease-list?${params}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error(`Perenual API error: ${res.status}`);
  }

  return res.json();
}

// ========================================
// OpenWeatherMap API Functions
// ========================================

export async function getWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) throw new Error('OPENWEATHER_API_KEY not configured');

  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    appid: apiKey,
    units: 'metric',
  });

  const res = await fetch(`${WEATHER_BASE}/weather?${params}`, {
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error(`OpenWeather API error: ${res.status}`);
  }

  const data: WeatherAPIResponse = await res.json();

  return {
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
    description: data.weather[0]?.description || '',
    icon: data.weather[0]?.icon || '',
    wind_speed: data.wind.speed,
    city: data.name,
    country: data.sys.country,
    rain: data.rain?.['1h'],
    clouds: data.clouds.all,
  };
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) throw new Error('OPENWEATHER_API_KEY not configured');

  const params = new URLSearchParams({
    q: city,
    appid: apiKey,
    units: 'metric',
  });

  const res = await fetch(`${WEATHER_BASE}/weather?${params}`, {
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error(`OpenWeather API error: ${res.status}`);
  }

  const data: WeatherAPIResponse = await res.json();

  return {
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
    description: data.weather[0]?.description || '',
    icon: data.weather[0]?.icon || '',
    wind_speed: data.wind.speed,
    city: data.name,
    country: data.sys.country,
    rain: data.rain?.['1h'],
    clouds: data.clouds.all,
  };
}
