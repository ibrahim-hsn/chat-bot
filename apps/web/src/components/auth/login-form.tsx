"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Info } from "lucide-react";
import { loginSchema, type LoginInput } from "@one2one/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";

export function LoginForm({ compact = false }: { compact?: boolean }) {
  const baseId = useId();
  const emailId = `${baseId}-email`;
  const passwordId = `${baseId}-password`;
  const [notice, setNotice] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async () => {
    setNotice(null);
    // No backend in Phase 1. We validate on the client, then state plainly that
    // authentication is not wired up yet — we never fake a successful login.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setNotice(
      "Your details passed validation, but sign-in isn't available yet — the authentication backend arrives in a later phase.",
    );
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <Label htmlFor={emailId}>Email</Label>
        <Input
          id={emailId}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          {...register("email")}
        />
        <FieldError id={`${emailId}-error`}>{errors.email?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? `${passwordId}-error` : undefined}
          {...register("password")}
        />
        <FieldError id={`${passwordId}-error`}>{errors.password?.message}</FieldError>
      </div>

      <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
        Log in
      </Button>

      {notice ? (
        <p
          role="status"
          aria-live="polite"
          className="flex items-start gap-2 rounded-input bg-primary-soft px-3 py-2 text-sm text-primary-strong"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {notice}
        </p>
      ) : null}

      {!compact && (
        <p className="text-center text-sm text-ink-muted">
          New here?{" "}
          <Link href="/register" className="font-medium text-primary-strong hover:underline">
            Create an account
          </Link>
        </p>
      )}
    </form>
  );
}
