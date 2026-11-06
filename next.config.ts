import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, "src/visual-edits/component-tagger-loader.js");

const nextConfig: NextConfig = {
  images: {
    // QUICK STABILITY FIX: disable Next's optimizer (removes /_next/image 400s)
    unoptimized: true,

    // Keep patterns anyway (useful if you later re-enable optimization)
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "slelguoygbfzlpylpxfs.supabase.co" },
      { protocol: "https", hostname: "**" }, // optional: remove later
      { protocol: "http", hostname: "**" },  // optional: remove later
    ],
  },

  outputFileTracingRoot: path.resolve(__dirname, "../../"),

  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER],
      },
    },
  },
};

export default nextConfig;
// Orchids restart: 1767292388362
