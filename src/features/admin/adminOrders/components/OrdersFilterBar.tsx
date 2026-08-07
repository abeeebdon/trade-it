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
      <span className="text-[12px] text-[#9CA3AF] mr-1">Status:</span>
      {statusFilters.map(([value, label]) => (
        <button
          key={value}
          onClick={() => onStatusChange(value)}
          className={`px-3 cursor-pointer py-1.5 rounded-full text-[12px] border transition-colors ${
            status === value
              ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]'
              : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E] hover:text-[#F5F5F5]'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
