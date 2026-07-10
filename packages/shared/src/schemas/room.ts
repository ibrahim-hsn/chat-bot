import { z } from "zod";
import { ROOM_CODE_PATTERN } from "../constants";
import { normalizeRoomCode } from "../normalize";
import { publicUserSchema } from "./user";

export const roomStatusSchema = z.enum(["waiting", "active", "closed"]);
export type RoomStatus = z.infer<typeof roomStatusSchema>;

/** A pasted code is normalized first, then checked against the code shape. */
export const roomCodeSchema = z
  .string()
  .transform(normalizeRoomCode)
  .pipe(z.string().regex(ROOM_CODE_PATTERN, "That room code doesn't look right."));

/** Public projection of a room for the authenticated member. */
export const roomSummarySchema = z.object({
  roomId: z.string(),
  status: roomStatusSchema,
  otherParticipant: publicUserSchema.optional(),
  lastMessagePreview: z.string().optional(),
  lastActivityAt: z.string().datetime().optional(),
  unreadCount: z.number().int().nonnegative().default(0),
});

export type RoomSummary = z.infer<typeof roomSummarySchema>;

export const joinRoomInputSchema = z.object({
  code: roomCodeSchema,
});

export type JoinRoomInput = z.infer<typeof joinRoomInputSchema>;
