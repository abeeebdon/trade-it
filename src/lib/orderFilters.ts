import { DELIVERY_FILTERS } from '@/components/orders/OrderFilter';
import {
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from '@/features/orderManagement/lib/orderStatus';

/** Base UI needs a real value for "no filter", so map '' to a sentinel. */
export const ALL_FILTER = '__all__';

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
