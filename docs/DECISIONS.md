# Decisions & open questions

This records the concrete choices made for Phase 0/1 and the defaults used where
the specification left something open (spec §15). Anything marked **default** is
a sensible placeholder that can be revisited before the phase that depends on it.

## Decisions made in Phase 0/1

| Topic                           | Decision                                                   | Rationale                                                    |
| ------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| Package manager / monorepo      | pnpm workspaces + Turborepo                                | First-class workspace support; simple task graph             |
| Language                        | TypeScript, strict everywhere                              | `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax` |
| Internal packages               | Ship TS source, consumed via `transpilePackages`/tsup/Vite | No separate build step or stale `dist/`                      |
| Frontend                        | Next.js App Router + Tailwind v3                           | Matches spec; stable, well-understood config                 |
| Modals/menus                    | Radix Dialog + DropdownMenu                                | Correct focus trap, ESC, ARIA out of the box                 |
| Forms                           | React Hook Form + Zod (shared schemas)                     | One source of truth for validation                           |
| Server                          | Fastify + Pino                                             | Fast, TS-friendly, built-in structured logging               |
| App name (**default**)          | "One2One"                                                  | From the reference screenshot; fits one-to-one               |
| Login identifier (**default**)  | Email + password                                           | Email is the recovery channel; unique + normalized           |
| Room code (**default**)         | 12 chars, alphabet `A–Z2–9` minus `O/I/L`                  | Unambiguous, cryptographically generated server-side         |
| Invitation expiry (**default**) | 24 hours                                                   | Spec recommendation                                          |
| Message length (**default**)    | 4,000 characters                                           | Spec recommendation                                          |
| Attachment limit                | 25 MB                                                      | Spec requirement                                             |

## Honesty guardrails (respected in Phase 1)

- The static frontend uses **mock data**; nothing is sent, stored, or encrypted.
- The UI does **not** claim to be end-to-end encrypted. The encryption indicator
  is explicitly labelled "planned".
- Auth forms validate on the client and then state plainly that the backend is
  not available yet. They never fake a successful login/registration.
- `packages/crypto` contains **interfaces and documentation only** — no cipher.

## Open questions for Phase 2+ (spec §15)

1. Final app name and tagline (currently "One2One").
2. Email verification / password recovery for the first demo?
3. Former-member rejoin behavior.
4. Single-device vs multi-device E2EE for v1.
5. Approved E2EE library/protocol (after threat-model review).
6. Allowed attachment types (allowlist vs denylist details).
7. Production hosts for web, WebSocket server, database, object storage.
8. Message deletion policy (self vs both participants).
9. Whether presence / typing / read receipts can be disabled for privacy.
10. Data-retention and account-deletion requirements.

These do **not** block Phase 0/1 and must be resolved before the phase that
depends on them.
