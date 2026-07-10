"use client";

import { mockCurrentUser } from "@/lib/mock-data";
import { Modal } from "@/components/ui/modal";

export function SettingsModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Account & settings"
      description="A preview of your account. Editing arrives with the accounts backend in a later phase."
    >
      <dl className="divide-y divide-line rounded-card border border-line">
        <div className="flex items-center justify-between px-3 py-2.5 text-sm">
          <dt className="text-ink-muted">Display name</dt>
          <dd className="font-medium text-ink">{mockCurrentUser.displayName}</dd>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 text-sm">
          <dt className="text-ink-muted">Username</dt>
          <dd className="font-medium text-ink">@{mockCurrentUser.username}</dd>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 text-sm">
          <dt className="text-ink-muted">Public user ID</dt>
          <dd className="font-mono text-ink">{mockCurrentUser.userId}</dd>
        </div>
      </dl>
    </Modal>
  );
}
