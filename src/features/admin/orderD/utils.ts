import type { FulfillmentStatus } from '@/components/form/FulfillmentForm';
import type {
  OrderDDeliveryStatus,
  OrderDFulfillmentFilter,
  OrderDFulfillmentStatus,
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
export const exportOrdersToCsv = (orders: OrderDRecord[]) => {
  const header = [
    'Order',
    'Date',
    'Customer',
    'Fulfill by',
    'Channel',
    'Total',
    'Payment status',
    'Fulfillment status',
    'Items',
    'Delivery status',
    'Delivery method',
    'Tags',
  ];

  const rows = orders.map((order) =>
    [
      `#${order.orderNumber}`,
      order.placedAt,
      order.customer,
      order.fulfillBy,
      order.channel,
      order.total.toFixed(2),
      order.paymentStatus,
      order.fulfillmentStatus,
      order.items,
      order.deliveryStatus,
      order.deliveryMethod,
      order.tags.join(', '),
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
