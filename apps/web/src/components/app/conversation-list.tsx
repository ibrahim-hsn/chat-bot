import { WifiOff } from "lucide-react";
import type { MockConversation } from "@/lib/mock-data";
import { Skeleton } from "@/components/ui/skeleton";
import { ConversationListItem } from "./conversation-list-item";

interface ConversationListProps {
  conversations: MockConversation[];
  selectedRoomId: string | null;
  onSelect: (roomId: string) => void;
  loading: boolean;
  offline: boolean;
}

export function ConversationList({
  conversations,
  selectedRoomId,
  onSelect,
  loading,
  offline,
}: ConversationListProps) {
  if (loading) {
    return (
      <div className="space-y-1 p-2" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 px-2.5 py-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
        <span className="sr-only" role="status">
          Loading conversations
        </span>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <p className="p-4 text-sm text-ink-muted">
        No conversations yet. Create a room or join one with a code to get started.
      </p>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {offline && (
        <p className="mx-2 mt-2 flex items-center gap-2 rounded-input bg-surface-muted px-3 py-2 text-xs text-ink-muted">
          <WifiOff className="h-4 w-4" aria-hidden="true" />
          You&rsquo;re offline. Reconnecting when your network returns.
        </p>
      )}
      <ul className="flex-1 space-y-0.5 overflow-y-auto p-2">
        {conversations.map((conversation) => (
          <ConversationListItem
            key={conversation.room.roomId}
            conversation={conversation}
            selected={conversation.room.roomId === selectedRoomId}
            onSelect={() => onSelect(conversation.room.roomId)}
          />
        ))}
      </ul>
    </div>
  );
}
