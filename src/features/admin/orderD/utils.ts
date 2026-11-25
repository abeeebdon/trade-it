import type { FulfillmentStatus } from '@/components/form/FulfillmentForm';
import type { AdminOrder } from '@/features/admin/types/orders';
import type {
  OrderDChannel,
  OrderDDeliveryStatus,
  OrderDFulfillmentFilter,
  OrderDFulfillmentStatus,
  OrderDPaymentStatus,
  OrderDRecord,
} from './types';

const DAY_MS = 24 * 60 * 60 * 1000;

const formatTime = (date: Date) =>
  date
    .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    .toLowerCase();

/** "Tuesday at 6:02 am" for the current week, "Nov 2 at 12:53 am" otherwise. */
export const formatOrderDate = (iso: string) => {
  if (!iso) return '—';

  const date = new Date(iso);
  const diffDays = Math.floor((Date.now() - date.getTime()) / DAY_MS);

  const dayPart =
    diffDays >= 0 && diffDays < 7
      ? date.toLocaleDateString('en-US', { weekday: 'long' })
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return `${dayPart} at ${formatTime(date)}`;
};

/** "5 days ago", "Today", "in 3 days". */
export const formatRelativeDay = (iso: string) => {
  if (!iso) return '';

  const target = new Date(iso);
  const today = new Date();
  const targetStart = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
  ).getTime();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();

  const diffDays = Math.round((targetStart - todayStart) / DAY_MS);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;

  return `in ${diffDays} days`;
};

export const formatItems = (count: number) =>
  `${count} ${count === 1 ? 'item' : 'items'}`;

export type NormalizedFulfillmentStatus =
  | 'unfulfilled'
  | 'shipped'
  | 'fulfilled'
  | 'delivered';

const DELIVERED_STATUSES = ['delivered', 'received', 'completed'];
const SHIPPED_STATUSES = [
  'shipped',
  'in_transit',
  'out_for_delivery',
  'dispatched',
];

/** Normalizes the many API fulfillment statuses onto the filter buckets. */
export const normalizeFulfillmentStatus = (
  status?: string | null,
): NormalizedFulfillmentStatus => {
  const value = (status ?? '').toLowerCase();

  if (DELIVERED_STATUSES.includes(value)) return 'delivered';
  if (SHIPPED_STATUSES.includes(value)) return 'shipped';
  if (value === 'fulfilled') return 'fulfilled';

  return 'unfulfilled';
};

/** Maps the shipment form status onto the table's fulfillment status. */
export const toFulfillmentStatus = (
  status: FulfillmentStatus,
): OrderDFulfillmentStatus =>
  status === 'shipped' || status === 'delivered' ? 'Fulfilled' : 'Unfulfilled';

/** Maps the shipment form status onto the table's delivery status. */
export const toDeliveryStatus = (
  status: FulfillmentStatus,
  hasTracking: boolean,
): OrderDDeliveryStatus => {
  if (status === 'delivered') return 'Delivered';
  if (hasTracking) return 'Tracking added';

  return '';
};

/** Seeds the shipment form from an existing order row. */
export const toFormStatus = (order: OrderDRecord): FulfillmentStatus => {
  if (order.deliveryStatus === 'Delivered') return 'delivered';
  if (order.fulfillmentStatus === 'Fulfilled') return 'shipped';

  return 'unfulfilled';
};

export const deliveryMethodOptions = (orders: OrderDRecord[]) => {
  const methods = Array.from(
    new Set(orders.map((order) => order.deliveryMethod).filter(Boolean)),
  );

  return methods.sort((a, b) => a.localeCompare(b));
};

/** API fulfillment statuses that mean the order has been fulfilled. */
const FULFILLED_STATUSES = ['fulfilled', 'shipped', 'delivered', 'in_transit'];

const toPaymentStatusFromApi = (
  status?: string | null,
): OrderDPaymentStatus => {
  const value = (status ?? '').toLowerCase();
  if (value === 'paid') return 'Paid';
  if (value === 'refunded' || value === 'failed') return 'Refunded';
  return 'Pending';
};

const toFulfillmentStatusFromApi = (
  status?: string | null,
): OrderDFulfillmentStatus =>
  FULFILLED_STATUSES.includes((status ?? '').toLowerCase())
    ? 'Fulfilled'
    : 'Unfulfilled';

const toDeliveryStatusFromApi = (order: AdminOrder): OrderDDeliveryStatus => {
  if (order.deliveredAt) return 'Delivered';
  if (order.trackingNumber) return 'Tracking added';
  return '';
};

const toChannelFromApi = (order: AdminOrder): OrderDChannel => {
  const value = (order.orderType ?? '').toLowerCase();

  if (value === 'shopify' || value === 'online' || value === 'online store') {
    return 'Online Store';
  }
  if (value === 'pos') return 'POS';

  return 'Draft Orders';
};

/** Maps an admin orders API record onto the table row shape. */
export const toOrderDRecord = (order: AdminOrder): OrderDRecord => ({
  id: String(order.id),
  orderNumber: order.orderNumber,
  placedAt: order.paidAt ?? order.deliveryDate ?? '',
  customer: order.shipTo || order.email || 'No customer',
  fulfillBy: '',
  channel: toChannelFromApi(order),
  total: order.totalAmount ?? order.amount ?? 0,
  paymentStatus: toPaymentStatusFromApi(order.paymentStatus),
  fulfillmentStatus: toFulfillmentStatusFromApi(order.fulfillmentStatus),
  items: order.quantity ?? 0,
  deliveryStatus: toDeliveryStatusFromApi(order),
  deliveryMethod: 'Shipping',
  tags: order.orderType ? [order.orderType] : [],
  courierName: order.courierName ?? '',
  trackingNumber: order.trackingNumber ?? '',
  trackingUrl: order.trackingUrl ?? '',
});

export const toOrderDRecords = (orders: AdminOrder[]) =>
  orders.map(toOrderDRecord);

export const matchesFilters = (
  order: OrderDRecord,
  filters: {
    search: string;
    fulfillment: OrderDFulfillmentFilter;
    method: string;
  },
) => {
  const fulfillmentMatches =
    filters.fulfillment === '' ||
    order.fulfillmentStatus.toLowerCase() === filters.fulfillment;

  const methodMatches =
    filters.method === '' || order.deliveryMethod === filters.method;

  const term = filters.search.trim().toLowerCase();
  const searchMatches =
    term === '' ||
    [
      order.orderNumber,
      order.customer,
      order.channel,
      order.courierName,
      order.trackingNumber,
      order.tags.join(' '),
    ]
      .join(' ')
      .toLowerCase()
      .includes(term);

  return fulfillmentMatches && methodMatches && searchMatches;
};

export const nextOrderNumber = (orders: OrderDRecord[]) =>
  String(
    orders.reduce(
      (max, order) => Math.max(max, Number(order.orderNumber) || 0),
      0,
    ) + 1,
  );

const csvCell = (value: string | number) =>
  `"${String(value).replace(/"/g, '""')}"`;

/** Downloads the currently visible orders as a CSV file. */
export const exportOrdersToCsv = (orders: AdminOrder[]) => {
  const header = [
    'Order',
    'Delivery date',
    'Customer',
    'Email',
    'Product',
    'Quantity',
    'Channel',
    'Total',
    'Currency',
    'Payment status',
    'Fulfillment status',
    'Courier',
    'Tracking number',
    'Status',
  ];

  const rows = orders.map((order) =>
    [
      `#${order.orderNumber}`,
      order.deliveryDate,
      order.shipTo,
      order.email,
      order.productName,
      order.quantity,
      order.orderType,
      (order.totalAmount ?? order.amount ?? 0).toFixed(2),
      order.currency ?? 'usd',
      order.paymentStatus,
      order.fulfillmentStatus ?? '',
      order.courierName ?? '',
      order.trackingNumber ?? '',
      order.status,
    ].map(csvCell),
  );

  const csv = [header.map(csvCell), ...rows]
    .map((row) => row.join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
