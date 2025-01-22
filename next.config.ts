import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "*.scdn.co",
      },
      {
        protocol: 'https',
        hostname: "*.spotifycdn.com",
      },
    ]
  }
};

export default nextConfig;
