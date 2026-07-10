import type { FastifyInstance } from "fastify";
import { HTTP_ROUTES } from "@one2one/shared";

/**
 * Liveness and readiness endpoints.
 *
 * `/health` (liveness): the process is up and can serve requests.
 * `/ready` (readiness): all dependencies the server needs are available. In
 * Phase 0 there are no external dependencies, so readiness mirrors liveness.
 * When MongoDB/Redis arrive, their checks go here.
 */
export async function registerHealthRoutes(app: FastifyInstance): Promise<void> {
  app.get(HTTP_ROUTES.health, async () => ({
    status: "ok" as const,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }));

  app.get(HTTP_ROUTES.ready, async () => ({
    status: "ready" as const,
    checks: {
      // Populated in later phases (e.g. { mongo: "ok" }).
    },
    timestamp: new Date().toISOString(),
  }));
}
