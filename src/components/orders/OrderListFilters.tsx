'use client';

import CustomSelect from '@/components/form/CustomSelect';
import { CustomSearchInput } from '@/components/form/CustomSearchInput';
import {
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from '@/features/orderManagement/lib/orderStatus';
import { DELIVERY_FILTERS } from './OrderFilter';

/** Base UI needs a real value for "no filter", so map '' to a sentinel. */
const ALL = '__all__';

export type OrderFilterOption = {
  label: string;
  value: string;
};

/** "out_for_delivery" -> "Out for delivery" when the status is unknown. */
export const statusLabel = (status: string) =>
  ORDER_STATUS_LABELS[status as OrderStatus] ??
  status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());

/** Builds dropdown options from the statuses actually present in the data. */
export const toStatusOptions = (statuses: string[]): OrderFilterOption[] =>
  Array.from(new Set(statuses.filter(Boolean)))
    .sort((a, b) => a.localeCompare(b))
    .map((status) => ({ value: status, label: statusLabel(status) }));

export const DELIVERY_FILTER_OPTIONS: OrderFilterOption[] =
  DELIVERY_FILTERS.filter((value) => value !== 'All').map((value) => ({
    value,
    label: value,
  }));

type OrderListFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;

  product: string;
  products: string[];
  onProductChange: (value: string) => void;

  status: string;
  statusOptions: OrderFilterOption[];
  onStatusChange: (value: string) => void;

  delivery: string;
  deliveryOptions?: OrderFilterOption[];
  onDeliveryChange: (value: string) => void;
  /** Hide the delivery dropdown when the list already filters deliveries elsewhere. */
  //   showDelivery?: boolean;

  onClear: () => void;
  resultCount?: number;
  totalCount?: number;
};

export default function OrderListFilters({
  search,
  onSearchChange,
  searchPlaceholder = 'Search orders...',
  product,
  products,
  onProductChange,
  status,
  statusOptions,
  onStatusChange,
  resultCount,
  totalCount,
}: OrderListFiltersProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 justify-between sm:flex-row lg:items-center">
        <CustomSearchInput
          className="lg:flex-1"
          value={search}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />

        <div className="basis-2/3 flex justify-end   gap-2  ">
          <CustomSelect
            className="w-full max-w-40"
            placeholder="All products"
            value={product === '' ? ALL : product}
            onValueChange={(value) =>
              onProductChange(value === ALL ? '' : value)
            }
            options={[
              { label: 'All products', value: ALL },
              ...products.map((name) => ({ label: name, value: name })),
            ]}
          />

          <CustomSelect
            className="w-full max-w-40"
            placeholder="All statuses"
            value={status === '' ? ALL : status}
            onValueChange={(value) =>
              onStatusChange(value === ALL ? '' : value)
            }
            options={[{ label: 'All statuses', value: ALL }, ...statusOptions]}
          />
        </div>
      </div>

      {typeof resultCount === 'number' && typeof totalCount === 'number' && (
        <p className="text-[12px] text-muted">
          Showing <strong className="text-text">{resultCount}</strong> of{' '}
          <strong className="text-text">{totalCount}</strong> orders
        </p>
      )}
    </section>
  );
}
