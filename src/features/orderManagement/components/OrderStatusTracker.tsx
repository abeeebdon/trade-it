// components/OrderStatusTracker.tsx
// Read-only visual stepper. Shared by vendor, admin, and consumer
// screens — none of them own this, they just render it.

import { CheckCircle2, Circle, XCircle } from 'lucide-react';
import {
  ORDER_STATUS_SEQUENCE,
  ORDER_STATUS_LABELS,
  OrderStatus,
} from '@/features/orderManagement/lib/orderStatus';

interface OrderStatusTrackerProps {
  currentStatus: OrderStatus;
}

export function OrderStatusTracker({ currentStatus }: OrderStatusTrackerProps) {
  // Declined is a terminal branch, not part of the linear sequence.
  // Only "Paid" was reached before the exporter turned it down.
  const isDeclined = currentStatus === OrderStatus.DECLINED;
  const currentIndex = isDeclined
    ? 0
    : ORDER_STATUS_SEQUENCE.indexOf(currentStatus);

  return (
    <div className="flex flex-col gap-4">
      {isDeclined && (
        <div className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger inline-flex items-center gap-2">
          <XCircle size={14} />
          Order declined by the exporter — no further movement on this order.
        </div>
      )}

      <ol className="flex flex-col gap-0">
        {ORDER_STATUS_SEQUENCE.map((status, index) => {
          const isComplete = index <= currentIndex;
          const isCurrent = index === currentIndex && !isDeclined;
          const isLast = index === ORDER_STATUS_SEQUENCE.length - 1;

          return (
            <li key={status} className="flex gap-3">
              <div className="flex flex-col items-center">
                {isComplete ? (
                  <CheckCircle2 size={20} className="text-secondary" />
                ) : (
                  <Circle size={20} className="text-muted/40" />
                )}
                {!isLast && (
                  <div
                    className={`w-px flex-1 min-h-6 ${
                      index < currentIndex ? 'bg-secondary' : 'bg-border'
                    }`}
                  />
                )}
              </div>
              <div className="pb-6">
                <p
                  className={`text-sm ${
                    isCurrent
                      ? 'text-primary font-semibold'
                      : isComplete
                        ? 'text-text'
                        : 'text-muted'
                  }`}
                >
                  {ORDER_STATUS_LABELS[status]}
                </p>
                {isCurrent && (
                  <p className="text-xs text-muted mt-0.5">Current status</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
