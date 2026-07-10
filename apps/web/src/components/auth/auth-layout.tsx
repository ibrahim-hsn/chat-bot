import { type ReactNode } from "react";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { Card } from "@/components/ui/card";

/** Centered card layout shared by the login and register screens. */
export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Home" className="inline-flex rounded-input">
          <Brand />
        </Link>
      </header>
      <main id="main" className="flex flex-1 items-center justify-center px-4 py-6">
        <Card className="w-full max-w-sm p-5 sm:p-6">
          <h1 className="text-xl font-semibold text-ink">{title}</h1>
          <p className="mb-4 mt-1 text-sm text-ink-muted">{subtitle}</p>
          {children}
        </Card>
      </main>
    </div>
  );
}
