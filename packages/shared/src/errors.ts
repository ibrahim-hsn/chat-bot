/**
 * Shared error vocabulary and a small `Result` type. HTTP handlers and socket
 * acknowledgements return these shapes so the client can branch on a stable
 * machine-readable `code` instead of parsing human strings.
 */

export const ERROR_CODES = {
  VALIDATION_FAILED: "VALIDATION_FAILED",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  RATE_LIMITED: "RATE_LIMITED",
  ROOM_FULL: "ROOM_FULL",
  INVITATION_INVALID: "INVITATION_INVALID",
  INVITATION_EXPIRED: "INVITATION_EXPIRED",
  INTERNAL: "INTERNAL",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export interface ApiError {
  code: ErrorCode;
  /** Safe, user-facing message. Never leak secrets or internal detail here. */
  message: string;
  /** Optional structured detail, e.g. field-level validation issues. */
  details?: unknown;
}

export type Result<T> = { ok: true; data: T } | { ok: false; error: ApiError };

export function ok<T>(data: T): Result<T> {
  return { ok: true, data };
}

export function err(code: ErrorCode, message: string, details?: unknown): Result<never> {
  return { ok: false, error: { code, message, details } };
}
