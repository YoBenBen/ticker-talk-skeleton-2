import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/chart?symbol=XYZ
 *
 * Returns an array of daily closing prices for the given ticker. It
 * uses the Alpha Vantage TIME_SERIES_DAILY endpoint and returns up to
 * the most recent 100 data points (approximately the last 5 months of
 * trading days). The response is sorted from oldest to newest so it
 * can be consumed directly by a chart component.
 */
export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get('symbol')?.toUpperCase();
  if (!symbol) {
    return NextResponse.json({ error: 'symbol required' }, { status: 400 });
  }
  const key = process.env.ALPHA_VANTAGE_KEY;
  if (!key) {
    return NextResponse.json({ error: 'Alpha Vantage key missing' }, { status: 500 });
  }
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${key}`;
  try {
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) {
      return NextResponse.json({ error: 'provider error' }, { status: 502 });
    }
    const json = await r.json();
    const series: Record<string, any> = json['Time Series (Daily)'] || {};
    // Convert the time series into an array of { date, close } objects
    const entries = Object.entries(series).map(([date, values]) => ({
      date,
      close: Number((values as any)['4. close'] ?? 0),
    }));
    // Sort ascending by date and limit to the last 100 points
    entries.sort((a, b) => (a.date > b.date ? 1 : -1));
    const data = entries.slice(-100);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch chart data' }, { status: 500 });
  }
}