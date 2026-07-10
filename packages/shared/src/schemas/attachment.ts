import { z } from "zod";
import { MAX_ATTACHMENT_BYTES } from "../constants";

/**
 * Conservative denylist of dangerous executable / script MIME types. The final
 * enforcement (and encryption of file bytes + metadata) happens in Phase 6;
 * this contract lets the client and server agree on the same rules.
 */
export const BLOCKED_ATTACHMENT_MIME_TYPES = [
  "application/x-msdownload",
  "application/x-msdos-program",
  "application/x-sh",
  "application/x-httpd-php",
  "text/html",
] as const;

export const attachmentMetaSchema = z.object({
  filename: z.string().min(1).max(255),
  mimeType: z.string().min(1),
  size: z.number().int().positive().max(MAX_ATTACHMENT_BYTES, "Files must be 25 MB or smaller."),
});

export type AttachmentMeta = z.infer<typeof attachmentMetaSchema>;

/** True when the MIME type is on the denylist and should be rejected. */
export function isBlockedMimeType(mimeType: string): boolean {
  return (BLOCKED_ATTACHMENT_MIME_TYPES as readonly string[]).includes(mimeType.toLowerCase());
}
