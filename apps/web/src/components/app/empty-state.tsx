import { KeyRound, LogIn, MessagesSquare, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MainEmptyStateProps {
  variant: "welcome" | "select";
  onNewRoom: () => void;
  onJoinRoom: () => void;
}

const cards = [
  {
    icon: KeyRound,
    title: "Create a room",
    body: "Generate a secure code and invite exactly one person.",
  },
  {
    icon: LogIn,
    title: "Join with a code",
    body: "Paste a code you received to open a private room.",
  },
  {
    icon: Sparkles,
    title: "Later",
    body: "Real-time messaging, encryption, and file sharing arrive in later phases.",
  },
];

export function MainEmptyState({ variant, onNewRoom, onJoinRoom }: MainEmptyStateProps) {
  if (variant === "select") {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <span className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-card bg-surface-muted text-primary-strong">
          <MessagesSquare className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="text-lg font-semibold text-ink">Select a conversation</h2>
        <p className="mt-1 max-w-xs text-sm text-ink-muted">
          Choose a room from the list to read and reply.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center p-6 text-center sm:p-8">
      <span className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-card bg-surface-muted text-primary-strong">
        <MessagesSquare className="h-7 w-7" aria-hidden="true" />
      </span>
      <h2 className="text-xl font-semibold text-ink">No conversations yet</h2>
      <p className="mt-1 max-w-md text-sm text-ink-muted">
        One2One rooms are strictly one-to-one. Create a room to get a secure invite code, or join
        one with a code you received.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" onClick={onNewRoom}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Create room
        </Button>
        <Button size="lg" variant="secondary" onClick={onJoinRoom}>
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Join room
        </Button>
      </div>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title} className="p-4 text-left">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-input bg-primary-soft text-primary-strong">
              <card.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-3 text-sm font-semibold text-ink">{card.title}</h3>
            <p className="mt-1 text-xs text-ink-muted">{card.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
