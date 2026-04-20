import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';

  const apiKey = process.env.PERENUAL_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://perenual.com/api/pest-disease-list?key=${apiKey}&page=${page}`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) {
      throw new Error(`Disease API returned ${res.status}`);
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('Disease error:', error);
    return Response.json(
      { error: 'Failed to fetch disease data' },
      { status: 500 }
    );
  }
}
