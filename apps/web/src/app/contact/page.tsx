import type { Metadata } from "next";
import { APP_NAME } from "@/env";
import { ContentShell } from "@/components/site/content-shell";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <ContentShell title="Contact">
      <p>
        {APP_NAME} is a course and portfolio project developed in the open. The best place to raise
        questions, report issues, or follow progress is the project&rsquo;s source repository.
      </p>
      <p>
        A dedicated support channel will be added if and when the project moves toward a public
        release.
      </p>
    </ContentShell>
  );
}
