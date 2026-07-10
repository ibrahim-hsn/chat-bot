import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <AuthLayout title="Log in" subtitle="Welcome back — open your private rooms.">
      <LoginForm />
    </AuthLayout>
  );
}
