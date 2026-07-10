import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Composer } from "../composer";

function renderComposer(overrides: Partial<Parameters<typeof Composer>[0]> = {}) {
  const onSend = vi.fn();
  render(
    <Composer value="hello" onChange={() => {}} onSend={onSend} offline={false} {...overrides} />,
  );
  return { onSend };
}

describe("Composer", () => {
  it("sends on Enter", () => {
    const { onSend } = renderComposer();
    fireEvent.keyDown(screen.getByLabelText(/^message$/i), { key: "Enter" });
    expect(onSend).toHaveBeenCalledWith("hello");
  });

  it("inserts a newline on Shift+Enter instead of sending", () => {
    const { onSend } = renderComposer();
    fireEvent.keyDown(screen.getByLabelText(/^message$/i), { key: "Enter", shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();
  });

  it("disables the send button when empty", () => {
    renderComposer({ value: "" });
    expect(screen.getByRole("button", { name: /send message/i })).toBeDisabled();
  });

  it("does not send while offline", () => {
    const { onSend } = renderComposer({ offline: true });
    fireEvent.keyDown(screen.getByLabelText(/^message$/i), { key: "Enter" });
    expect(onSend).not.toHaveBeenCalled();
  });
});
