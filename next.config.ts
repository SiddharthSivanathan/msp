import type { NextConfig } from "next";
import path from "node:path";

const moved: Record<string, string> = {
  sons: "m-sevugaperumal-and-sons",
  store: "msp-store",
  traders: "msp-traders",
  cargo: "msp-cargo-service",
  "fresh-products": "msp-fresh-products",
  finance: "saptagiri-finance",
};

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
  // Earlier business URLs → the final clean URLs.
  async redirects() {
    return Object.entries(moved).map(([from, to]) => ({
      source: `/businesses/${from}`,
      destination: `/businesses/${to}`,
      permanent: true,
    }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Interim photography (Unsplash licence) until MSP's own photos replace it.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
};

export default nextConfig;
