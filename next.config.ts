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
}

export default nextConfig;
