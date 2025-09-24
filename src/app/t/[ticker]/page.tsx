import QuotePanel from './QuotePanel';
import PriceChart from './PriceChart';


/**
 * The TickerPage is a server component that receives a dynamic
 * `ticker` parameter from the route. In Next.js v15 the `params`
 * object must be awaited before accessing its properties. This page
 * displays the ticker symbol and renders the QuotePanel client
 * component to fetch live quote data.
 */
export default async function TickerPage({
  params,
}: {
  params: { ticker: string } | Promise<{ ticker: string }>;
}) {
  const p = await params;
  const symbol = p.ticker.toUpperCase();

  return (
    <main className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page header */}
        <section>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-1">{symbol}</h1>
          <p className="text-gray-500">Live quote and due diligence snapshot</p>
        </section>
        {/* Quote card */}
        <section>
          <QuotePanel symbol={symbol} />
        </section>
        {/* Price chart */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Price Chart (Daily)</h2>
          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
            <PriceChart symbol={symbol} />
          </div>
        </section>
        {/* Placeholder sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-2">SEC Filings</h2>
            <p className="text-sm text-gray-600">
              Recent filings will appear here. We’ll summarise the latest 10‑K and 10‑Q reports as soon as they’re available.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-2">Latest News</h2>
            <p className="text-sm text-gray-600">
              Headlines and articles pulled from multiple sources will show up here.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-2">Buy Score</h2>
            <p className="text-sm text-gray-600">
              A hybrid score (fundamentals + AI overlay) to help you decide whether to buy, hold or sell this stock.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-2">Valuation Quick Calc</h2>
            <p className="text-sm text-gray-600">
              Quick discounted cash flow and multiples calculations coming soon.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}