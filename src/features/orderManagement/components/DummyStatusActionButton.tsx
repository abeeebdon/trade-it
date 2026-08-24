'use client';

// components/DummyStatusActionButton.tsx
// Role-scoped action buttons for the demo. Reads the available
// transitions from the shared lifecycle and dispatches them straight
// into the Redux orders store (no API call — demo mode).

import { CircleCheck, CircleX } from 'lucide-react';
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
    return (
      <p className="text-xs text-muted">
        No action is available for your role at this status.
      </p>
    );
  }

  function handleTransition(to: OrderStatus) {
    dispatch(setOrderStatus({ id: orderId, status: to }));
  }

  return (
    <div className="flex flex-wrap items-center mt-6 gap-2">
      {transitions.map((t) => (
        <button
          key={t.to}
          onClick={() => handleTransition(t.to)}
          className="helix-button flex items-center justify-center gap-2 bg-primary text-[#0A1628] cursor-pointer font-semibold rounded-lg px-4 py-2.5 w-full sm:w-auto"
        >
          {t.to === OrderStatus.ACCEPTED && <CircleCheck size={16} />}
          {t.to === OrderStatus.DECLINED && <CircleX size={16} />}
          {t.actionLabel}
        </button>
      ))}
    </div>
  );
}
