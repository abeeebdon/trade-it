// lib/orderStatus.ts
// Single source of truth for order status values and who is allowed
// to move an order from one status to the next. Vendor, admin, and
// consumer screens all import from here so the lifecycle never drifts
// out of sync between the three surfaces.

export enum OrderStatus {
  PAID = 'paid',
  PACKED = 'packed',
  READY_FOR_SHIPPING = 'ready_for_shipping',
  SHIPPED = 'shipped',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  RECEIVED = 'received',
}

export type OrderRole = 'vendor' | 'admin' | 'consumer';

export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  OrderStatus.PAID,
  OrderStatus.PACKED,
  OrderStatus.READY_FOR_SHIPPING,
  OrderStatus.SHIPPED,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED,
  OrderStatus.RECEIVED,
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PAID]: 'Paid',
  [OrderStatus.PACKED]: 'Packed',
  [OrderStatus.READY_FOR_SHIPPING]: 'Ready for shipping',
  [OrderStatus.SHIPPED]: 'Shipped',
  [OrderStatus.OUT_FOR_DELIVERY]: 'Out for delivery',
  [OrderStatus.DELIVERED]: 'Delivered',
  [OrderStatus.RECEIVED]: 'Received',
};

// Each entry: which role may push the order, from which status,
// to which status, and the label to show on the action button.
interface Transition {
  role: OrderRole;
  from: OrderStatus;
  to: OrderStatus;
  actionLabel: string;
}

export const ORDER_TRANSITIONS: Transition[] = [
  {
    role: 'vendor',
    from: OrderStatus.PAID,
    to: OrderStatus.PACKED,
    actionLabel: 'Mark as packed',
  },
  {
    role: 'vendor',
    from: OrderStatus.PACKED,
    to: OrderStatus.READY_FOR_SHIPPING,
    actionLabel: 'Mark ready for shipping',
  },
  {
    role: 'admin',
    from: OrderStatus.READY_FOR_SHIPPING,
    to: OrderStatus.SHIPPED,
    actionLabel: 'Mark as shipped',
  },
  {
    role: 'admin',
    from: OrderStatus.SHIPPED,
    to: OrderStatus.OUT_FOR_DELIVERY,
    actionLabel: 'Mark out for delivery',
  },
  {
    role: 'admin',
    from: OrderStatus.OUT_FOR_DELIVERY,
    to: OrderStatus.DELIVERED,
    actionLabel: 'Mark as delivered',
  },
  {
    role: 'consumer',
    from: OrderStatus.DELIVERED,
    to: OrderStatus.RECEIVED,
    actionLabel: 'Confirm received',
  },
];

/**
 * Returns the single next-step transition available to a role for a
 * given current status, or null if that role has no action right now.
 * Vendor screen only ever sees vendor transitions, admin only admin,
 * consumer only consumer — so each page naturally shows just its own
 * buttons without needing to filter anything itself.
 */
export function getAvailableTransition(
  role: OrderRole,
  currentStatus: OrderStatus,
): Transition | null {
  return (
    ORDER_TRANSITIONS.find(
      (t) => t.role === role && t.from === currentStatus,
    ) ?? null
  );
}

export function isStatusReached(
  currentStatus: OrderStatus,
  checkStatus: OrderStatus,
): boolean {
  return (
    ORDER_STATUS_SEQUENCE.indexOf(currentStatus) >=
    ORDER_STATUS_SEQUENCE.indexOf(checkStatus)
  );
}
