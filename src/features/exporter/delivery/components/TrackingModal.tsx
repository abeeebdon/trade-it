'use client';

import { X } from 'lucide-react';

type TrackingModalProps = {
  open: boolean;
  value: string;
  onClose: () => void;
  onChange: (value: string) => void;
  onConfirm: () => void;
};

export default function TrackingModal({
  open,
  value,
  onClose,
  onChange,
  onConfirm,
}: TrackingModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[92%] max-w-md rounded-xl border border-border bg-bg p-5 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-text">
            Ready for shipping
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-muted transition-colors hover:bg-surface hover:text-text"
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-xs uppercase tracking-wider text-muted">
            Tracking code
          </label>
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Enter generated tracking code"
            className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="helix-btn-secondary"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={!value.trim()}
            className="helix-btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
