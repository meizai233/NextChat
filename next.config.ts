import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  typescript: {
    // 在构建过程中忽略 TypeScript 错误
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
