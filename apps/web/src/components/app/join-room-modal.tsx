"use client";

import { useId, useState, type FormEvent } from "react";
import { Info } from "lucide-react";
import { normalizeRoomCode, roomCodeSchema } from "@one2one/shared";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";

export function JoinRoomModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const inputId = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setValue("");
    setError(null);
    setNotice(null);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setNotice(null);
    const parsed = roomCodeSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "That room code doesn't look right.");
      return;
    }
    setError(null);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmitting(false);
    // The code is well-formed; joining needs the server, which isn't wired yet.
    setNotice(
      "That code is valid. Joining a room needs the backend, which arrives in a later phase.",
    );
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="Join a room"
      description="Paste the code you received. Spaces and letter case don't matter."
    >
      <form onSubmit={onSubmit} noValidate className="space-y-3">
        <div>
          <Label htmlFor={inputId}>Room code</Label>
          <Input
            id={inputId}
            value={value}
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            placeholder="e.g. ABCD EFGH JKMN"
            className="font-mono tracking-[0.15em]"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            onChange={(event) => {
              setValue(normalizeRoomCode(event.target.value));
              if (error) setError(null);
            }}
          />
          <FieldError id={`${inputId}-error`}>{error}</FieldError>
        </div>

        <Button type="submit" size="lg" loading={submitting} className="w-full">
          Join room
        </Button>

        {notice ? (
          <p
            role="status"
            aria-live="polite"
            className="flex items-start gap-2 rounded-input bg-primary-soft px-3 py-2 text-sm text-primary-strong"
          >
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {notice}
          </p>
        ) : null}
      </form>
    </Modal>
  );
}
