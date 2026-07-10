# E2EE threat model (draft — not yet implemented)

> **This is a design document, not a claim.** No end-to-end encryption exists in
> the codebase yet. `packages/crypto` contains interfaces only. The application
> must not be described as end-to-end encrypted until Phase 5 is implemented
> against an audited library and independently reviewed.

## Goal

Message (and later attachment) plaintext is available only on the participants'
devices. The server stores ciphertext and non-secret metadata. HTTPS/WSS
protects transport; it is **not** a substitute for E2EE.

## Approach (to be finalized in Phase 5)

Use a documented, versioned design built on **audited primitives** — do not
invent a cipher. Two candidate directions:

1. **Preferred:** an established protocol/library implementing Signal-style
   identity keys, prekeys, and Double Ratchet semantics.
2. **Prototype:** per-user identity key pairs + authenticated key agreement,
   deriving per-room/per-message keys with HKDF, encrypting with AES-GCM or
   XChaCha20-Poly1305. Must be labelled a prototype until reviewed.

The chosen approach must define: client identity-key generation; public-key
registration/retrieval; authentication of the key exchange; session setup when
the second member joins; per-message nonces never reused with a key; forward
secrecy and post-compromise goals; key rotation/versioning; new-device and
recovery behavior; multi-device status; safety-number/QR verification;
identity-change warnings; encrypted attachment key/metadata envelopes.

## What the server can still see

Account IDs, room membership, timestamps, ciphertext sizes, delivery events,
and network/IP logs — possibly presence. This is disclosed honestly in the
Privacy page.

## Key-storage rules

- Never store plaintext private keys in MongoDB.
- Never log plaintext messages, tokens, passwords, reset tokens, private keys,
  room codes, or decrypted attachments.
- No long-lived private key material in `localStorage`.
- Password-based key backup (if used) must use a memory-hard KDF (Argon2id) with
  a unique salt and documented parameters.
- Server password hashing: Argon2id (or bcrypt with an appropriate work factor).

## Status

Not started. This document must be completed and reviewed **before** any
encryption code is written or any E2EE claim is made in product copy.
