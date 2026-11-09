'use client';

import { CustomSearchInput } from '@/components/form/CustomSearchInput';
import CustomSelect from '@/components/form/CustomSelect';
import type { OrderDFulfillmentFilter } from '../types';

const ALL_METHODS = '__all__';

type FulfillmentTab = {
  value: OrderDFulfillmentFilter;
  label: string;
};

const FULFILLMENT_TABS: FulfillmentTab[] = [
  { value: '', label: 'All' },
  { value: 'unfulfilled', label: 'Unfulfilled' },
  { value: 'fulfilled', label: 'Fulfilled' },
];

type OrderDFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  fulfillment: OrderDFulfillmentFilter;
  onFulfillmentChange: (value: OrderDFulfillmentFilter) => void;
  method: string;
  methods: string[];
  onMethodChange: (value: string) => void;
};

export default function OrderDFilters({
  search,
  onSearchChange,
  fulfillment,
  onFulfillmentChange,
  method,
  methods,
  onMethodChange,
}: OrderDFiltersProps) {
  return (
    <div className="helix-card px-4 py-3 flex flex-col lg:flex-row lg:items-center gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {FULFILLMENT_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onFulfillmentChange(tab.value)}
            className={`px-3 cursor-pointer py-1.5 rounded-full text-[12px] border transition-colors ${
              fulfillment === tab.value
                ? 'bg-primary text-secondary border-primary'
                : 'border-border/40 text-muted hover:border-primary hover:text-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:ml-auto">
        <CustomSearchInput
          className="w-full max-w-64"
          value={search}
          onChange={onSearchChange}
          placeholder="Search and filter orders"
          ariaLabel="Search orders"
        />

        <div className="w-full sm:w-44">
          <CustomSelect
            align="end"
            triggerClassName="text-sm text-muted"
            placeholder="All delivery methods"
            value={method === '' ? ALL_METHODS : method}
            onValueChange={(value) =>
              onMethodChange(value === ALL_METHODS ? '' : value)
            }
            options={[
              { label: 'All delivery methods', value: ALL_METHODS },
              ...methods.map((option) => ({ label: option, value: option })),
            ]}
          />
        </div>
      </div>
    </div>
  );
}
