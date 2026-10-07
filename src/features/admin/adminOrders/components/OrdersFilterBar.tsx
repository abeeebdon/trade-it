'use client';

export type StatusFilter =
  | ''
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export const statusFilters: [StatusFilter, string][] = [
  ['', 'All'],
  ['pending', 'Pending'],
  ['confirmed', 'Confirmed'],
  ['shipped', 'Shipped'],
  ['delivered', 'Delivered'],
  ['cancelled', 'Cancelled'],
];

export function OrdersFilterBar({
  status,
  onStatusChange,
}: {
  status: StatusFilter;
  onStatusChange: (s: StatusFilter) => void;
}) {
  return (
    <div className="helix-card px-5 py-3 flex flex-wrap gap-2 items-center">
      {statusFilters.map(([value, label]) => (
        <button
          key={value}
          onClick={() => onStatusChange(value)}
          className={`px-3 cursor-pointer py-1.5 rounded-full text-[12px] border transition-colors ${
            status === value
              ? 'bg-primary text-secondary border-primary'
              : 'border-border/40 text-muted hover:border-primary hover:text-text'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
