// components/OrderStatusActionButton.tsx
// One button component, reused by all three screens. Each screen just
// passes its own role and its own API base path — the button doesn't
// care which page it's rendered on. Renders every transition available
// to the role at the current status (e.g. Accept + Decline on a paid
// order).

'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  OrderRole,
  OrderStatus,
  getAvailableTransitions,
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

  const transitions = getAvailableTransitions(role, currentStatus);

  if (transitions.length === 0) {
    // No action available to this role at the current status —
    // render nothing rather than a disabled button.
    return null;
  }

  async function handleClick(to: OrderStatus) {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${apiBasePath}/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Couldn't update the order status.");
      }

      onStatusChanged(to);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {transitions.map((t) => (
          <button
            key={t.to}
            onClick={() => handleClick(t.to)}
            disabled={isSubmitting}
            className="helix-button flex items-center justify-center gap-2 bg-primary text-[#0A1628] font-semibold rounded-lg px-4 py-2.5 disabled:opacity-60"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {t.actionLabel}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
