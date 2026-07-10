import { z } from "zod";
import { MAX_MESSAGE_LENGTH } from "../constants";

/**
 * Delivery lifecycle of a message as reflected in the UI. Server timestamps are
 * authoritative for ordering; `sending`/`failed` are client-only transitions.
 */
export const messageStatusSchema = z.enum(["sending", "sent", "delivered", "read", "failed"]);
export type MessageStatus = z.infer<typeof messageStatusSchema>;

export const messageTypeSchema = z.enum(["text", "file", "system"]);
export type MessageType = z.infer<typeof messageTypeSchema>;

/**
 * The plaintext a user types, validated before it is encrypted client-side
 * (Phase 5). The server never receives this field under the E2EE model — it
 * only stores ciphertext. It lives here so the composer and future crypto
 * layer share one length limit.
 */
export const messageDraftSchema = z.object({
  body: z
    .string()
    .min(1, "Message can't be empty.")
    .max(MAX_MESSAGE_LENGTH, `Messages are limited to ${MAX_MESSAGE_LENGTH} characters.`),
});

export type MessageDraft = z.infer<typeof messageDraftSchema>;

/**
 * A message as displayed in the UI. `messageId` is a client-generated UUID used
 * as an idempotency key so retries never create duplicates.
 */
export const messageViewSchema = z.object({
  messageId: z.string(),
  roomId: z.string(),
  senderId: z.string(),
  type: messageTypeSchema,
  body: z.string(),
  status: messageStatusSchema,
  sentAt: z.string().datetime(),
});

export type MessageView = z.infer<typeof messageViewSchema>;
