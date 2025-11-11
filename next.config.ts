import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    // Ignore TypeScript errors during build (registry files are not part of the app)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
