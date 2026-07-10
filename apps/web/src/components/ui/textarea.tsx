import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full resize-none rounded-input border border-line bg-surface px-3.5 py-2.5 text-ink",
        "placeholder:text-ink-muted/70 transition focus-visible:border-primary",
        className,
      )}
      {...props}
    />
  );
});
