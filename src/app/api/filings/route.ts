import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/filings?symbol=XYZ
 *
 * Returns recent SEC filings for the given ticker. During development
 * this endpoint returns stub data. If you have an EDGAR API key and
 * ingestion logic, you can replace the body of this handler with a
 * real fetch to the SEC EDGAR API.
 */
export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get('symbol')?.toUpperCase();
  if (!symbol) {
    return NextResponse.json({ error: 'symbol required' }, { status: 400 });
  }
  // Stub data – replace with real filings ingestion later.
  return NextResponse.json({
    symbol,
    filings: [
      {
        accession: '0000001',
        type: '10-K',
        date: '2024-12-31',
        url: '#',
        title: 'Annual Report',
        summary: 'This is a placeholder summary of the most recent 10-K filing.',
      },
      {
        accession: '0000002',
        type: '10-Q',
        date: '2024-09-30',
        url: '#',
        title: 'Quarterly Report',
        summary: 'This is a placeholder summary of the most recent 10-Q filing.',
      },
    ],
  });
}