'use client';

import type { OrderCounts, OrderStatusCategory } from '../types';
import { FILTERS } from '../constants';

interface FilterBarProps {
  filter: OrderStatusCategory;
  onFilterChange: (v: OrderStatusCategory) => void;
  counts: OrderCounts;
}

export default function FilterBar({
  filter,
  onFilterChange,
  counts,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {FILTERS.map((f) => {
        const active = filter === f.v;
        const c = counts[f.v] ?? 0;
        return (
          <button
            key={f.v}
            onClick={() => onFilterChange(f.v)}
            className={`px-4 py-2 rounded-full text-[12px] border inline-flex items-center gap-2 transition-all ${
              active
                ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A] font-semibold'
                : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'
            }`}
          >
            {f.l}
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                active
                  ? 'bg-[#0A1628]/25 text-[#0A1628]'
                  : 'bg-[#1A7A6E]/15 text-[#C9922A]'
              }`}
            >
              {c}
            </span>
          </button>
        );
      })}
    </div>
  );
}
