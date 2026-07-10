import { type ReactNode } from "react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";

/** Simple header/content/footer shell for the static informational pages. */
export function ContentShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader />
      <main id="main" className="flex-1 px-4 py-10 sm:px-6">
        <article className="mx-auto max-w-2xl space-y-4 text-ink-muted">
          <h1 className="text-2xl font-semibold text-ink">{title}</h1>
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
