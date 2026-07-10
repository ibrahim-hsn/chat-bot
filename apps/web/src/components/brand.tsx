import { MessagesSquare } from "lucide-react";
import { APP_NAME } from "@/env";
import { cn } from "@/lib/utils";

/** App wordmark: a rounded blue tile with the app name. */
export function Brand({ className, showName = true }: { className?: string; showName?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-input bg-primary text-white">
        <MessagesSquare className="h-5 w-5" aria-hidden="true" />
      </span>
      {showName && <span className="text-lg font-semibold text-ink">{APP_NAME}</span>}
    </span>
  );
}
