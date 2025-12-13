import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 1. Keep Sanity (for your future real projects)
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      // 2. ADD Unsplash (for the placeholders we are using now)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  experimental: {
    // Add experimental features here if needed
  },
};

export default withNextIntl(nextConfig);