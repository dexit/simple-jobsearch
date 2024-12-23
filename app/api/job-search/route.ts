import { NextResponse } from 'next/server';

const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY;
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const what = searchParams.get('what') || '';
  const where = searchParams.get('where') || '';
  const category = searchParams.get('category');
  const contract_type = searchParams.get('contract_type');
  const distance = searchParams.get('distance') || '10';
  const salary_min = searchParams.get('salary_min') || '';
  const page = searchParams.get('page') || '1';

  if (!ADZUNA_API_KEY || !ADZUNA_APP_ID) {
    return NextResponse.json({ error: 'API credentials not configured' }, { status: 500 });
  }

  let apiUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=10&what=${what}&where=${where}&distance=${distance}`;

  if (category) apiUrl += `&category=${category}`;
  if (contract_type) apiUrl += `&contract_type=${contract_type}`;
  if (salary_min) apiUrl += `&salary_min=${salary_min}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

