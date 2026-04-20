import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const city = searchParams.get('city');

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Weather API key not configured' }, { status: 500 });
  }

  try {
    let url: string;
    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    } else {
      return Response.json({ error: 'Provide lat/lon or city' }, { status: 400 });
    }

    const res = await fetch(url, { next: { revalidate: 1800 } });

    if (!res.ok) {
      throw new Error(`Weather API returned ${res.status}`);
    }

    const data = await res.json();

    return Response.json({
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      description: data.weather?.[0]?.description || '',
      icon: data.weather?.[0]?.icon || '',
      wind_speed: data.wind.speed,
      city: data.name,
      country: data.sys.country,
      rain: data.rain?.['1h'] || 0,
      clouds: data.clouds.all,
      lat: data.coord.lat,
      lon: data.coord.lon,
    });
  } catch (error) {
    console.error('Weather error:', error);
    return Response.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
