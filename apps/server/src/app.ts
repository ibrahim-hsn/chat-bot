import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import Fastify, { type FastifyInstance } from "fastify";
import { corsOrigins, env } from "./env";
import { registerHealthRoutes } from "./routes/health";

/**
 * Build a fully-configured Fastify instance without starting it. Keeping the
 * wiring separate from `listen()` lets tests drive the app via `inject()`.
 */
export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: buildLoggerOptions(),
    // The API must never accept raw 25 MB files through ordinary JSON routes.
    bodyLimit: 1_048_576, // 1 MiB
    trustProxy: true,
  });

  await app.register(fastifyHelmet);
  await app.register(fastifyCors, {
    origin: corsOrigins,
    credentials: true,
  });

  await app.register(registerHealthRoutes);

  return app;
}

function buildLoggerOptions() {
  if (env.NODE_ENV === "test") {
    return false;
  }
  if (env.NODE_ENV === "development") {
    return {
      level: env.LOG_LEVEL,
      transport: {
        target: "pino-pretty",
        options: { colorize: true, translateTime: "HH:MM:ss" },
      },
    };
  }
  return { level: env.LOG_LEVEL };
}
