'use client';

// components/DummyStatusActionButton.tsx
// Same role-scoped action button as OrderStatusActionButton, but for the
// dummy-data demo it only updates local state instead of PATCHing an API.

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  OrderRole,
  OrderStatus,
  getAvailableTransition,
} from '@/features/orderManagement/lib/orderStatus';

interface DummyStatusActionButtonProps {
  role: OrderRole;
  currentStatus: OrderStatus;
  onStatusChanged: (newStatus: OrderStatus) => void;
}

export function DummyStatusActionButton({
  role,
  currentStatus,
  onStatusChanged,
}: DummyStatusActionButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const transition = getAvailableTransition(role, currentStatus);

  if (!transition) {
    // No action available to this role at the current status.
    return (
      <p className="text-xs text-white/40">
        No action is available for your role at this status.
      </p>
    );
  }

  function handleClick() {
    setIsSubmitting(true);
    // Simulate a short async call, then advance the local status.
    window.setTimeout(() => {
      onStatusChanged(transition.to);
      setIsSubmitting(false);
    }, 450);
  }

  return (
    <button
      onClick={handleClick}
      disabled={isSubmitting}
      className="helix-button flex items-center justify-center gap-2 bg-[#C9922A] text-[#0A1628] font-semibold rounded-lg px-4 py-2.5 disabled:opacity-60 w-full sm:w-auto"
    >
      {isSubmitting && <Loader2 size={16} className="animate-spin" />}
      {transition.actionLabel}
    </button>
  );
}
