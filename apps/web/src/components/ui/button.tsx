import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-strong",
  secondary: "bg-surface text-ink border border-line hover:bg-surface-muted",
  ghost: "bg-transparent text-ink hover:bg-surface-muted",
  danger: "bg-danger text-white hover:opacity-90",
};

const sizeClasses: Record<Size, string> = {
  // 44px min height keeps tap targets accessible on touch devices.
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

const baseClasses =
  "inline-flex select-none items-center justify-center gap-2 rounded-input font-medium transition disabled:cursor-not-allowed disabled:opacity-60";

/** Compute button classes for non-button elements (e.g. a Next.js `Link`). */
export function buttonClasses(options?: { variant?: Variant; size?: Size; className?: string }) {
  const { variant = "primary", size = "md", className } = options ?? {};
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", loading = false, disabled, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
});
