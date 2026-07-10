import { validateEnv } from "@one2one/config";
import { z } from "zod";

/**
 * Browser-exposed configuration. Reading each variable explicitly lets Next.js
 * inline the values into the client bundle. Validated once here so a missing or
 * malformed URL fails at build/startup instead of at runtime.
 *
 * NOTE: no browser network calls are made in Phase 1. These URLs are declared
 * and validated now (and never hardcoded at call sites) so later phases can use
 * them, including LAN testing where they point at the laptop's IP.
 */
const webEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:4000"),
  NEXT_PUBLIC_SOCKET_URL: z.string().url().default("http://localhost:4000"),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("One2One"),
});

export const env = validateEnv(webEnvSchema, {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
});

export const APP_NAME = env.NEXT_PUBLIC_APP_NAME;
