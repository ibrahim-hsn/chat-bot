import { type LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Thin styling wrapper over a native `<label>`. Callers always pass `htmlFor`
 * to bind it to a control, which the a11y rule can't verify statically here.
 */
export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control -- htmlFor is supplied by callers
    <label className={cn("mb-1.5 block text-sm font-medium text-ink", className)} {...props} />
  );
}
