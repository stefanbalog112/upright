import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statický export – `npm run build` vytvorí hotový web v priečinku `out/`.
  output: "export",
  images: { unoptimized: true },
  // GitHub Pages servuje web pod /upright; lokálne (npm run dev) je basePath prázdny
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
