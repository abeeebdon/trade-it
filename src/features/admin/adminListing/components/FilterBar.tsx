'use client';

export type StatusFilter = '' | 'Active' | 'Draft' | 'Archived' | 'Published';

const statusFilters: [StatusFilter, string][] = [
  ['', 'All'],
  ['Active', 'Active'],
  ['Draft', 'Draft'],
  ['Published', 'Published'],
  ['Archived', 'Archived'],
];

interface FilterBarProps {
  status: StatusFilter;
  onStatusChange: (s: StatusFilter) => void;
}

export default function FilterBar({ status, onStatusChange }: FilterBarProps) {
  return (
    <div className="helix-card px-5 py-3 flex flex-wrap gap-2 items-center">
      {statusFilters.map(([value, label]) => (
        <button
          key={value}
          onClick={() => onStatusChange(value)}
          className={`px-3 py-1.5 rounded-full min-w-20 text-[12px] border transition-colors ${
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
