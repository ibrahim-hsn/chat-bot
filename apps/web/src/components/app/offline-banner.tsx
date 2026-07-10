import { WifiOff } from "lucide-react";

/** Shown when the browser reports it is offline (real `navigator.onLine`). */
export function OfflineBanner() {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-2 bg-warning/10 px-3 py-1.5 text-sm text-warning"
    >
      <WifiOff className="h-4 w-4" aria-hidden="true" />
      You&rsquo;re offline. Messages can&rsquo;t be sent until you reconnect.
    </div>
  );
}
