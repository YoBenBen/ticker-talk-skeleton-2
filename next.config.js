/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    // Enable the App Router (folder based routing under `src/app`).
    appDir: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;