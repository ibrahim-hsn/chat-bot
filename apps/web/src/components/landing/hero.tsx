import Link from "next/link";
import { Lock, UserPlus } from "lucide-react";
import { APP_NAME } from "@/env";
import { buttonClasses } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="max-w-lg">
      <h1 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        Private, one-to-one chat. Nothing else.
      </h1>
      <p className="mt-4 text-base text-ink-muted">
        {APP_NAME} rooms hold exactly two people. Create a room, share the secure code once, and
        talk. No group chats, no friend requests, no discovery — just a calm, direct line.
      </p>
      <ul className="mt-5 space-y-2 text-sm text-ink-muted">
        <li className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-primary-strong" aria-hidden="true" />
          Built for end-to-end encryption (added in a later phase).
        </li>
        <li className="flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-primary-strong" aria-hidden="true" />
          Two people per room — locked once both have joined.
        </li>
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link href="/register" className={buttonClasses({ variant: "primary", size: "lg" })}>
          Create your account
        </Link>
        <Link href="/app" className={buttonClasses({ variant: "secondary", size: "lg" })}>
          Preview the app (mock UI)
        </Link>
      </div>
    </section>
  );
}
