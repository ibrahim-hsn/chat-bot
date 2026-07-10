"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Paperclip, SendHorizontal, X } from "lucide-react";
import { MAX_ATTACHMENT_BYTES, MAX_MESSAGE_LENGTH, isBlockedMimeType } from "@one2one/shared";
import { IconButton } from "@/components/ui/icon-button";
import { formatBytes } from "@/lib/utils";

interface SelectedFile {
  name: string;
  size: number;
  type: string;
}

interface ComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (body: string) => void;
  offline: boolean;
}

export function Composer({ value, onChange, onSend, offline }: ComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<SelectedFile | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Autosize the textarea up to a max height.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [value]);

  const trimmed = value.trim();
  const canSend = trimmed.length > 0 && !offline;

  const send = () => {
    if (!canSend) return;
    onSend(trimmed);
    setFile(null);
    setFileError(null);
    // Reset height after clearing.
    requestAnimationFrame(() => {
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  };

  const onFilePicked = (fileList: FileList | null) => {
    const picked = fileList?.[0];
    if (!picked) return;
    if (picked.size > MAX_ATTACHMENT_BYTES) {
      setFileError(`"${picked.name}" is larger than 25 MB.`);
      setFile(null);
    } else if (isBlockedMimeType(picked.type)) {
      setFileError(`"${picked.type || "This file type"}" isn't allowed.`);
      setFile(null);
    } else {
      setFile({ name: picked.name, size: picked.size, type: picked.type });
      setFileError(null);
    }
    // Allow re-selecting the same file later.
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const nearLimit = value.length > MAX_MESSAGE_LENGTH - 200;

  return (
    <div className="border-t border-line bg-surface px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:px-4">
      {file && (
        <div className="mx-auto mb-2 flex max-w-3xl items-center justify-between gap-2 rounded-input border border-line bg-surface-muted px-3 py-2 text-sm">
          <span className="min-w-0 truncate text-ink">
            {file.name} <span className="text-ink-muted">· {formatBytes(file.size)}</span>
          </span>
          <IconButton label="Remove attachment" className="h-8 w-8" onClick={() => setFile(null)}>
            <X className="h-4 w-4" aria-hidden="true" />
          </IconButton>
        </div>
      )}
      {fileError && (
        <p role="alert" className="mx-auto mb-2 max-w-3xl text-sm text-danger">
          {fileError}
        </p>
      )}

      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <input
          ref={fileInputRef}
          type="file"
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
          onChange={(event) => onFilePicked(event.target.files)}
        />
        <IconButton label="Attach a file" onClick={() => fileInputRef.current?.click()}>
          <Paperclip className="h-5 w-5" aria-hidden="true" />
        </IconButton>

        <div className="flex-1">
          <label htmlFor="composer-input" className="sr-only">
            Message
          </label>
          <textarea
            id="composer-input"
            ref={textareaRef}
            rows={1}
            value={value}
            maxLength={MAX_MESSAGE_LENGTH}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={offline ? "You're offline" : "Write a message…"}
            className="w-full resize-none rounded-composer border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 focus-visible:border-primary"
          />
        </div>

        <IconButton
          label="Send message"
          onClick={send}
          disabled={!canSend}
          className="bg-primary text-white hover:bg-primary-hover hover:text-white disabled:bg-surface-muted disabled:text-ink-muted"
        >
          <SendHorizontal className="h-5 w-5" aria-hidden="true" />
        </IconButton>
      </div>

      <div className="mx-auto mt-1 flex max-w-3xl items-center justify-between px-1 text-[11px] text-ink-muted">
        <span>Enter to send · Shift+Enter for a new line</span>
        {nearLimit && (
          <span aria-live="polite">
            {value.length}/{MAX_MESSAGE_LENGTH}
          </span>
        )}
      </div>
    </div>
  );
}
