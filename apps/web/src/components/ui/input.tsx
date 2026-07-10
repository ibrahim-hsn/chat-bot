import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, "aria-invalid": ariaInvalid, ...props }, ref) {
    return (
      <input
        ref={ref}
        aria-invalid={ariaInvalid}
        className={cn(
          "h-11 w-full rounded-input border border-line bg-surface px-3.5 text-ink",
          "placeholder:text-ink-muted/70 transition",
          "focus-visible:border-primary",
          "aria-[invalid=true]:border-danger aria-[invalid=true]:focus-visible:ring-danger",
          className,
        )}
        {...props}
      />
    );
  },
);
