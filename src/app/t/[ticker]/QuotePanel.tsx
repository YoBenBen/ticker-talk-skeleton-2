"use client";

import { useEffect, useState } from 'react';

/**
 * QuotePanel fetches the latest quote for a given symbol from the local API.
 * It shows a price, percentage change and timestamp. This component is
 * intentionally simple – the real API integration can be wired later.
 */
export default function QuotePanel({ symbol }: { symbol: string }) {
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(`/api/quote?symbol=${encodeURIComponent(symbol)}`, {
          cache: 'no-store',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Request failed');
        if (!cancelled) setQuote(data);
      } catch (e: any) {
        if (!cancelled) setErr(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [symbol]);

  return (
    <div className="space-y-2">
      {loading && <div className="text-gray-500">Loading…</div>}
      {err && <div className="text-red-600">Error: {err}</div>}
      {quote && (
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {quote.symbol}
          </div>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-gray-800">
              ${quote.price?.toFixed(2)}
            </span>
            <span
              className={`text-lg sm:text-xl font-semibold ${quote.changePct >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {quote.changePct?.toFixed(2)}%
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-400">
            Updated {new Date(quote.updatedAt).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}