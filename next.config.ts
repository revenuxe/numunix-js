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
};

export default nextConfig;
