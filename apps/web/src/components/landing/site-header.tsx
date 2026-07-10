import Link from "next/link";
import { APP_NAME } from "@/env";
import { Brand } from "@/components/brand";
import { buttonClasses } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3 sm:px-6">
      <Link href="/" aria-label={`${APP_NAME} home`} className="rounded-input">
        <Brand />
      </Link>
      <nav aria-label="Account" className="flex items-center gap-2">
        <Link href="/login" className={buttonClasses({ variant: "ghost" })}>
          Log in
        </Link>
        <Link href="/register" className={buttonClasses({ variant: "primary" })}>
          Create account
        </Link>
      </nav>
    </header>
  );
}
