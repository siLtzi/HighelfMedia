import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// If you also use Sentry, see the note below about composing plugins.
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
  },
  reactCompiler: true
};

export default withNextIntl(nextConfig);
