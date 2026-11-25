import type { AdminOrder } from '@/features/admin/types/orders';

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
