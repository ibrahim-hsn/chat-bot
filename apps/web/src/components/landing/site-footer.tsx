import Link from "next/link";
import { APP_NAME } from "@/env";

const links = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 px-4 py-3 text-sm text-ink-muted sm:flex-row sm:px-6">
      <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-ink hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>
      <p>
        © {new Date().getFullYear()} {APP_NAME}
      </p>
    </footer>
  );
}
