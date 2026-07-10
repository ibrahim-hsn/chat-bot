/**
 * Socket.IO event-name contract. Real-time transport is built in Phase 4; these
 * names are the shared vocabulary so the client and server can never drift.
 * Payload schemas will be attached to each event when the transport lands.
 */
export const CLIENT_EVENTS = {
  roomSubscribe: "room:subscribe",
  roomUnsubscribe: "room:unsubscribe",
  messageSend: "message:send",
  messageDelivered: "message:delivered",
  messageRead: "message:read",
  typingStart: "typing:start",
  typingStop: "typing:stop",
  presenceHeartbeat: "presence:heartbeat",
} as const;

export const SERVER_EVENTS = {
  messageAccepted: "message:accepted",
  messageNew: "message:new",
  messageStatus: "message:status",
  typingUpdate: "typing:update",
  presenceUpdate: "presence:update",
  roomUpdated: "room:updated",
  error: "error",
} as const;

export type ClientEvent = (typeof CLIENT_EVENTS)[keyof typeof CLIENT_EVENTS];
export type ServerEvent = (typeof SERVER_EVENTS)[keyof typeof SERVER_EVENTS];
