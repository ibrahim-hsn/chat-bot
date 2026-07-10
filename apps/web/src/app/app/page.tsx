import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";

export const metadata: Metadata = { title: "App preview" };

export default function AppPage() {
  return (
    <div id="main">
      <AppShell />
    </div>
  );
}
