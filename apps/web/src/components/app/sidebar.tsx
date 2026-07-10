import { LogIn, LogOut, Plus, Settings } from "lucide-react";
import type { MockConversation } from "@/lib/mock-data";
import { mockCurrentUser } from "@/lib/mock-data";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";
import { ConversationList } from "./conversation-list";

interface SidebarProps {
  conversations: MockConversation[];
  selectedRoomId: string | null;
  loading: boolean;
  offline: boolean;
  onSelect: (roomId: string) => void;
  onNewRoom: () => void;
  onJoinRoom: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

export function Sidebar({
  conversations,
  selectedRoomId,
  loading,
  offline,
  onSelect,
  onNewRoom,
  onJoinRoom,
  onOpenSettings,
  onLogout,
}: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex items-center justify-between px-4 py-3">
        <Brand />
      </div>

      <div className="grid grid-cols-2 gap-2 px-3 pb-2">
        <Button onClick={onNewRoom}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          New room
        </Button>
        <Button variant="secondary" onClick={onJoinRoom}>
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Join room
        </Button>
      </div>

      <div className="px-4 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-ink-muted">
        Conversations
      </div>
      <nav aria-label="Conversations" className="min-h-0 flex-1">
        <ConversationList
          conversations={conversations}
          selectedRoomId={selectedRoomId}
          onSelect={onSelect}
          loading={loading}
          offline={offline}
        />
      </nav>

      <div className="flex items-center gap-2 border-t border-line px-3 py-2.5">
        <Avatar name={mockCurrentUser.displayName ?? mockCurrentUser.username} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">
            {mockCurrentUser.displayName ?? mockCurrentUser.username}
          </p>
          <p className="truncate text-xs text-ink-muted">@{mockCurrentUser.username}</p>
        </div>
        <IconButton label="Settings" onClick={onOpenSettings}>
          <Settings className="h-5 w-5" aria-hidden="true" />
        </IconButton>
        <IconButton label="Log out" onClick={onLogout}>
          <LogOut className="h-5 w-5" aria-hidden="true" />
        </IconButton>
      </div>
    </div>
  );
}
