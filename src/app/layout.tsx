import './globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'TickerTalk',
  description: 'Do better DD in minutes.',
};

/**
 * Root layout for the app. Provides a global navigation bar and footer
 * to give the site a more polished and cohesive feel. All pages are
 * wrapped in a flex container so that the footer stays pinned to the
 * bottom on taller screens.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen flex flex-col">
        {/* Header / Navigation */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="text-2xl font-extrabold text-blue-600">TickerTalk</div>
            {/* Future nav items can go here */}
          </nav>
        </header>
        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-xs text-gray-500">
            Not investment advice. All information provided for educational purposes only.
          </div>
        </footer>
      </body>
    </html>
  );
}