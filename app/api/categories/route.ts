import { NextResponse } from 'next/server';

const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY;
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;

export async function GET() {
  if (!ADZUNA_API_KEY || !ADZUNA_APP_ID) {
    return NextResponse.json({ error: 'API credentials not configured' }, { status: 500 });
  }

  const apiUrl = `https://api.adzuna.com/v1/api/jobs/gb/categories?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

