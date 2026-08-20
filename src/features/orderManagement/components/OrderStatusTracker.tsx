// components/OrderStatusTracker.tsx
// Read-only visual stepper. Shared by vendor, admin, and consumer
// screens — none of them own this, they just render it.

import { CheckCircle2, Circle } from 'lucide-react';
import {
  ORDER_STATUS_SEQUENCE,
  ORDER_STATUS_LABELS,
  OrderStatus,
} from '@/features/orderManagement/lib/orderStatus';

interface OrderStatusTrackerProps {
  currentStatus: OrderStatus;
}

export function OrderStatusTracker({ currentStatus }: OrderStatusTrackerProps) {
  const currentIndex = ORDER_STATUS_SEQUENCE.indexOf(currentStatus);

  return (
    <ol className="flex flex-col gap-0">
      {ORDER_STATUS_SEQUENCE.map((status, index) => {
        const isComplete = index <= currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === ORDER_STATUS_SEQUENCE.length - 1;

        return (
          <li key={status} className="flex gap-3">
            <div className="flex flex-col items-center">
              {isComplete ? (
                <CheckCircle2 size={20} className="text-[#1A7A6E]" />
              ) : (
                <Circle size={20} className="text-white/20" />
              )}
              {!isLast && (
                <div
                  className={`w-px flex-1 min-h-[24px] ${
                    index < currentIndex ? 'bg-[#1A7A6E]' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
            <div className="pb-6">
              <p
                className={`text-sm ${
                  isCurrent
                    ? 'text-[#C9922A] font-semibold'
                    : isComplete
                      ? 'text-white/90'
                      : 'text-white/40'
                }`}
              >
                {ORDER_STATUS_LABELS[status]}
              </p>
              {isCurrent && (
                <p className="text-xs text-white/40 mt-0.5">Current status</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
