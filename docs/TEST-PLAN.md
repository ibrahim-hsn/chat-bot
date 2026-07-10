# Test plan

Each phase ends with lint, type-check, unit tests, a desktop check, and a 390 px
mobile check. This file tracks the strategy and what is actually covered today.

## Tooling

- **Unit / component:** Vitest. Node environment for `packages/*`; jsdom +
  React Testing Library for `apps/web`.
- **End-to-end:** Playwright (`apps/web/e2e`), desktop + Pixel-5 mobile projects.
- **Static:** ESLint (flat config) + TypeScript `--noEmit` + Prettier.

## Covered in Phase 0/1

| Area                                                         | Test          | File                                                            |
| ------------------------------------------------------------ | ------------- | --------------------------------------------------------------- |
| Username/email/room-code normalization                       | unit          | `packages/shared/src/__tests__/normalize.test.ts`               |
| Auth/username/room-code/message/attachment schemas           | unit          | `packages/shared/src/__tests__/schemas.test.ts`                 |
| Health + readiness endpoints, security headers               | unit (inject) | `apps/server/src/__tests__/health.test.ts`                      |
| Login form validation + honest (non-fake) notice             | component     | `apps/web/src/components/auth/__tests__/login-form.test.tsx`    |
| Register password-mismatch validation                        | component     | `apps/web/src/components/auth/__tests__/register-form.test.tsx` |
| Composer: Enter sends, Shift+Enter newline, disabled/offline | component     | `apps/web/src/components/app/__tests__/composer.test.tsx`       |
| Landing render + no horizontal overflow + skip link focus    | e2e           | `apps/web/e2e/landing.spec.ts`                                  |
| App preview banner, list load, create-room code, mobile nav  | e2e           | `apps/web/e2e/app.spec.ts`                                      |

## Acceptance criteria (Phase 1) mapping

- **No horizontal overflow 360 px → desktop** — e2e overflow assertion (desktop + Pixel 5).
- **Keyboard accessible with focus states** — global `:focus-visible` ring; skip-link e2e; semantic controls.
- **Landing fits a laptop viewport** — single-screen flex layout; mobile scrolls minimally.
- **Composer usable with long text / long filenames** — max-length + counter; truncation on chips.
- **Loading / empty / offline / error states exist** — skeletons, empty states, `navigator.onLine` banner, failed-message retry.

## Planned coverage (later phases)

Registration/login/refresh/logout; unique-index races; concurrent room join
(never three members); room/message authorization; socket auth + acks;
pagination + reconnect sync; signed attachment intent; crypto serialization,
nonce handling, tamper failure; two-user Playwright flow; 25 MB boundary.

## Running

```bash
pnpm test                              # all unit/component tests
pnpm --filter @one2one/web test:e2e    # Playwright (requires a browser)
```

> Playwright downloads a Chromium build on first run. In sandboxes that block
> that download the e2e specs cannot execute; run them in CI (the provided
> workflow installs the browser with `--with-deps`) or locally.
