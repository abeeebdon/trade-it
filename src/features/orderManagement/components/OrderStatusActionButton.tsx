// components/OrderStatusActionButton.tsx
// One button component, reused by all three screens. Each screen just
// passes its own role and its own API base path — the button doesn't
// care which page it's rendered on.

'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  OrderRole,
  OrderStatus,
  getAvailableTransition,
} from '@/features/orderManagement/lib/orderStatus';

interface OrderStatusActionButtonProps {
  orderId: string;
  role: OrderRole;
  currentStatus: OrderStatus;
  apiBasePath: string; // e.g. "/api/vendor/orders", "/api/admin/orders", "/api/consumer/orders"
  onStatusChanged: (newStatus: OrderStatus) => void;
}

export function OrderStatusActionButton({
  orderId,
  role,
  currentStatus,
  apiBasePath,
  onStatusChanged,
}: OrderStatusActionButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transition = getAvailableTransition(role, currentStatus);

  if (!transition) {
    // No action available to this role at the current status —
    // render nothing rather than a disabled button.
    return null;
  }

  async function handleClick() {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${apiBasePath}/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: transition!.to }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Couldn't update the order status.");
      }

      onStatusChanged(transition!.to);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={isSubmitting}
        className="helix-button flex items-center justify-center gap-2 bg-[#C9922A] text-[#0A1628] font-semibold rounded-lg px-4 py-2.5 disabled:opacity-60"
      >
        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
        {transition.actionLabel}
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
