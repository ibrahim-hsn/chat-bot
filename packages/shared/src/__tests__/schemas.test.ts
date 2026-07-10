import { describe, expect, it } from "vitest";
import { ROOM_CODE_ALPHABET, ROOM_CODE_LENGTH, MAX_MESSAGE_LENGTH } from "../constants";
import { registerSchema, loginSchema } from "../schemas/auth";
import { usernameSchema } from "../schemas/user";
import { roomCodeSchema } from "../schemas/room";
import { messageDraftSchema } from "../schemas/message";
import { attachmentMetaSchema, isBlockedMimeType } from "../schemas/attachment";

describe("room code alphabet", () => {
  it("excludes ambiguous characters 0/O/1/I/L", () => {
    for (const char of ["0", "O", "1", "I", "L"]) {
      expect(ROOM_CODE_ALPHABET).not.toContain(char);
    }
  });
});

describe("usernameSchema", () => {
  it("rejects too-short names", () => {
    expect(usernameSchema.safeParse("ab").success).toBe(false);
  });

  it("rejects illegal characters", () => {
    expect(usernameSchema.safeParse("bad name!").success).toBe(false);
  });

  it("accepts a valid name", () => {
    expect(usernameSchema.safeParse("alice_01").success).toBe(true);
  });
});

describe("registerSchema", () => {
  const base = {
    username: "alice_01",
    email: "alice@example.com",
    password: "sup3rsecret",
    confirmPassword: "sup3rsecret",
    acceptTerms: true as const,
  };

  it("accepts a valid registration", () => {
    expect(registerSchema.safeParse(base).success).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({ ...base, confirmPassword: "different1" });
    expect(result.success).toBe(false);
  });

  it("requires accepting terms", () => {
    const result = registerSchema.safeParse({ ...base, acceptTerms: false });
    expect(result.success).toBe(false);
  });

  it("requires a digit in the password", () => {
    const result = registerSchema.safeParse({
      ...base,
      password: "onlyletters",
      confirmPassword: "onlyletters",
    });
    expect(result.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("requires an email and a password", () => {
    expect(loginSchema.safeParse({ email: "a@b.com", password: "x" }).success).toBe(true);
    expect(loginSchema.safeParse({ email: "notanemail", password: "x" }).success).toBe(false);
  });
});

describe("roomCodeSchema", () => {
  it("normalizes and accepts a valid code", () => {
    const valid = ROOM_CODE_ALPHABET.slice(0, ROOM_CODE_LENGTH);
    const spaced = ` ${valid.toLowerCase()} `;
    const result = roomCodeSchema.safeParse(spaced);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe(valid);
    }
  });

  it("rejects a code with the wrong length", () => {
    expect(roomCodeSchema.safeParse("ABC").success).toBe(false);
  });
});

describe("messageDraftSchema", () => {
  it("rejects empty and over-long messages", () => {
    expect(messageDraftSchema.safeParse({ body: "" }).success).toBe(false);
    expect(messageDraftSchema.safeParse({ body: "a".repeat(MAX_MESSAGE_LENGTH + 1) }).success).toBe(
      false,
    );
  });
});

describe("attachment rules", () => {
  it("rejects files over 25 MB", () => {
    const result = attachmentMetaSchema.safeParse({
      filename: "big.bin",
      mimeType: "application/octet-stream",
      size: 26 * 1024 * 1024,
    });
    expect(result.success).toBe(false);
  });

  it("flags dangerous mime types", () => {
    expect(isBlockedMimeType("text/html")).toBe(true);
    expect(isBlockedMimeType("image/png")).toBe(false);
  });
});
