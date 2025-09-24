"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * The home page is a landing page with a hero section, a ticker search
 * form, a list of trending tickers and a quick overview of the core
 * features of TickerTalk. The design utilises a simple blue and white
 * colour palette for a clean fintech aesthetic.
 */
export default function HomePage() {
  const [ticker, setTicker] = useState('');
  const router = useRouter();
  const trendingTickers = ['AAPL', 'TSLA', 'NVDA', 'AMZN', 'MSFT'];

  const go = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const t = ticker.trim().toUpperCase();
    if (!t) return;
    router.push(`/t/${t}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero section */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          Make Smarter Investing Decisions
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Do better due diligence in minutes with AI‑powered insights and a dash of old‑fashioned fundamentals.
        </p>
        {/* Search form */}
        <form onSubmit={go} className="mt-8 flex justify-center gap-2 max-w-md mx-auto">
          <input
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ticker (e.g., AAPL, NVDA, SPY)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
          <button
            className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold shadow hover:bg-blue-700"
            type="submit"
          >
            Open
          </button>
        </form>
        {/* Trending tickers */}
        <div className="mt-10">
          <h2 className="text-sm font-medium text-gray-500 mb-2">Trending tickers</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {trendingTickers.map((t) => (
              <Link
                key={t}
                href={`/t/${t}`}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
        {/* Feature overview */}
        <div className="mt-14 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">AI Buy Score</h3>
            <p className="text-sm text-gray-600">
              Hybrid scoring combining fundamentals, sentiment and our large language model.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Valuation Tools</h3>
            <p className="text-sm text-gray-600">
              Quickly run discounted cash flow and multiples comparisons to find fair value.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Social Sentiment</h3>
            <p className="text-sm text-gray-600">
              Gauge the mood on Reddit and X with our sentiment dashboard.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Unusual Options & Volume</h3>
            <p className="text-sm text-gray-600">
              Spot unusual options trades and volume spikes to catch insider moves early.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}