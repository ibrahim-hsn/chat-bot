"use client";

import type { MockConversation } from "@/lib/mock-data";
import { ChatHeader } from "./chat-header";
import { MessageList } from "./message-list";
import { Composer } from "./composer";

interface ChatWindowProps {
  conversation: MockConversation;
  currentUserId: string;
  draft: string;
  offline: boolean;
  onDraftChange: (value: string) => void;
  onSend: (body: string) => void;
  onRetry: (messageId: string) => void;
  onBack: () => void;
  onMockAction: (label: string) => void;
}

export function ChatWindow({
  conversation,
  currentUserId,
  draft,
  offline,
  onDraftChange,
  onSend,
  onRetry,
  onBack,
  onMockAction,
}: ChatWindowProps) {
  return (
    <section className="flex h-full min-h-0 flex-col bg-page" aria-label="Conversation">
      <ChatHeader conversation={conversation} onBack={onBack} onMockAction={onMockAction} />
      <MessageList conversation={conversation} currentUserId={currentUserId} onRetry={onRetry} />
      <Composer value={draft} onChange={onDraftChange} onSend={onSend} offline={offline} />
    </section>
  );
}
