# One2One

A private, light‑themed, **one‑to‑one** real‑time chat application. Two people
per room, invite by secure code. No group chats, no friend requests, no public
directory. It is the foundation for a later AI‑chatbot project — but AI is out
of scope for now.

> **Current status: Phase 0 (foundation) + Phase 1 (static responsive frontend) complete.**
> The UI runs on **mock data only**. There is no authentication, database,
> real‑time transport, or encryption yet, and the app does **not** claim to be
> end‑to‑end encrypted. Those arrive in later phases (see `docs/CONTEXT.md`).

## What's here

| Area                | Package           | Phase | State                                          |
| ------------------- | ----------------- | ----- | ---------------------------------------------- |
| Web frontend        | `apps/web`        | 1     | Next.js App Router, mock data                  |
| API/realtime server | `apps/server`     | 0     | Fastify health/readiness only                  |
| Shared contracts    | `packages/shared` | 0     | Zod schemas, types, route + socket names       |
| Crypto              | `packages/crypto` | 0     | Interfaces + docs only (no implementation)     |
| Dev config          | `packages/config` | 0     | tsconfig bases, ESLint flat config, env helper |

## Repository structure

```text
chat-bot/
├── apps/
│   ├── web/          # Next.js frontend (Phase 1 UI)
│   └── server/       # Fastify server, /health + /ready (Phase 0)
├── packages/
│   ├── shared/       # single source of truth for schemas + contracts
│   ├── crypto/       # E2EE interfaces + docs only
│   └── config/       # tsconfig, eslint, env validation
├── docs/             # CONTEXT, API, E2EE-THREAT-MODEL, TEST-PLAN, DECISIONS, EXPLAINER
├── .github/workflows/ci.yml
├── .env.example
├── turbo.json · pnpm-workspace.yaml · eslint.config.mjs
```

## Prerequisites

- **Node.js ≥ 20** (a `.nvmrc` pins 22)
- **pnpm 10** (`corepack enable` will provide it)

## Install

```bash
pnpm install
cp .env.example .env   # optional for Phase 0/1; both apps have safe defaults
```

## Develop

Run everything, or a single app:

```bash
pnpm dev                          # web + server together (Turborepo)
pnpm --filter @one2one/web dev    # web only  → http://localhost:3000
pnpm --filter @one2one/server dev # server only → http://localhost:4000/health
```

Both apps bind to `0.0.0.0` by default so other devices on your network can
reach them (see LAN testing below).

## Quality gates

```bash
pnpm lint          # ESLint (flat config, whole monorepo)
pnpm typecheck     # tsc --noEmit in every package
pnpm test          # Vitest unit/component tests
pnpm build         # production builds (web + server)
pnpm --filter @one2one/web test:e2e   # Playwright (needs a browser; see note)
pnpm format        # Prettier write
```

> **Playwright note:** the e2e specs live in `apps/web/e2e`. They require a
> Chromium download (`pnpm --filter @one2one/web exec playwright install
chromium`). If your environment blocks that download, the specs can't run
> there — run them in CI or locally where the browser is available.

## Testing on a phone and laptop (same Wi‑Fi)

`localhost` on a phone means the phone, not your laptop. To open the app from
your phone:

1. Connect both devices to the **same Wi‑Fi network**.
2. Find your laptop's LAN IP, e.g. `192.168.1.25` (`ipconfig` / `ifconfig` / `ip addr`).
3. In `.env`, point the browser at that IP and start the apps:
   ```bash
   # .env
   HOST=0.0.0.0
   CORS_ORIGINS=http://192.168.1.25:3000
   NEXT_PUBLIC_API_URL=http://192.168.1.25:4000
   NEXT_PUBLIC_SOCKET_URL=http://192.168.1.25:4000
   ```
   ```bash
   pnpm dev
   ```
4. On the phone, open `http://192.168.1.25:3000`.
5. Allow the ports through your laptop firewall **for the private network only**.

Browser cryptography and secure cookies (later phases) need a secure context;
for production‑like testing use HTTPS via a trusted local certificate or an
approved tunnel. Never expose an unauthenticated dev server publicly.

## Environment variables

Validated at startup with Zod (`packages/config`'s `validateEnv`). Missing or
malformed values fail fast with a readable message. See `.env.example` for the
full list. Browser code never hardcodes `localhost`; it reads validated
`NEXT_PUBLIC_*` values.

## Documentation

- [`docs/CONTEXT.md`](docs/CONTEXT.md) — the full working specification (source of truth)
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — Phase 0 decisions and open questions
- [`docs/API.md`](docs/API.md) — HTTP + Socket.IO contract (what's implemented vs planned)
- [`docs/E2EE-THREAT-MODEL.md`](docs/E2EE-THREAT-MODEL.md) — encryption design (to be built in Phase 5)
- [`docs/TEST-PLAN.md`](docs/TEST-PLAN.md) — testing strategy and current status
- [`docs/EXPLAINER-phase-0-1.md`](docs/EXPLAINER-phase-0-1.md) — walkthrough of this phase

## License

MIT — see [`LICENSE`](LICENSE).
