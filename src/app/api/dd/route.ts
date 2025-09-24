import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/dd
 *
 * Accepts a JSON body with a `symbol` property and returns a stubbed
 * due diligence report. In the future this route will orchestrate
 * multiple data sources (quotes, filings, news, sentiment) and call
 * an LLM to produce pros, cons and risks with citations. For now
 * we return static values so the frontend can be wired up and
 * iterated upon.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const symbol = body.symbol?.toUpperCase();
  if (!symbol) {
    return NextResponse.json({ error: 'symbol required' }, { status: 400 });
  }
  // TODO: orchestrate quote, filings, news, options, sentiment and LLM.
  return NextResponse.json({
    symbol,
    buyScore: 55,
    verdict: 'HOLD',
    confidence: 60,
    rationale: [
      'Valuation: 50/100',
      'Growth: 60/100',
      'Quality: 40/100',
      'Risk: 70/100',
      'LLM overlay: +5',
    ],
    pros: [
      `${symbol} has shown steady revenue growth year over year.`,
      'The company maintains a healthy cash position and reasonable debt levels.',
    ],
    cons: [
      `${symbol} trades at a premium compared to its sector peers.`,
      'Margins have compressed slightly in recent quarters.',
    ],
    risks: [
      'Macroeconomic headwinds could impact consumer demand.',
      `${symbol} faces increased competition in its core markets.`,
    ],
    citations: [],
  });
}