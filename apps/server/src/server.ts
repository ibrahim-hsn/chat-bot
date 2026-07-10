import { buildApp } from "./app";
import { env } from "./env";

/**
 * Entry point: build the app, listen on the configured host/port, and shut down
 * gracefully so in-flight requests can drain on SIGINT/SIGTERM.
 */
async function main(): Promise<void> {
  const app = await buildApp();

  const shutdown = async (signal: string): Promise<void> => {
    app.log.info({ signal }, "Shutting down");
    try {
      await app.close();
      process.exit(0);
    } catch (error) {
      app.log.error(error, "Error during shutdown");
      process.exit(1);
    }
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));

  try {
    await app.listen({ host: env.HOST, port: env.SERVER_PORT });
  } catch (error) {
    app.log.error(error, "Failed to start server");
    process.exit(1);
  }
}

void main();
