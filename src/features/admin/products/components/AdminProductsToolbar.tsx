'use client';

import { CustomSearchInput } from '@/components/form/CustomSearchInput';

export type ProductStatusFilter = '' | 'Draft' | 'Active' | 'Archived';

const statusFilters: [ProductStatusFilter, string][] = [
  ['', 'All'],
  ['Draft', 'Draft'],
  ['Active', 'Active'],
  ['Archived', 'Archived'],
];

interface AdminProductsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: ProductStatusFilter;
  onStatusChange: (status: ProductStatusFilter) => void;
  totalRecords: number;
}

export default function AdminProductsToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  totalRecords,
}: AdminProductsToolbarProps) {
  return (
    <div className="helix-card px-5 py-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2 items-center">
        {statusFilters.map(([value, label]) => (
          <button
            key={value}
            type="button"
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

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-[13px] text-muted whitespace-nowrap">
          Total records: <strong className="text-text">{totalRecords}</strong>
        </span>
        <CustomSearchInput
          className="sm:w-64"
          value={search}
          onChange={onSearchChange}
          placeholder="Search products..."
        />
      </div>
    </div>
  );
}
