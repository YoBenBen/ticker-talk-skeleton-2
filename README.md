# TickerTalk Skeleton

This repository contains a starter implementation of **TickerTalk**,
a due diligence web application built with Next.js 15 (App Router),
TypeScript and TailwindCSS. It is designed to help you quickly
prototype the core flows of your MVP without wiring up every external
API from day one.

## Features

- **Home page** with a ticker search form that navigates to
  `/t/[ticker]`.
- **Ticker page** that displays a live quote card using a client
  component (`QuotePanel`).
- **Stubbed API endpoints** for quotes, filings, news and a basic
  due‐diligence report. These return placeholder data when no API
  keys are configured.
- **Modular file structure** under `src/app` ready for you to
  expand with real logic (Buy Score, valuation calculator, sentiment
  dashboard, options flow, comments, etc.).

## Getting Started

1. **Install dependencies**

   Make sure you have Node.js 18+ and pnpm or npm installed. Then
   navigate into the project directory and install:

   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Configure environment variables**

   Copy `.env.local.example` to `.env.local` and fill in your
   credentials:

   - `ALPHA_VANTAGE_KEY` – optional, fetches real quotes when set.
   - `NEWSAPI_KEY` – optional, to fetch real news stories.
   - `OPENAI_API_KEY` – optional, for generating pros/cons/risks via GPT.
   - `SEC_EDGAR_APP` – optional, user agent string for EDGAR requests.
   - `STRIPE_PRICE_PRO_YEARLY` – optional, price ID for the Pro plan.
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` – optional, for
     implementing Google OAuth.

   When these keys are not set the API routes will return stub data
   so the UI remains functional.

3. **Run the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   Open <http://localhost:3000> with your browser. Try entering
   a ticker like `AAPL` to see the placeholder quote and DD report.

## Directory Structure

- `src/app/page.tsx` – home page with search form.
- `src/app/t/[ticker]/page.tsx` – ticker page (server component).
- `src/app/t/[ticker]/QuotePanel.tsx` – client component to fetch
  and render quote data.
- `src/app/api/quote/route.ts` – REST endpoint to fetch quotes.
- `src/app/api/filings/route.ts` – REST endpoint to fetch SEC filings.
- `src/app/api/news/route.ts` – REST endpoint to fetch news articles.
- `src/app/api/dd/route.ts` – orchestrator endpoint returning a stubbed
  due diligence report.
- `src/app/layout.tsx` – root layout applying global styles.
- `src/app/globals.css` – global Tailwind imports and base styles.

## Next Steps

This starter intentionally returns placeholder data so you can focus
on the user experience before integrating costly or complex
services. When you’re ready to enhance functionality:

1. **Quote API** – update `src/app/api/quote/route.ts` to call
   [Alpha Vantage](https://www.alphavantage.co/) or another
   provider when an API key is present.
2. **Filings API** – implement a call to the SEC EDGAR API and parse
   filings. Consider storing filings in a database and ingesting
   them into a vector DB for RAG queries.
3. **News API** – replace the stub with a fetch to your favourite
   news aggregator (e.g. NewsAPI). De‑duplicate by domain.
4. **Buy Score & RAG** – build out `/api/dd` to combine rule‐based
   scoring with a GPT overlay. Use `pgvector` to store embeddings of
   filings and news and retrieve the most relevant chunks for each
   query.
5. **Valuation calculator** – create a client component for DCF and
   multiples comparisons. Use your quote and filings data to prefill
   growth and margin assumptions.
6. **Social sentiment & options flow** – add new API routes and
   React widgets for Reddit/Twitter chatter and unusual options
   activity. Gate this behind your Pro tier if desired.
7. **Authentication & Billing** – integrate Google OAuth and Stripe
   checkout/session endpoints. See [NextAuth.js](https://next-auth.js.org/)
   and the Stripe docs for examples.

With this foundation in place you’ll be able to iterate quickly
towards a fully‑fledged due diligence platform.# ticker-talk-skeleton-2
