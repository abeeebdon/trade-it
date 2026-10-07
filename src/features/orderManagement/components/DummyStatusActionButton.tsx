'use client';

import { useState } from 'react';
import { CircleCheck, CircleX, X } from 'lucide-react';
import {
  OrderRole,
  OrderStatus,
  getAvailableTransitions,
} from '@/features/orderManagement/lib/orderStatus';
import { useAppDispatch } from '@/hooks/store/store';
import { setOrderStatus } from '@/store/orders/orders.slice';

interface DummyStatusActionButtonProps {
  orderId: number | string;
  role: OrderRole;
  currentStatus: OrderStatus;
}

export function DummyStatusActionButton({
  orderId,
  role,
  currentStatus,
}: DummyStatusActionButtonProps) {
  const dispatch = useAppDispatch();
  const [pendingAction, setPendingAction] = useState<{
    to: OrderStatus;
    actionLabel: string;
  } | null>(null);
  const [declineReason, setDeclineReason] = useState('');
  const [trackingCode, setTrackingCode] = useState('');

  const transitions = getAvailableTransitions(role, currentStatus);

  if (transitions.length === 0) {
    if (currentStatus === OrderStatus.DECLINED) {
      return (
        <p className="text-xs text-danger inline-flex items-center gap-1.5">
          <CircleX size={14} />
          This order was declined by the exporter and won&apos;t move further.
        </p>
      );
    }
    return <p className="text-xs text-muted"></p>;
  }

  function handleTransition(to: OrderStatus, actionLabel: string) {
    if (to === OrderStatus.DECLINED || to === OrderStatus.READY_FOR_SHIPPING) {
      setPendingAction({ to, actionLabel });
      return;
    }

    dispatch(setOrderStatus({ id: orderId, status: to }));
  }

  function handleConfirm() {
    if (!pendingAction) return;

    if (pendingAction.to === OrderStatus.DECLINED) {
      const reason = declineReason.trim();
      if (!reason) return;

      dispatch(
        setOrderStatus({
          id: orderId,
          status: pendingAction.to,
          declineReason: reason,
        }),
      );
    }

    if (pendingAction.to === OrderStatus.READY_FOR_SHIPPING) {
      const value = trackingCode.trim();
      if (!value) return;

      dispatch(
        setOrderStatus({
          id: orderId,
          status: pendingAction.to,
          trackingCode: value,
        }),
      );
    }

    setPendingAction(null);
    setDeclineReason('');
    setTrackingCode('');
  }

  return (
    <>
      <div className="flex flex-wrap items-center mt-6 gap-2">
        {transitions.map((t) => (
          <button
            key={t.to}
            onClick={() => handleTransition(t.to, t.actionLabel)}
            className="helix-button flex items-center justify-center gap-2 bg-primary text-[#0A1628] cursor-pointer font-semibold rounded-lg px-4 py-2.5 w-full sm:w-auto"
          >
            {t.to === OrderStatus.ACCEPTED && <CircleCheck size={16} />}
            {t.to === OrderStatus.DECLINED && <CircleX size={16} />}
            {t.actionLabel}
          </button>
        ))}
      </div>

      {pendingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[92%] max-w-md rounded-xl border border-border bg-bg p-5 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-text">
                {pendingAction.actionLabel}
              </h3>
              <button
                type="button"
                onClick={() => setPendingAction(null)}
                className="text-muted hover:text-text"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              {pendingAction.to === OrderStatus.DECLINED ? (
                <>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-muted">
                    Reason for decline
                  </label>
                  <textarea
                    value={declineReason}
                    onChange={(event) => setDeclineReason(event.target.value)}
                    rows={4}
                    placeholder="Tell the buyer why this order was declined..."
                    className="w-full rounded-lg border border-border bg-[#0F172A] px-3 py-2 text-sm text-text outline-none focus:border-primary"
                  />
                </>
              ) : (
                <>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-muted">
                    Tracking code
                  </label>
                  <input
                    value={trackingCode}
                    onChange={(event) => setTrackingCode(event.target.value)}
                    placeholder="Enter generated tracking code"
                    className="w-full rounded-lg border border-border bg-[#0F172A] px-3 py-2 text-sm text-text outline-none focus:border-primary"
                  />
                </>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPendingAction(null)}
                className="helix-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={
                  pendingAction.to === OrderStatus.DECLINED
                    ? !declineReason.trim()
                    : !trackingCode.trim()
                }
                className="helix-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
