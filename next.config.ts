import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Serve compact card thumbnails and cache remote event banners for repeat visits.
    qualities: [30, 60, 75],
    formats: ["image/webp"],
    minimumCacheTTL: 2_592_000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "json.commudle.com",
      },
      {
        protocol: "https",
        hostname: "commudle.com",
      },
    ],
  },
};

export default nextConfig;
