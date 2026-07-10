import { z } from "zod";
import {
  DISPLAY_NAME_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_PATTERN,
} from "../constants";

export const usernameSchema = z
  .string()
  .trim()
  .min(USERNAME_MIN_LENGTH, `Username must be at least ${USERNAME_MIN_LENGTH} characters.`)
  .max(USERNAME_MAX_LENGTH, `Username must be at most ${USERNAME_MAX_LENGTH} characters.`)
  .regex(USERNAME_PATTERN, "Use only letters, numbers, and underscores.");

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.")
  .max(254);

export const displayNameSchema = z.string().trim().min(1).max(DISPLAY_NAME_MAX_LENGTH);

/**
 * The public projection of a user. The internal Mongo `_id` is never exposed;
 * `userId` is the immutable, safe-to-display public identifier.
 */
export const publicUserSchema = z.object({
  userId: z.string(),
  username: usernameSchema,
  displayName: displayNameSchema.optional(),
  avatarUrl: z.string().url().optional(),
});

export type PublicUser = z.infer<typeof publicUserSchema>;
