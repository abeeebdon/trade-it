'use client';

import type { ReactNode } from 'react';
import { formatDateTime } from '@/lib/func';

export type OrderTimelineEvent = {
  id: string;
  title: ReactNode;
  meta?: ReactNode;
  /** ISO string or Date — rendered as the date/time on the right. */
  timestamp?: string | Date | null;
  action?: ReactNode;
};

export default function OrderTimeline({
  events,
}: {
  events: OrderTimelineEvent[];
}) {
  if (!events.length) {
    return (
      <p className="text-sm text-muted">No activity for this order yet.</p>
    );
  }

  return (
    <ol className="flex flex-col">
      {events.map((event, index) => {
        const isLast = index === events.length - 1;

        return (
          <li key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center pt-1.5">
              <span className="size-2.5 shrink-0 rounded-full border-2 border-primary bg-bg" />
              {!isLast && <span className="mt-1 w-px flex-1 bg-border" />}
            </div>

            <div
              className={`flex min-w-0 flex-1 items-start justify-between gap-3 ${
                isLast ? '' : 'pb-6'
              }`}
            >
              <div className="flex min-w-0 flex-col gap-1.5">
                <p className="text-sm text-text">{event.title}</p>
                {event.meta && (
                  <p className="text-xs text-muted wrap-break-word">
                    {event.meta}
                  </p>
                )}
                {event.action}
              </div>

              {event.timestamp && (
                <span className="shrink-0 pt-0.5 text-right font-mono text-[11px] text-muted">
                  {formatDateTime(event.timestamp)}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
