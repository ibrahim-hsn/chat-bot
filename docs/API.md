# API & realtime contract

All names live in `packages/shared` so the client and server can never drift.
Only the health endpoints are **implemented** today; everything else is the
agreed contract for later phases.

## Implemented now (Phase 0)

| Method | Path      | Description                                                  |
| ------ | --------- | ------------------------------------------------------------ |
| GET    | `/health` | Liveness. Returns `{ status: "ok", uptime, timestamp }`.     |
| GET    | `/ready`  | Readiness. Returns `{ status: "ready", checks, timestamp }`. |

Constants: `HTTP_ROUTES` in `@one2one/shared`.

## Planned HTTP routes (versioned under `/api/v1`)

### Auth (Phase 2)

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout` · `POST /auth/logout-all`
- `POST /auth/forgot-password` · `POST /auth/reset-password`
- `GET /auth/me`

### Rooms (Phase 3)

- `POST /rooms` — create waiting room + invitation
- `POST /rooms/join` — atomic join by code
- `GET /rooms` · `GET /rooms/:roomId`
- `POST /rooms/:roomId/invitation/regenerate` · `DELETE /rooms/:roomId/invitation`
- `POST /rooms/:roomId/leave`

### Messages (Phase 4/5)

- `GET /rooms/:roomId/messages?cursor=&limit=`
- `POST /rooms/:roomId/messages` (HTTP fallback; Socket.IO is primary)
- `POST /rooms/:roomId/read`

### Attachments (Phase 6)

- `POST /attachments/upload-intent`
- `POST /attachments/complete`
- `GET /attachments/:id/download-intent`

## Socket.IO event contract (Phase 4+)

Names live in `CLIENT_EVENTS` / `SERVER_EVENTS` in `@one2one/shared`.

**Client → server:** `room:subscribe`, `room:unsubscribe`, `message:send`,
`message:delivered`, `message:read`, `typing:start`, `typing:stop`,
`presence:heartbeat`.

**Server → client:** `message:accepted`, `message:new`, `message:status`,
`typing:update`, `presence:update`, `room:updated`, `error`.

Every event will require authentication, room-membership authorization, schema
validation, rate limits, and an ack/error shape. `messageId` (client UUID) is
the idempotency key that prevents duplicate messages on reconnection.

## Error shape

`Result<T>` and `ApiError` (`code`, `message`, optional `details`) with a stable
set of `ERROR_CODES`, all exported from `@one2one/shared`.
