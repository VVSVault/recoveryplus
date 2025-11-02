import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: true, // Disable optimization to prevent loading issues
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    optimizeCss: false,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
