import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/quote?symbol=XYZ
 *
 * Fetches the latest price and percent change for the given ticker
 * symbol. If an Alpha Vantage API key is provided in the environment
 * (ALPHA_VANTAGE_KEY) it will proxy the request to their API. If
 * there is no key configured the endpoint returns stub data so the
 * frontend can still function during development.
 */
export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get('symbol')?.toUpperCase();
  if (!symbol) {
    return NextResponse.json({ error: 'symbol required' }, { status: 400 });
  }

  const key = process.env.ALPHA_VANTAGE_KEY;
  // If no API key is configured we return stub data. This allows the
  // development UI to work without hitting external services.
  if (!key) {
    return NextResponse.json({
      symbol,
      price: 100.0,
      changePct: 0.0,
      volume: 1_000_000,
      updatedAt: new Date().toISOString(),
      note: 'Alpha Vantage key not found. Returning stub quote.',
    });
  }

  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`;
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) {
      return NextResponse.json({ error: 'provider error' }, { status: 502 });
    }
    const json = await r.json();
    const q = json['Global Quote'] || {};
    const price = Number(q['05. price'] ?? 0);
    const changePctStr = q['10. change percent'] ?? '0%';
    const changePct = Number(changePctStr.replace('%', ''));
    return NextResponse.json({
      symbol,
      price,
      changePct,
      volume: Number(q['06. volume'] ?? 0),
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 });
  }
}