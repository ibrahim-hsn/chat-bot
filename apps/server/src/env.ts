import { validateEnv } from "@one2one/config";
import { z } from "zod";

/**
 * Server environment schema. Validated once at startup; a missing or malformed
 * value throws immediately with a readable message instead of failing later.
 */
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // Bind to 0.0.0.0 so a phone on the same Wi-Fi can reach the laptop.
  HOST: z.string().min(1).default("0.0.0.0"),
  SERVER_PORT: z.coerce.number().int().positive().max(65535).default(4000),
  // Comma-separated CORS allowlist. Never a wildcard when credentials are used.
  CORS_ORIGINS: z.string().default("http://localhost:3000"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
});

export const env = validateEnv(serverEnvSchema);

export const corsOrigins = env.CORS_ORIGINS.split(",")
  .map((origin) => origin.trim())
  .filter((origin) => origin.length > 0);

export const isProduction = env.NODE_ENV === "production";
