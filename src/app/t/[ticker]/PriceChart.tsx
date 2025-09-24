"use client";

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface ChartPoint {
  date: string;
  close: number;
}

/**
 * PriceChart fetches daily closing prices from the server-side chart API
 * and renders them using Recharts. It shows a loading indicator and
 * error message when appropriate. The chart is responsive and will
 * adjust to the width of its container.
 */
export default function PriceChart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<ChartPoint[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(`/api/chart?symbol=${encodeURIComponent(symbol)}`, {
          cache: 'no-store',
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to fetch');
        if (!cancelled) setData(json);
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

  if (loading) {
    return <div className="text-gray-500">Loading chart…</div>;
  }
  if (err) {
    return <div className="text-red-600">Error: {err}</div>;
  }
  if (!data || data.length === 0) {
    return <div className="text-gray-500">No data available.</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10 }}
          tickFormatter={(str) => str.slice(5)}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis
          domain={['dataMin', 'dataMax']}
          tick={{ fontSize: 10 }}
          tickFormatter={(value) => value.toFixed(0)}
          width={40}
        />
        <Tooltip
          labelFormatter={(label) => `Date: ${label}`}
          formatter={(value: number) => [`$${(value as number).toFixed(2)}`, 'Close']}
        />
        <Line type="monotone" dataKey="close" stroke="#2563eb" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}