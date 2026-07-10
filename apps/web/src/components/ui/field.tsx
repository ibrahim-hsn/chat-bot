import { type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

/** Inline validation error. `role="alert"` announces it to screen readers when
 * it appears; wire it to the input via `aria-describedby`. */
export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1 text-sm text-danger">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

export function FieldHint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-ink-muted">
      {children}
    </p>
  );
}
