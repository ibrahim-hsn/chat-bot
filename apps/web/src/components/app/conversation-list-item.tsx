import type { MockConversation } from "@/lib/mock-data";
import { cn, formatTime } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

interface ConversationListItemProps {
  conversation: MockConversation;
  selected: boolean;
  onSelect: () => void;
}

export function ConversationListItem({
  conversation,
  selected,
  onSelect,
}: ConversationListItemProps) {
  const name = conversation.participant.displayName ?? conversation.participant.username;
  const lastMessage = conversation.messages.at(-1);
  const preview = lastMessage
    ? lastMessage.body
    : conversation.room.status === "waiting"
      ? "Waiting for them to join…"
      : "No messages yet";

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-current={selected ? "true" : undefined}
        className={cn(
          "flex w-full items-center gap-3 rounded-card px-2.5 py-2 text-left transition",
          selected ? "bg-primary-soft" : "hover:bg-surface-muted",
        )}
      >
        <Avatar name={name} online={conversation.online} />
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="truncate font-medium text-ink">{name}</span>
            {lastMessage && (
              <time dateTime={lastMessage.sentAt} className="shrink-0 text-xs text-ink-muted">
                {formatTime(lastMessage.sentAt)}
              </time>
            )}
          </span>
          <span className="flex items-center justify-between gap-2">
            <span className="truncate text-sm text-ink-muted">{preview}</span>
            {conversation.unreadCount > 0 && (
              <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-white">
                {conversation.unreadCount}
                <span className="sr-only"> unread</span>
              </span>
            )}
          </span>
        </span>
      </button>
    </li>
  );
}
