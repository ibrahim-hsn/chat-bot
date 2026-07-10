"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Info } from "lucide-react";
import {
  PASSWORD_MIN_LENGTH,
  registerSchema,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  type RegisterInput,
} from "@one2one/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError, FieldHint } from "@/components/ui/field";

export function RegisterForm() {
  const baseId = useId();
  const usernameId = `${baseId}-username`;
  const emailId = `${baseId}-email`;
  const passwordId = `${baseId}-password`;
  const confirmId = `${baseId}-confirm`;
  const termsId = `${baseId}-terms`;
  const [notice, setNotice] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async () => {
    setNotice(null);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setNotice(
      "Everything checks out on the client. Creating accounts isn't available yet — the backend arrives in a later phase.",
    );
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <Label htmlFor={usernameId}>Username</Label>
        <Input
          id={usernameId}
          autoComplete="username"
          placeholder="e.g. ada_l"
          aria-invalid={errors.username ? true : undefined}
          aria-describedby={errors.username ? `${usernameId}-error` : `${usernameId}-hint`}
          {...register("username")}
        />
        {errors.username ? (
          <FieldError id={`${usernameId}-error`}>{errors.username.message}</FieldError>
        ) : (
          <FieldHint id={`${usernameId}-hint`}>
            {USERNAME_MIN_LENGTH}–{USERNAME_MAX_LENGTH} characters: letters, numbers, underscores.
          </FieldHint>
        )}
      </div>

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
          autoComplete="new-password"
          placeholder="Create a password"
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? `${passwordId}-error` : `${passwordId}-hint`}
          {...register("password")}
        />
        {errors.password ? (
          <FieldError id={`${passwordId}-error`}>{errors.password.message}</FieldError>
        ) : (
          <FieldHint id={`${passwordId}-hint`}>
            At least {PASSWORD_MIN_LENGTH} characters, including a letter and a number.
          </FieldHint>
        )}
      </div>

      <div>
        <Label htmlFor={confirmId}>Confirm password</Label>
        <Input
          id={confirmId}
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          aria-invalid={errors.confirmPassword ? true : undefined}
          aria-describedby={errors.confirmPassword ? `${confirmId}-error` : undefined}
          {...register("confirmPassword")}
        />
        <FieldError id={`${confirmId}-error`}>{errors.confirmPassword?.message}</FieldError>
      </div>

      <div>
        <label htmlFor={termsId} className="flex items-start gap-2.5 text-sm text-ink">
          <input
            id={termsId}
            type="checkbox"
            className="mt-0.5 h-5 w-5 rounded border-line text-primary focus-visible:ring-2 focus-visible:ring-primary"
            aria-invalid={errors.acceptTerms ? true : undefined}
            aria-describedby={errors.acceptTerms ? `${termsId}-error` : undefined}
            {...register("acceptTerms")}
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="font-medium text-primary-strong hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-primary-strong hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <FieldError id={`${termsId}-error`}>{errors.acceptTerms?.message}</FieldError>
      </div>

      <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
        Create account
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

      <p className="text-center text-sm text-ink-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary-strong hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
