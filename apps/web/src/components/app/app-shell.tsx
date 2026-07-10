"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu as MenuIcon, Plus, X } from "lucide-react";
import type { MessageStatus } from "@one2one/shared";
import { mockConversations, mockCurrentUser, type MockConversation } from "@/lib/mock-data";
import { Brand } from "@/components/brand";
import { IconButton } from "@/components/ui/icon-button";
import { Drawer } from "@/components/ui/drawer";
import { Sidebar } from "./sidebar";
import { ConversationList } from "./conversation-list";
import { ChatWindow } from "./chat-window";
import { MainEmptyState } from "./empty-state";
import { PreviewBanner } from "./preview-banner";
import { OfflineBanner } from "./offline-banner";
import { CreateRoomModal } from "./create-room-modal";
import { JoinRoomModal } from "./join-room-modal";
import { SettingsModal } from "./settings-modal";

// Deep clone so interactions never mutate the shared mock fixture.
const initialConversations = (): MockConversation[] =>
  mockConversations.map((c) => ({ ...c, messages: c.messages.map((m) => ({ ...m })) }));

export function AppShell() {
  const router = useRouter();
  const [conversations, setConversations] = useState<MockConversation[]>(initialConversations);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Simulate the conversation list loading once on mount (loading skeleton).
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Reflect real network status (offline state).
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  const selectedConversation = useMemo(
    () => conversations.find((c) => c.room.roomId === selectedRoomId) ?? null,
    [conversations, selectedRoomId],
  );

  const updateMessageStatus = (roomId: string, messageId: string, status: MessageStatus) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.room.roomId === roomId
          ? {
              ...c,
              messages: c.messages.map((m) => (m.messageId === messageId ? { ...m, status } : m)),
            }
          : c,
      ),
    );
  };

  const selectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setDrawerOpen(false);
    // Clear the unread badge when a room is opened.
    setConversations((prev) =>
      prev.map((c) => (c.room.roomId === roomId ? { ...c, unreadCount: 0 } : c)),
    );
  };

  const sendMessage = (roomId: string, body: string) => {
    const messageId = crypto.randomUUID();
    setConversations((prev) =>
      prev.map((c) =>
        c.room.roomId === roomId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  messageId,
                  roomId,
                  senderId: mockCurrentUser.userId,
                  type: "text",
                  body,
                  status: "sending",
                  sentAt: new Date().toISOString(),
                },
              ],
            }
          : c,
      ),
    );
    setDrafts((prev) => ({ ...prev, [roomId]: "" }));
    // Mock local-only delivery progression (clearly not a real backend).
    setTimeout(() => updateMessageStatus(roomId, messageId, "sent"), 700);
    setTimeout(() => updateMessageStatus(roomId, messageId, "delivered"), 1500);
  };

  const retryMessage = (roomId: string, messageId: string) => {
    updateMessageStatus(roomId, messageId, "sending");
    setTimeout(() => updateMessageStatus(roomId, messageId, "sent"), 700);
    setTimeout(() => updateMessageStatus(roomId, messageId, "delivered"), 1500);
  };

  const showMockNotice = (label: string) => {
    setNotice(`"${label}" isn't available in this mock preview.`);
  };

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  const logout = () => router.push("/");

  const sidebar = (
    <Sidebar
      conversations={conversations}
      selectedRoomId={selectedRoomId}
      loading={loading}
      offline={offline}
      onSelect={selectRoom}
      onNewRoom={() => {
        setDrawerOpen(false);
        setCreateOpen(true);
      }}
      onJoinRoom={() => {
        setDrawerOpen(false);
        setJoinOpen(true);
      }}
      onOpenSettings={() => {
        setDrawerOpen(false);
        setSettingsOpen(true);
      }}
      onLogout={logout}
    />
  );

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-page text-ink">
      <PreviewBanner />
      {offline && <OfflineBanner />}
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center justify-center gap-2 bg-ink px-3 py-1.5 text-sm text-white"
        >
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss"
            className="rounded p-0.5 hover:bg-white/10"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden w-80 shrink-0 border-r border-line md:block">{sidebar}</aside>

        {/* Mobile drawer sidebar */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Menu">
          {sidebar}
        </Drawer>

        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          {selectedConversation ? (
            <ChatWindow
              conversation={selectedConversation}
              currentUserId={mockCurrentUser.userId}
              draft={drafts[selectedConversation.room.roomId] ?? ""}
              offline={offline}
              onDraftChange={(value) =>
                setDrafts((prev) => ({ ...prev, [selectedConversation.room.roomId]: value }))
              }
              onSend={(body) => sendMessage(selectedConversation.room.roomId, body)}
              onRetry={(messageId) => retryMessage(selectedConversation.room.roomId, messageId)}
              onBack={() => setSelectedRoomId(null)}
              onMockAction={showMockNotice}
            />
          ) : (
            <>
              {/* Mobile: full-width conversation list with a top bar. */}
              <div className="flex min-h-0 min-w-0 flex-1 flex-col md:hidden">
                <header className="flex items-center gap-2 border-b border-line bg-surface px-2 py-2">
                  <IconButton label="Open menu" onClick={() => setDrawerOpen(true)}>
                    <MenuIcon className="h-5 w-5" aria-hidden="true" />
                  </IconButton>
                  <div className="flex-1">
                    <Brand />
                  </div>
                  <IconButton label="Create room" onClick={() => setCreateOpen(true)}>
                    <Plus className="h-5 w-5" aria-hidden="true" />
                  </IconButton>
                </header>
                <ConversationList
                  conversations={conversations}
                  selectedRoomId={selectedRoomId}
                  onSelect={selectRoom}
                  loading={loading}
                  offline={offline}
                />
              </div>

              {/* Desktop: calm empty state. */}
              <div className="hidden min-h-0 flex-1 md:block">
                <MainEmptyState
                  variant={conversations.length > 0 ? "select" : "welcome"}
                  onNewRoom={() => setCreateOpen(true)}
                  onJoinRoom={() => setJoinOpen(true)}
                />
              </div>
            </>
          )}
        </main>
      </div>

      <CreateRoomModal open={createOpen} onOpenChange={setCreateOpen} />
      <JoinRoomModal open={joinOpen} onOpenChange={setJoinOpen} />
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
