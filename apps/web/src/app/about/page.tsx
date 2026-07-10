import type { Metadata } from "next";
import { APP_NAME } from "@/env";
import { ContentShell } from "@/components/site/content-shell";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <ContentShell title={`About ${APP_NAME}`}>
      <p>
        {APP_NAME} is a private, one-to-one chat application. Every conversation lives in a room
        that holds exactly two people. You start a conversation by creating a room, sharing its
        secure code with one person, and letting them join.
      </p>
      <p>
        There are deliberately no group chats, no friend requests, and no public directory. You only
        ever see rooms you already belong to.
      </p>
      <p>
        This is an in-progress project built in verified phases. The current release is a static
        interface preview; real accounts, messaging, encryption, and attachments arrive in later
        phases.
      </p>
    </ContentShell>
  );
}
