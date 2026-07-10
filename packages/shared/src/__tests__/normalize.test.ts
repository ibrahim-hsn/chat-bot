import { describe, expect, it } from "vitest";
import { normalizeEmail, normalizeRoomCode, normalizeUsername } from "../normalize";

describe("normalizeUsername", () => {
  it("lowercases and trims", () => {
    expect(normalizeUsername("  Alice_01 ")).toBe("alice_01");
  });

  it("treats differently-cased names as equal", () => {
    expect(normalizeUsername("BOB")).toBe(normalizeUsername("bob"));
  });
});

describe("normalizeEmail", () => {
  it("lowercases and trims", () => {
    expect(normalizeEmail("  User@Example.COM ")).toBe("user@example.com");
  });
});

describe("normalizeRoomCode", () => {
  it("removes whitespace and uppercases", () => {
    expect(normalizeRoomCode(" abcd efgh jkmn ")).toBe("ABCDEFGHJKMN");
  });
});
