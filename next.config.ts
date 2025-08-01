import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
    // If you also need to support production API URL, add it here
    // For example: 'api.yoursite.com'
  },
};

export default nextConfig;
