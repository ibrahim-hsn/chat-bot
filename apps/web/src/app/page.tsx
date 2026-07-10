import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Hero } from "@/components/landing/hero";
import { AuthCard } from "@/components/landing/auth-card";

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader />
      <main id="main" className="flex flex-1 items-center px-4 py-8 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
          <Hero />
          <div className="flex justify-center lg:justify-end">
            <AuthCard />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
