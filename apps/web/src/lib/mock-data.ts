import type { MessageStatus, MessageView, PublicUser } from "@one2one/shared";

/**
 * Mock data for the Phase 1 static frontend. Nothing here is fetched, sent, or
 * stored — it exists only to exercise the UI states (empty, populated, delivery
 * states, date separators, unread divider, failure/retry).
 */

export const mockCurrentUser: PublicUser = {
  userId: "usr_you",
  username: "you",
  displayName: "You",
};

export interface MockMessage extends MessageView {
  /** Marks the first unread message so the list can draw an "unread" divider. */
  firstUnread?: boolean;
}

export interface MockConversation {
  room: {
    roomId: string;
    status: "waiting" | "active" | "closed";
  };
  participant: PublicUser;
  online: boolean;
  unreadCount: number;
  messages: MockMessage[];
}

function isoMinutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

function msg(
  partial: Pick<MockMessage, "messageId" | "senderId" | "body" | "status" | "sentAt"> &
    Partial<MockMessage>,
): MockMessage {
  return {
    roomId: partial.roomId ?? "room_1",
    type: "text",
    ...partial,
  };
}

export const mockConversations: MockConversation[] = [
  {
    room: { roomId: "room_1", status: "active" },
    participant: { userId: "usr_ada", username: "ada_l", displayName: "Ada Lovelace" },
    online: true,
    unreadCount: 2,
    messages: [
      msg({
        messageId: "m1",
        roomId: "room_1",
        senderId: "usr_ada",
        body: "Hey! Did the room code come through okay?",
        status: "read",
        sentAt: isoMinutesAgo(60 * 26),
      }),
      msg({
        messageId: "m2",
        roomId: "room_1",
        senderId: "usr_you",
        body: "Yes — joined without a hitch. This is a much calmer UI than I expected.",
        status: "read",
        sentAt: isoMinutesAgo(60 * 26 - 3),
      }),
      msg({
        messageId: "m3",
        roomId: "room_1",
        senderId: "usr_ada",
        body: "That's the idea. One room, two people, no noise.",
        status: "read",
        sentAt: isoMinutesAgo(48),
      }),
      msg({
        messageId: "m4",
        roomId: "room_1",
        senderId: "usr_you",
        body: "Sending you the notes now.",
        status: "delivered",
        sentAt: isoMinutesAgo(12),
      }),
      msg({
        messageId: "m5",
        roomId: "room_1",
        senderId: "usr_ada",
        body: "Perfect, got them. Reading through — talk in a bit!",
        status: "sent",
        sentAt: isoMinutesAgo(4),
        firstUnread: true,
      }),
    ],
  },
  {
    room: { roomId: "room_2", status: "active" },
    participant: { userId: "usr_grace", username: "grace_h", displayName: "Grace Hopper" },
    online: false,
    unreadCount: 0,
    messages: [
      msg({
        messageId: "m6",
        roomId: "room_2",
        senderId: "usr_you",
        body: "Thanks for the review earlier.",
        status: "read",
        sentAt: isoMinutesAgo(60 * 30),
      }),
      msg({
        messageId: "m7",
        roomId: "room_2",
        senderId: "usr_grace",
        body: "Anytime. Ping me when the next build is ready.",
        status: "read",
        sentAt: isoMinutesAgo(60 * 29),
      }),
      msg({
        messageId: "m8",
        roomId: "room_2",
        senderId: "usr_you",
        body: "Will do. (This one failed to send — tap retry to see the state.)",
        status: "failed",
        sentAt: isoMinutesAgo(60 * 3),
      }),
    ],
  },
  {
    room: { roomId: "room_3", status: "waiting" },
    participant: { userId: "usr_alan", username: "alan_t", displayName: "Alan Turing" },
    online: false,
    unreadCount: 0,
    messages: [],
  },
];

export const DELIVERY_STATE_ORDER: MessageStatus[] = [
  "sending",
  "sent",
  "delivered",
  "read",
  "failed",
];
