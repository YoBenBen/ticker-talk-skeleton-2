import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/news?symbol=XYZ
 *
 * Returns recent news articles for the given ticker. This stub returns
 * placeholder news items during development. Once you have a NewsAPI
 * key you can replace the stub with a fetch to your preferred news
 * provider.
 */
export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get('symbol')?.toUpperCase();
  if (!symbol) {
    return NextResponse.json({ error: 'symbol required' }, { status: 400 });
  }
  return NextResponse.json({
    symbol,
    articles: [
      {
        title: `${symbol} achieves record earnings in Q2`,
        source: 'Example News',
        url: '#',
        publishedAt: new Date().toISOString(),
      },
      {
        title: `Analysts debate valuation of ${symbol}`,
        source: 'Finance Blog',
        url: '#',
        publishedAt: new Date(Date.now() - 864e5).toISOString(),
      },
    ],
  });
}