/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Mapbox token will be provided via environment variable NEXT_PUBLIC_MAPBOX_TOKEN
  // For local development, you can add a .env.local file with NEXT_PUBLIC_MAPBOX_TOKEN=your_token
};

module.exports = nextConfig;
