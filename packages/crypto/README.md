# @one2one/crypto

**Status: interfaces and documentation only. No cryptography is implemented here yet.**

This package declares the browser-side end-to-end-encryption (E2EE) surface that
Phase 5 will implement. It exists so the rest of the codebase can be written and
type-checked against a stable contract, while making it impossible to
accidentally ship a fake or home-grown cipher.

## What this package is NOT

- It does **not** encrypt or decrypt anything today.
- It does **not** define a cryptographic algorithm. Phase 5 must use an audited
  protocol/library (see [`docs/E2EE-THREAT-MODEL.md`](../../docs/E2EE-THREAT-MODEL.md)).
- Its presence does **not** make the app end-to-end encrypted. The Phase 1 UI is
  a static mock; any "encryption" wording in the UI is labelled as _planned_.

## The contract

- `CryptoProvider` — the interface a real implementation must satisfy.
- `IdentityKeyPair`, `PublicIdentityKey`, `PrivateKeyHandle` — key types.
- `EncryptedEnvelope` — the ciphertext-only shape stored on the server.
- `E2EE_PROTOCOL_VERSION` — version stamp for rotation.

## Rules the types encode

1. Identity keys are generated on the client; private keys never leave it.
2. Each message uses a fresh nonce, never reused with the same key.
3. The server only ever sees ciphertext plus non-secret metadata.
4. The protocol is versioned so formats and keys can rotate safely.
