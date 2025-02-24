import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'courteous-marten-397.convex.cloud',
        port: '',
        pathname: '/api/storage/**',
        search: ''
      },
    ],
  },
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },
}

export default nextConfig;
