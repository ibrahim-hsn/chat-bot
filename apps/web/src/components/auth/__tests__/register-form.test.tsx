import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "../register-form";

describe("RegisterForm", () => {
  it("flags mismatched passwords", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/username/i), "ada_l");
    await user.type(screen.getByLabelText(/email/i), "ada@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "sup3rsecret");
    await user.type(screen.getByLabelText(/confirm password/i), "different1");
    // Terms must be accepted so the object parses and the cross-field
    // password-match refinement runs.
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });
});
