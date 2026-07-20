import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
