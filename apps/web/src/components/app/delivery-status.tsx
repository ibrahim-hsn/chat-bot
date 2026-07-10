import { AlertCircle, Check, CheckCheck, Clock } from "lucide-react";
import type { MessageStatus } from "@one2one/shared";
import { cn } from "@/lib/utils";

const LABELS: Record<MessageStatus, string> = {
  sending: "Sending",
  sent: "Sent",
  delivered: "Delivered",
  read: "Read",
  failed: "Failed to send",
};

/** Small delivery-state indicator with a screen-reader label. */
export function DeliveryStatus({
  status,
  className,
}: {
  status: MessageStatus;
  className?: string;
}) {
  const icon = () => {
    switch (status) {
      case "sending":
        return <Clock className="h-3.5 w-3.5" aria-hidden="true" />;
      case "sent":
        return <Check className="h-3.5 w-3.5" aria-hidden="true" />;
      case "delivered":
        return <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" />;
      case "read":
        return <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" />;
      case "failed":
        return <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />;
    }
  };

  return (
    <span className={cn("inline-flex items-center", className)}>
      {icon()}
      <span className="sr-only">{LABELS[status]}</span>
    </span>
  );
}
