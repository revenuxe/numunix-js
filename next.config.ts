import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Brand logos, series images and model photos are uploaded to Supabase
    // Storage or pasted as arbitrary URLs by the admin, so we can't pin this
    // down to a single known hostname.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      // The old buyback-flavoured "sell laptop" marketing pages were repurposed
      // into the "repair laptop" pages. More specific routes must come first so
      // they aren't swallowed by the generic /sell-laptop/:area redirect below.
      {
        source: "/sell-laptop/terms",
        destination: "/sell/laptops/terms",
        permanent: true,
      },
      {
        source: "/sell-laptop/brand/:brand",
        destination: "/repair-laptop/brand/:brand",
        permanent: true,
      },
      {
        source: "/sell-laptop/:area",
        destination: "/repair-laptop/:area",
        permanent: true,
      },
      {
        source: "/sell-laptop",
        destination: "/repair-laptop",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
