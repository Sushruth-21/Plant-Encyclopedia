import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Bypass image optimization for external URLs
    remotePatterns: [
      {
        protocol: "https",
        hostname: "perenual.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "**.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "**.trefle.io",
      },
      {
        protocol: "https",
        hostname: "bs.plantnet.org",
      },
      {
        protocol: "https",
        hostname: "d2seqvvyy3b8p2.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
  },
};

export default nextConfig;
