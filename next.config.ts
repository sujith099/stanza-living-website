import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/find-a-room",
        destination: "/rooms",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
