import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, "src/visual-edits/component-tagger-loader.js");

const nextConfig: NextConfig = {
  images: {
    // Local files only. An empty list blocks /_next/image from fetching any remote host.
    remotePatterns: [],
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
