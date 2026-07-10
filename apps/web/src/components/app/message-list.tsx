"use client";

import { useEffect, useRef } from "react";
import type { MockConversation } from "@/lib/mock-data";
import { formatDateSeparator } from "@/lib/utils";
import { MessageBubble } from "./message-bubble";

interface MessageListProps {
  conversation: MockConversation;
  currentUserId: string;
  onRetry: (messageId: string) => void;
}

export function MessageList({ conversation, currentUserId, onRetry }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageCount = conversation.messages.length;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messageCount, conversation.room.roomId]);

  if (messageCount === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-center">
        <p className="max-w-xs text-sm text-ink-muted">
          {conversation.room.status === "waiting"
            ? "Waiting for the other person to join with your room code."
            : `No messages yet. Say hello to ${conversation.participant.displayName ?? conversation.participant.username}.`}
        </p>
      </div>
    );
  }

  let lastDay = "";

  return (
    <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4">
      <ul className="mx-auto flex max-w-3xl flex-col gap-2">
        {conversation.messages.map((message) => {
          const day = formatDateSeparator(message.sentAt);
          const showDay = day !== lastDay;
          lastDay = day;

          return (
            <div key={message.messageId} className="contents">
              {showDay && (
                <li className="my-2 flex items-center justify-center" aria-hidden="true">
                  <span className="rounded-full bg-surface-muted px-3 py-1 text-xs text-ink-muted">
                    {day}
                  </span>
                </li>
              )}
              {message.firstUnread && (
                <li className="my-1 flex items-center gap-3 text-xs font-medium text-primary-strong">
                  <span className="h-px flex-1 bg-primary/30" />
                  Unread messages
                  <span className="h-px flex-1 bg-primary/30" />
                </li>
              )}
              <MessageBubble
                message={message}
                isOwn={message.senderId === currentUserId}
                onRetry={onRetry}
              />
            </div>
          );
        })}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
}
