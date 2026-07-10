import type { z } from "zod";

/**
 * Thrown when environment variables fail schema validation. The message lists
 * every offending variable so misconfiguration is obvious at startup.
 */
export class EnvValidationError extends Error {
  public readonly issues: string[];

  constructor(issues: string[]) {
    super(`Invalid environment configuration:\n${issues.map((i) => `  - ${i}`).join("\n")}`);
    this.name = "EnvValidationError";
    this.issues = issues;
  }
}

/**
 * Validate a record of environment variables against a Zod schema.
 *
 * Fails fast with a descriptive {@link EnvValidationError} rather than letting
 * an app boot with missing or malformed configuration. Each app owns its own
 * schema; this helper is the shared, reusable validation mechanism.
 */
export function validateEnv<TSchema extends z.ZodType>(
  schema: TSchema,
  source: Record<string, string | undefined> = process.env,
): z.infer<TSchema> {
  const result = schema.safeParse(source);

  if (!result.success) {
    const issues = result.error.issues.map((issue) => {
      const path = issue.path.join(".") || "(root)";
      return `${path}: ${issue.message}`;
    });
    throw new EnvValidationError(issues);
  }

  return result.data;
}
