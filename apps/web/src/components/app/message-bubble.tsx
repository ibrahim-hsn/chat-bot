import { RotateCw } from "lucide-react";
import type { MockMessage } from "@/lib/mock-data";
import { cn, formatTime } from "@/lib/utils";
import { DeliveryStatus } from "./delivery-status";

interface MessageBubbleProps {
  message: MockMessage;
  isOwn: boolean;
  onRetry: (messageId: string) => void;
}

export function MessageBubble({ message, isOwn, onRetry }: MessageBubbleProps) {
  const failed = message.status === "failed";

  return (
    <li className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[78%] rounded-card px-3.5 py-2 text-sm sm:max-w-[70%]",
          "whitespace-pre-wrap break-words",
          isOwn
            ? failed
              ? "border border-danger bg-surface text-ink"
              : "bg-primary text-white"
            : "border border-line bg-surface text-ink",
        )}
      >
        <p>{message.body}</p>
        <div
          className={cn(
            "mt-1 flex items-center justify-end gap-1 text-[11px]",
            isOwn && !failed ? "text-white/75" : "text-ink-muted",
          )}
        >
          <time dateTime={message.sentAt}>{formatTime(message.sentAt)}</time>
          {isOwn && (
            <DeliveryStatus
              status={message.status}
              className={failed ? "text-danger" : undefined}
            />
          )}
        </div>

        {failed && isOwn && (
          <button
            type="button"
            onClick={() => onRetry(message.messageId)}
            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-danger hover:underline"
          >
            <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
            Retry
          </button>
        )}
      </div>
    </li>
  );
}
