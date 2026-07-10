import Link from "next/link";
import { Card } from "@/components/ui/card";
import { buttonClasses } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/login-form";

/** The rounded chat-style card on the landing page (spec §4.1). */
export function AuthCard() {
  return (
    <Card className="w-full max-w-sm p-5 sm:p-6">
      <h2 className="text-xl font-semibold text-ink">Welcome back</h2>
      <p className="mb-4 mt-1 text-sm text-ink-muted">Log in to open your private rooms.</p>

      <LoginForm compact />

      <div className="my-4 flex items-center gap-3 text-xs uppercase tracking-wide text-ink-muted">
        <span className="h-px flex-1 bg-line" />
        or
        <span className="h-px flex-1 bg-line" />
      </div>

      <Link
        href="/register"
        className={buttonClasses({ variant: "secondary", className: "w-full" })}
      >
        Create an account
      </Link>
    </Card>
  );
}
