/**
 * Normalization helpers used for uniqueness and lookups. The normalized value
 * is what the database indexes for case-insensitive uniqueness; the original
 * casing is preserved separately for display.
 */

/** Lowercase + trim a username for case-insensitive uniqueness. */
export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

/** Lowercase + trim an email for case-insensitive uniqueness. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Normalize a pasted room code: strip all whitespace and uppercase it, so
 * "abcd efgh jkmn" and "ABCDEFGHJKMN" are treated the same.
 */
export function normalizeRoomCode(code: string): string {
  return code.replace(/\s+/g, "").toUpperCase();
}
