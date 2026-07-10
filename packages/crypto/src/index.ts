/**
 * @one2one/crypto — INTERFACES AND DOCUMENTATION ONLY.
 *
 * This package intentionally contains **no cryptographic implementation**. It
 * declares the browser-side E2EE surface that Phase 5 must implement against an
 * audited protocol/library (see `docs/E2EE-THREAT-MODEL.md`). Nothing here
 * encrypts anything, and the current application is NOT end-to-end encrypted.
 *
 * Design rules this package encodes as types:
 *  - Identity keys are generated on the client; private keys never leave it.
 *  - Every message uses a fresh nonce that is never reused with a key.
 *  - The server only ever sees ciphertext + non-secret metadata.
 *  - The protocol is versioned so keys and formats can rotate.
 */

/** Bumped whenever the wire format or key derivation changes. */
export const E2EE_PROTOCOL_VERSION = 1 as const;

/** Base64-encoded public identity key, safe to publish to the server. */
export type PublicIdentityKey = string;

/** Opaque handle to a private key. Implementations must keep bytes off disk
 * in plaintext and out of `localStorage`. */
export interface PrivateKeyHandle {
  readonly __brand: "PrivateKeyHandle";
}

export interface IdentityKeyPair {
  publicKey: PublicIdentityKey;
  privateKey: PrivateKeyHandle;
}

/** Ciphertext envelope stored on the server. Contains no plaintext. */
export interface EncryptedEnvelope {
  version: number;
  /** Base64 ciphertext. */
  ciphertext: string;
  /** Base64 per-message nonce; unique per key. */
  nonce: string;
  /** Name of the AEAD algorithm used, for forward compatibility. */
  algorithm: string;
  /** Optional wrapped content key(s) for the recipient(s). */
  encryptedKeyEnvelope?: string;
}

/**
 * The contract a Phase 5 implementation must satisfy. Declared here so callers
 * can be written and type-checked before the crypto exists. There is no default
 * implementation on purpose — importing one must be an explicit, reviewed step.
 */
export interface CryptoProvider {
  generateIdentityKeyPair(): Promise<IdentityKeyPair>;
  encrypt(plaintext: Uint8Array, recipient: PublicIdentityKey): Promise<EncryptedEnvelope>;
  decrypt(envelope: EncryptedEnvelope): Promise<Uint8Array>;
  /** Safety number for out-of-band participant verification. */
  computeSafetyNumber(a: PublicIdentityKey, b: PublicIdentityKey): Promise<string>;
}
