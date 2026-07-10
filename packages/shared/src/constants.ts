/**
 * Cross-cutting constants shared by the web app and the server. Keeping the
 * limits here guarantees the client and server agree on a single set of rules
 * (message length, attachment size, room-code shape, etc.).
 */

/** Versioned API prefix, e.g. `/api/v1/rooms`. */
export const API_VERSION = "v1" as const;
export const API_BASE_PATH = `/api/${API_VERSION}` as const;

/** Username rules: 3–24 chars, letters/digits/underscore. */
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 24;
export const USERNAME_PATTERN = /^[A-Za-z0-9_]+$/;

/** Password policy for registration (server enforces the same rules). */
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MAX_LENGTH = 200;

/** Optional display name. */
export const DISPLAY_NAME_MAX_LENGTH = 50;

/** A direct room holds exactly two people. */
export const ROOM_MAX_MEMBERS = 2;

/**
 * Room invitation codes: 12 characters drawn from an unambiguous alphabet
 * (no 0/O/1/I/L). The authoritative code is always generated server-side with
 * a cryptographically secure source (Phase 3); this alphabet is the contract.
 */
export const ROOM_CODE_LENGTH = 12;
export const ROOM_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const ROOM_CODE_PATTERN = new RegExp(`^[${ROOM_CODE_ALPHABET}]{${ROOM_CODE_LENGTH}}$`);

/** Unused invitations expire after this many hours (default decision). */
export const INVITATION_TTL_HOURS = 24;

/** Maximum plaintext message length (characters). */
export const MAX_MESSAGE_LENGTH = 4000;

/** Maximum attachment size in bytes (25 MB), enforced on client and server. */
export const MAX_ATTACHMENT_BYTES = 25 * 1024 * 1024;
