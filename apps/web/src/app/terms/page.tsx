import type { Metadata } from "next";
import { APP_NAME } from "@/env";
import { ContentShell } from "@/components/site/content-shell";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <ContentShell title="Terms">
      <p>
        These placeholder terms describe how {APP_NAME} is intended to be used. Because this is an
        in-progress project rather than a production service, they are informational only.
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Use {APP_NAME} only to communicate with people who have agreed to talk with you.</li>
        <li>Do not use it for unlawful activity or to harass others.</li>
        <li>Rooms are strictly one-to-one; attempts to circumvent that limit are not supported.</li>
        <li>The service is provided as-is, without warranty, while it is under development.</li>
      </ul>
    </ContentShell>
  );
}
