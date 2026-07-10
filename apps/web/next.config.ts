import type { NextConfig } from "next";
// Importing the env module here validates NEXT_PUBLIC_* configuration at build
// and dev startup, so misconfiguration fails fast instead of at runtime.
import "./src/env";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Workspace packages ship TypeScript source; Next transpiles them directly.
  transpilePackages: ["@one2one/shared", "@one2one/crypto", "@one2one/config"],
  // Linting runs as a dedicated monorepo task (`pnpm lint`); don't re-run it here.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
