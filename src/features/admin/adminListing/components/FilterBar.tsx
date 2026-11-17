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
              ? 'bg-primary text-bg border-primary'
              : 'border-secondary/40 text-muted hover:border-secondary hover:text-text'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
