'use client';

type DeliveryActionModalProps = {
  open: boolean;
  actionType: 'decline' | 'ready' | null;
  declineReason: string;
  trackingCode: string;
  onClose: () => void;
  onDeclineReasonChange: (value: string) => void;
  onTrackingCodeChange: (value: string) => void;
  onConfirm: () => void;
};

export default function DeliveryActionModal({
  open,
  actionType,
  declineReason,
  trackingCode,
  onClose,
  onDeclineReasonChange,
  onTrackingCodeChange,
  onConfirm,
}: DeliveryActionModalProps) {
  if (!open || !actionType) return null;

  const isDecline = actionType === 'decline';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[92%] max-w-md rounded-xl border border-border bg-bg p-5 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-text">
            {isDecline ? 'Decline order' : 'Ready for shipping'}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-muted transition-colors hover:bg-surface hover:text-text"
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          {isDecline ? (
            <>
              <label className="mb-2 block text-xs uppercase tracking-wider text-muted">
                Reason for decline
              </label>
              <textarea
                value={declineReason}
                onChange={(event) => onDeclineReasonChange(event.target.value)}
                rows={4}
                placeholder="Tell the buyer why this order was declined..."
                className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </>
          ) : (
            <>
              <label className="mb-2 block text-xs uppercase tracking-wider text-muted">
                Tracking code
              </label>
              <input
                value={trackingCode}
                onChange={(event) => onTrackingCodeChange(event.target.value)}
                placeholder="Enter generated tracking code"
                className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </>
          )}
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
            disabled={isDecline ? !declineReason.trim() : !trackingCode.trim()}
            className="helix-btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
