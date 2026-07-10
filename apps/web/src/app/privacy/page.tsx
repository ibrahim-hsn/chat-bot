import type { Metadata } from "next";
import { APP_NAME } from "@/env";
import { ContentShell } from "@/components/site/content-shell";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <ContentShell title="Privacy">
      <p>
        This page describes {APP_NAME}&rsquo;s intended privacy posture. The current build is a
        static preview and does not collect, transmit, or store any personal data.
      </p>
      <h2 className="text-lg font-semibold text-ink">What the server will see</h2>
      <p>
        When messaging is implemented with end-to-end encryption, message contents will be readable
        only on participants&rsquo; devices. Even then, the server will still see non-content
        metadata: account identifiers, room membership, timestamps, message sizes, and network
        information such as IP addresses.
      </p>
      <h2 className="text-lg font-semibold text-ink">Honest disclosure</h2>
      <p>
        {APP_NAME} will not claim to be end-to-end encrypted until that has been implemented against
        an audited protocol and reviewed. Transport security (HTTPS) alone is not end-to-end
        encryption.
      </p>
    </ContentShell>
  );
}
