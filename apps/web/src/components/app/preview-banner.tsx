import { FlaskConical } from "lucide-react";

/**
 * Honest, always-visible reminder that the app is a static Phase 1 preview.
 * Nothing is sent, stored, or encrypted — see the project README for scope.
 */
export function PreviewBanner() {
  return (
    <div className="flex items-center justify-center gap-2 bg-primary-soft px-3 py-1.5 text-center text-xs text-primary-strong">
      <FlaskConical className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      Mock preview — messages use sample data and are not sent, stored, or encrypted.
    </div>
  );
}
