"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { INVITATION_TTL_HOURS, ROOM_CODE_ALPHABET, ROOM_CODE_LENGTH } from "@one2one/shared";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

/** A display-only sample code. The authoritative code is generated securely on
 * the server in a later phase; this is purely to show the UI. */
function sampleRoomCode(): string {
  const bytes = new Uint32Array(ROOM_CODE_LENGTH);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (n) => ROOM_CODE_ALPHABET[n % ROOM_CODE_ALPHABET.length]).join("");
}

export function CreateRoomModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [generating, setGenerating] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setGenerating(true);
    setCopied(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setCode(sampleRoomCode());
    setGenerating(false);
  };

  const copy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setCode(null);
      setCopied(false);
    }
    onOpenChange(next);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="Create a room"
      description="A room holds exactly two people. Share the code with one person; the room locks once they join."
    >
      {code ? (
        <div className="space-y-3">
          <div>
            <p className="mb-1.5 text-sm font-medium text-ink">Your invite code</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-input border border-line bg-surface-muted px-3 py-2.5 font-mono text-lg tracking-[0.2em] text-ink">
                {code}
              </code>
              <Button variant="secondary" onClick={copy} aria-label="Copy code">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-success" aria-hidden="true" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" /> Copy
                  </>
                )}
              </Button>
            </div>
          </div>
          <p className="text-xs text-ink-muted">
            Sample code for preview only — codes are generated securely by the server in a later
            phase, and unused invites expire after {INVITATION_TTL_HOURS} hours.
          </p>
          <Button variant="ghost" onClick={generate} loading={generating} className="w-full">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Regenerate
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-ink-muted">
            We&rsquo;ll create an empty room and give you a one-time code to share outside the app.
          </p>
          <Button onClick={generate} loading={generating} className="w-full" size="lg">
            Create room
          </Button>
        </div>
      )}
    </Modal>
  );
}
