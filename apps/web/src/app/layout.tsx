import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { APP_NAME } from "@/env";

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — private one-to-one chat`,
    template: `%s · ${APP_NAME}`,
  },
  description:
    "A private, light-themed, one-to-one chat app. Two people per room, invite by secure code. No group chats, no friend requests.",
};

export const viewport: Viewport = {
  themeColor: "#00AAFF",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only rounded-input bg-primary px-3 py-2 text-white focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
