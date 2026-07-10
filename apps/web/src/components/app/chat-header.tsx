"use client";

import { useState } from "react";
import { ArrowLeft, Info, Lock, MoreVertical } from "lucide-react";
import type { MockConversation } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { Menu, MenuItem } from "@/components/ui/menu";
import { Modal } from "@/components/ui/modal";

interface ChatHeaderProps {
  conversation: MockConversation;
  onBack: () => void;
  onMockAction: (label: string) => void;
}

export function ChatHeader({ conversation, onBack, onMockAction }: ChatHeaderProps) {
  const [encInfoOpen, setEncInfoOpen] = useState(false);
  const name = conversation.participant.displayName ?? conversation.participant.username;

  return (
    <header className="flex items-center gap-2 border-b border-line bg-surface px-2 py-2 sm:px-3">
      <IconButton label="Back to conversations" className="md:hidden" onClick={onBack}>
        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
      </IconButton>

      <Avatar name={name} online={conversation.online} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">{name}</p>
        <p className="truncate text-xs text-ink-muted">
          @{conversation.participant.username} · {conversation.online ? "Online" : "Offline"}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setEncInfoOpen(true)}
        className="rounded-full focus-visible:ring-2"
      >
        <Badge tone="neutral" className="cursor-pointer">
          <Lock className="h-3 w-3" aria-hidden="true" />
          Encryption: planned
        </Badge>
        <span className="sr-only">About encryption</span>
      </button>

      <Menu
        trigger={
          <IconButton label="Conversation menu">
            <MoreVertical className="h-5 w-5" aria-hidden="true" />
          </IconButton>
        }
      >
        <MenuItem onSelect={() => onMockAction("Room info")}>Room info</MenuItem>
        <MenuItem onSelect={() => onMockAction("Block & report")}>Block &amp; report</MenuItem>
        <MenuItem danger onSelect={() => onMockAction("Leave conversation")}>
          Leave conversation
        </MenuItem>
      </Menu>

      <Modal
        open={encInfoOpen}
        onOpenChange={setEncInfoOpen}
        title="About encryption"
        description="End-to-end encryption is planned for a later phase."
      >
        <div className="space-y-3 text-sm text-ink-muted">
          <p className="flex items-start gap-2 rounded-input bg-primary-soft px-3 py-2 text-primary-strong">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            This is a static preview. Messages here are mock data — they are not encrypted, sent, or
            stored.
          </p>
          <p>
            When end-to-end encryption is implemented, only you and the other participant will be
            able to read messages. The server will still see non-content metadata such as account
            IDs, room membership, and timestamps.
          </p>
        </div>
      </Modal>
    </header>
  );
}
