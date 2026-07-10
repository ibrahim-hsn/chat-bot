# Explainer — Phase 0 & Phase 1

> **What this covers.** How the One2One monorepo is put together (Phase 0) and
> how the static, responsive, mock-data frontend is built (Phase 1). It is
> written to be readable whether or not you have seen a TypeScript monorepo
> before. If you already know monorepos well, skip the _deep background_.

---

## Background

### Deep background (skip if familiar)

A **monorepo** is a single repository that holds several related projects. Here
there are two applications — a web frontend and a backend server — plus a few
**packages** they both depend on. The alternative, a repo per project, makes it
painfully easy for the frontend and backend to disagree about, say, the exact
shape of a "message". In a monorepo we can put that shape in one shared package
and have both sides import it, so a mismatch becomes a compile error instead of
a production bug.

We use **pnpm workspaces** to link the packages together on disk (an app can
`import` a package by name as if it were published to npm), and **Turborepo** to
run tasks like `build`/`lint`/`test` across every package with one command.

> **Key idea — one source of truth.** Types, validation schemas, route names,
> and socket event names all live in `packages/shared`. Nothing else redefines
> them. When the contract changes, it changes in exactly one place.

### Narrow background (this change)

This is the first code in the repository. Two constraints shaped almost every
decision:

1. **Build in verified phases.** Phase 0 is _foundation only_ (no auth, no
   database, no messaging, no encryption). Phase 1 is a _static frontend on mock
   data_. So the code must set up everything needed to grow, while carefully
   **not** implementing later features.
2. **Be honest.** The app is not encrypted yet, so it must never say it is; the
   forms must not fake a successful login. Honesty is enforced in the UI copy
   and by the crypto package containing _no_ cipher.

---

## Intuition

Think of the repository as a set of **contracts** with two **consumers**.

The central contract is a message. In `packages/shared` it looks like this
(simplified):

```ts
messageDraft = { body: string (1..4000 chars) }   // what a user types
messageView  = { messageId, roomId, senderId, status, body, sentAt }
```

Both the web app (to render bubbles and validate the composer) and — later — the
server (to validate requests) import these. If someone changes the max length
from 4000 to 2000, every place that relies on it updates at once.

The frontend, meanwhile, is a small **state machine over mock data**. Imagine a
box holding three toy conversations. Selecting one shows its messages; typing and
pressing Enter appends a message that transitions `sending → sent → delivered`
on timers. None of this touches a network — it is a faithful _prototype of the
behavior_, clearly labelled as a mock so nobody mistakes it for a working
backend.

> **Concrete example.** You open `/app`. A 600 ms skeleton stands in for
> "loading". Then Ada Lovelace's room appears with an unread badge of 2. You
> click it; the badge clears. You type "hi" and hit Enter; a blue bubble appears
> with a clock icon, then a single tick, then a double tick — the delivery
> states — all local, all mock.

---

## Code

### Phase 0 — foundation

**Shared contracts** (`packages/shared/src`) — schemas + constants + helpers:

```ts
export const MAX_MESSAGE_LENGTH = 4000;
export const ROOM_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no 0/O/1/I/L
export function normalizeUsername(u: string) {
  return u.trim().toLowerCase();
}
```

**Environment validation** (`packages/config/src/env.ts`) — one helper both apps
use, so a missing variable fails at startup with a readable message:

```ts
export function validateEnv(schema, source = process.env) {
  const result = schema.safeParse(source);
  if (!result.success) throw new EnvValidationError(/* lists each bad var */);
  return result.data;
}
```

**Server** (`apps/server`) — a Fastify instance with Helmet + CORS and two
routes. `buildApp()` is separated from `listen()` so tests can use
`app.inject()` without opening a socket:

```ts
app.get("/health", async () => ({ status: "ok", uptime: process.uptime(), ... }));
app.get("/ready",  async () => ({ status: "ready", checks: {} }));
```

**Crypto** (`packages/crypto`) — _interfaces only_. It exports a `CryptoProvider`
interface and an `EncryptedEnvelope` type, plus a comment stating loudly that
nothing here encrypts anything yet.

### Phase 1 — static frontend

**Design tokens** live as CSS variables in `globals.css` and are mapped into
Tailwind (`tailwind.config.ts`), so `bg-primary` and `var(--color-primary)`
always agree.

**Primitives** (`components/ui`) are small and accessible: a `Button` with a
44 px min height, an `IconButton` that _requires_ an accessible `label`, and a
`Modal`/`Drawer` built on **Radix** so focus trapping, Escape-to-close, and ARIA
wiring are handled for us.

**Forms** (`components/auth`) use React Hook Form with the shared Zod schemas.
The important part is what happens on submit — an honest notice, never a fake
success:

```tsx
const onSubmit = handleSubmit(async () => {
  await new Promise((r) => setTimeout(r, 500)); // pretend "loading"
  setNotice("…sign-in isn't available yet — the backend arrives in a later phase.");
});
```

**The shell** (`components/app/app-shell.tsx`) holds all interactive state:
`conversations`, `selectedRoomId`, `drafts`, `loading`, `offline`, and the modal
flags. Two behaviors are worth calling out:

- **Offline** is _real_: it listens to the browser's `online`/`offline` events.
- **Responsiveness** is driven by a single selection state. On desktop the
  sidebar and main panel sit side by side; on mobile the list and chat are
  separate full-width views and the sidebar collapses into a Radix drawer.

---

## Verification

Everything below was actually run in this environment unless noted.

| Check                            | Command          | Result                                                                                                                       |
| -------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Type-check (5 packages)          | `pnpm typecheck` | ✅ pass                                                                                                                      |
| Lint (whole repo)                | `pnpm lint`      | ✅ pass                                                                                                                      |
| Unit/component tests             | `pnpm test`      | ✅ 28 tests pass (21 node + 7 web)                                                                                           |
| Web production build             | `pnpm build`     | ✅ 11 static routes                                                                                                          |
| Server production build          | tsup             | ✅ `dist/server.js`                                                                                                          |
| Server serves `/health` `/ready` | manual `curl`    | ✅ 200 + Helmet headers                                                                                                      |
| All 8 web routes render (SSR)    | manual `curl`    | ✅ 200                                                                                                                       |
| Playwright e2e                   | `test:e2e`       | ⛔ **not run here** — the Chromium download is blocked by network egress in this sandbox. Specs are committed and run in CI. |

### Manual QA guide

```bash
pnpm install
pnpm dev            # web on :3000, server on :4000
```

1. Open `http://localhost:3000` — the landing page should fit one screen.
2. Tab once — focus should land on the "Skip to main content" link.
3. Click **Create your account**, submit empty — inline errors appear; submit
   valid — an honest "backend not available" notice appears (no redirect).
4. Open **Preview the app (mock UI)**. Watch the loading skeleton resolve.
5. Open a conversation, send a message, watch the delivery ticks.
6. Open **Create room**, generate a code, copy it.
7. Shrink the window to ~390 px: the list becomes full-width, opening a chat
   shows a back button, and there is no horizontal scrollbar.

---

## Alternatives

### Tailwind v3 (chosen) vs Tailwind v4

|      | Tailwind v3 (chosen)                                                               | Tailwind v4                                                       |
| ---- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Pros | Extremely stable; config is well documented; predictable in a hand-rolled monorepo | Fewer files; CSS-first `@theme`; newest default                   |
| Cons | An extra `tailwind.config.ts` + PostCSS file                                       | Newer; subtle behavior changes; more risk to get right first time |

### Internal packages as source (chosen) vs compiled `dist/`

|      | Source (chosen)                                                  | Compiled `dist/`                                |
| ---- | ---------------------------------------------------------------- | ----------------------------------------------- |
| Pros | No build step; no stale artifacts; instant edits across packages | Consumable by plain Node without a transpiler   |
| Cons | Consumers must transpile (`transpilePackages`/tsup/Vite)         | Extra build task; risk of shipping stale output |

---

## Suggested people to talk to

This is the repository's first commit, so there is **no prior git history to
attribute** — all of this code was authored in this pull request by the agent,
which is exactly why a careful human review is worthwhile.

- **The repository owner (you).** You hold the product decisions in
  `docs/DECISIONS.md` (app name, login identifier, expiry). Confirm the defaults
  before Phase 2 builds on them.
- **Before Phase 5, find someone with applied-cryptography experience.** The
  `packages/crypto` interfaces and `docs/E2EE-THREAT-MODEL.md` deliberately stop
  short of any implementation; a reviewer with real E2EE background should sign
  off on the protocol/library choice before a single line of cipher code lands.

---

## Quiz

<details>
<summary>1. Why do the shared packages export TypeScript source instead of compiled JavaScript?</summary>

**Answer: so consumers transpile them directly, avoiding a separate build step
and stale `dist/` output.** Next uses `transpilePackages`, the server bundles
with tsup (`noExternal`), and Vitest transpiles via Vite. Exporting compiled JS
(the other option) would work with plain Node but adds a build task and the risk
of shipping outdated artifacts. It is _not_ about runtime speed or hiding types.
</details>

<details>
<summary>2. What actually happens when you submit the login form with a valid email and password?</summary>

**Answer: it shows a 500 ms loading state, then an inline notice saying sign-in
isn't available yet — and does not navigate anywhere.** There is no backend in
Phase 1, and the spec forbids faking success. The form validates with the shared
Zod schema but intentionally stops there.
</details>

<details>
<summary>3. The encryption badge in the chat header says "Encryption: planned". Why not "End-to-end encrypted"?</summary>

**Answer: because the app is not encrypted, and claiming otherwise would be
dishonest.** `packages/crypto` contains interfaces only; no message is encrypted.
The rules explicitly prohibit claiming E2EE for the static frontend. The badge
opens a modal that explains encryption is planned and lists the metadata the
server will still see.
</details>

<details>
<summary>4. How does the app decide between the desktop two-pane layout and the mobile list→chat flow?</summary>

**Answer: a single `selectedRoomId` state combined with Tailwind responsive
classes.** On `md+` the sidebar and main panel render side by side. Below `md`
only one is shown: the list when nothing is selected, or the chat (with a back
button) when a room is selected. The back button clears `selectedRoomId`.
</details>

<details>
<summary>5. Where is the 25 MB attachment limit defined, and where is it enforced in Phase 1?</summary>

**Answer: defined once as `MAX_ATTACHMENT_BYTES` in `packages/shared`, and
enforced client-side in the composer** (a picked file larger than the limit is
rejected with an inline error before anything else happens). The server-side and
object-storage enforcement come in Phase 6; sharing the constant means all three
layers will agree.
</details>
