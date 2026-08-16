import { fileURLToPath } from "node:url";

import dotenv from "dotenv";
import "@tabularium/env/web";
import type { NextConfig } from "next";

dotenv.config({
  path: fileURLToPath(new URL("./.env", import.meta.url)),
  quiet: true,
});

const nextConfig: NextConfig = {
  agentRules: false,
  typedRoutes: true,
  reactCompiler: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
