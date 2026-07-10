# AI Chat Project — Complete Context & Implementation Plan

> **Status:** Working specification v1
> **Scope:** Phase 1 is a secure, real-time, one-to-one chat application. The AI chatbot will be introduced in a later phase.
> **Visual reference:** A sidebar/window screenshot was supplied. Use it only for layout inspiration; do not copy unrelated styling or content. In particular, the reference is dark-themed — this product is light-themed.

> **Note (this repository):** This file is the copied source of truth for the
> project. The repository currently implements **Phase 0 + Phase 1** only. See
> `docs/DECISIONS.md` for the concrete decisions and defaults taken so far.

---

## 1. Product summary

Build a clean, light-themed web chat application focused on private one-to-one conversations. Users create accounts with unique usernames and public user IDs. There is no friend system and no group chat. A private conversation begins when one user creates a room and another joins it using a unique room code.

The first release must include a responsive frontend, authentication, room creation/joining, real-time messaging, file attachments up to 25 MB, persistent data, and a carefully defined end-to-end encryption design. It must work on desktop and mobile browsers. During local development, a laptop and phone on the same Wi-Fi network must be able to open the application and exchange messages using two accounts.

### Product principles

- **Simple rather than flashy:** no excessive animation, gradients, floating blobs, glassmorphism, fake AI imagery, or oversized marketing sections.
- **Light and calm:** off-white and pale blue surfaces with a strong blue accent.
- **Private by design:** one-to-one rooms only, minimal user discovery, safe defaults, and no plaintext message storage when E2EE is enabled.
- **Mobile-first responsiveness:** the core chat must remain usable at approximately 360–430 px widths.
- **Build in verified phases:** each phase has tests and acceptance criteria before the next phase begins.

---

## 2. Important product decisions

### 2.1 One-to-one rooms

A room represents one private conversation and can contain a maximum of two active members. The server generates a cryptographically random, unique, human-readable room code. Once two users have joined, the room is locked. The room is never presented as a group chat.

### 2.2 No friend function

Do not build friend requests, followers, contact syncing, suggested users, social feeds, or presence discovery across the whole app. A user only sees rooms they are already a member of.

### 2.3 User identity

Each account has an internal `_id` (never public), an immutable public `userId`, a unique normalized `username` (case-insensitive), an optional display name, a unique normalized email, a password hash, a public encryption identity key, optional key-backup metadata, and an optional avatar. Recommended username rules: 3–24 characters, letters/numbers/underscore only.

### 2.4 AI scope

The current product is the chat foundation for a later AI chatbot project. Do not insert AI features into Phase 1. Keep the architecture extensible.

---

## 3. Recommended technical stack

TypeScript monorepo. Frontend: Next.js (App Router), React, Tailwind CSS, Radix primitives where useful, React Hook Form + Zod, TanStack Query, Socket.IO client, Web Crypto API. Backend: Node.js + TypeScript, Fastify/Express + Socket.IO, MongoDB Atlas, object storage for encrypted attachments, Pino logging.

Repository structure (as implemented here): `apps/web`, `apps/server`, `packages/shared`, `packages/crypto`, `packages/config`, and `docs/`.

---

## 4. User experience and pages

### 4.1 Public landing page

Fits within one normal desktop viewport. Small header (logo, Log in, Create account). Left: concise title, two or three lines, one CTA. Right: a simple rounded chat-style card. Footer: About, Privacy, Terms, Contact, copyright. No fake analytics, testimonials, or decorative animation.

### 4.2 Authentication

Create account, log in, (recommended: forgot/reset password), log out. Registration fields: username, email, password, confirm password, accept terms. Inline validation, password requirements, duplicate errors, loading state, safe generic server errors.

### 4.3 Main application shell

Desktop: left sidebar (identity, New room, Join room, conversation list, account/settings, logout) and a main panel. Mobile: full-width list and chat as separate views with a back button; sidebar becomes a drawer; composer stays above the keyboard/safe area.

### 4.4 Conversation list

Each item: avatar/initials, participant name, last-message preview, relative timestamp, unread count. Include loading skeleton, empty, offline, and retry states.

### 4.5 Create-room flow

Small modal explaining two-person limit. `Create room` calls the backend, which creates a unique code and empty room. Show the code with a copy button and expiry (recommended 24 h). Allow regeneration/revocation. Never generate the authoritative code only on the client. Recommended code format: 10–12 characters, uppercase letters and numbers, ambiguous characters removed, cryptographically secure, unique DB index with retry on collision.

### 4.6 Join-room flow

Input supports pasted codes, trims spaces, normalizes casing. The server checks validity, expiration, revocation, membership, and capacity atomically. Errors distinguish invalid/expired, already joined, own room, and room full without leaking account info.

### 4.7 Chat window

Header: back (mobile), avatar/name/state, encryption indicator, small menu. Messages: sent/received alignment, wrapping, timestamps, sending/sent/delivered/read/failed/retry states, date separators, unread divider, pagination, empty-state guidance. Composer: rounded input, attachment button, send button, Enter sends / Shift+Enter newline, disable duplicate sends, local draft per room, max length ~4,000, upload progress.

### 4.8 Attachments

Max 25 MB per file, enforced on client and server. One file per message to start. Allowlist/denylist for dangerous types. Sanitize filenames; never trust MIME/extension alone. Encrypt in the browser before upload; store only ciphertext; short-lived signed URLs; progress/cancel/failure/retry.

---

## 5. Visual system

Primary accent `#00AAFF` (verify contrast before using for text). Suggested tokens:

```text
--color-primary:          #00AAFF
--color-primary-hover:    #0098E6
--color-primary-strong:   #0077B8
--color-primary-soft:     #E8F7FF
--color-page:             #F5FAFD
--color-surface:          #FFFFFF
--color-surface-muted:    #EDF6FA
--color-border:           #D8E8F0
--color-text:             #173042
--color-text-muted:       #647785
--color-success:          #20875A
--color-warning:          #B56816
--color-danger:           #C83B3B
```

System sans-serif or Inter. Body 16 px / 1.5. Controls ≥ 44 px. Cards 14–18 px radius; inputs/composer 16–22 px. Borders before shadows. Visible focus rings, WCAG AA contrast. Motion 120–180 ms; respect reduced-motion.

---

## 6–14 (Backend, API, E2EE, security, testing, phases, non-goals, definition of done)

The remaining sections of the specification — the data model, API outline,
end-to-end-encryption requirements, security/reliability requirements, the
phase-by-phase plan, the testing strategy, non-goals, and the definition of
done — are the authoritative long-form reference for later phases. They are
summarized where relevant across the other docs in this folder:

- **API + Socket.IO contract:** `docs/API.md`
- **E2EE requirements and threat model:** `docs/E2EE-THREAT-MODEL.md`
- **Testing strategy:** `docs/TEST-PLAN.md`
- **Decisions and defaults:** `docs/DECISIONS.md`

### Phase plan (summary)

- **Phase 0** — Decisions and project foundation. _(done)_
- **Phase 1** — Static responsive frontend with mock data. _(done)_
- **Phase 2** — Authentication and users (MongoDB).
- **Phase 3** — Rooms (secure codes, atomic two-member join).
- **Phase 4** — Real-time plaintext development slice (Socket.IO).
- **Phase 5** — End-to-end encrypted text messages.
- **Phase 6** — Encrypted attachments (≤ 25 MB).
- **Phase 7** — Hardening and production readiness.
- **Phase 8** — Deployment.
- **Phase 9** — AI chatbot extension (designed separately).

### Explicit non-goals for v1

Group chats; friend requests/contacts; public directory; voice/video; stories;
reactions/threads/polls; multiple attachments per message; rich text/Markdown;
AI behavior; server-side reading of E2EE plaintext; claims of production-grade
E2EE before review.

### Definition of done (foundation)

Users register/log in with unique usernames; two users create/join a private
room with a unique code; a third cannot join; users exchange real-time,
persistent, end-to-end encrypted messages; ≤ 25 MB attachments are encrypted
client-side; the app works on desktop and phone including same-Wi-Fi testing;
races/duplicates/disconnects/invalid files are handled; accessibility,
security, tests, deployment, and privacy are documented and verified; the UI
stays simple, light, rounded, responsive, and free of AI-style decoration.
