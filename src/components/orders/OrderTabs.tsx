'use client';

import type { TabKey } from '@/features/orderManagement/components/CardMeta';

const TABS: TabKey[] = [
  'all',
  'unpaid',
  'processing',
  'delivery',
  'completed',
  'cancelled',
];
const TAB_LABELS: Record<TabKey, string> = {
  all: 'All',
  unpaid: 'Unpaid',
  processing: 'Processing',
  delivery: 'Delivery',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export interface OrderTabsProps {
  value: TabKey;
  onChange: (tab: TabKey) => void;
}

export function OrderTabs({ value, onChange }: OrderTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar -mx-1 px-1">
      {TABS.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs cursor-pointer font-medium transition-colors ${
            value === t
              ? 'bg-primary text-[#0A1628]'
              : 'bg-muted/10 text-muted hover:bg-muted/15 hover:text-text'
          }`}
        >
          {TAB_LABELS[t]}
        </button>
      ))}
    </div>
  );
}

export default OrderTabs;
