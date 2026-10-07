// lib/orderStatus.ts
// Single source of truth for the order/delivery lifecycle and who is
// allowed to move an order from one status to the next.
//
//   consumer pays ─▶ paid ─▶ accepted (exporter) ─▶ packed ─▶ ready
//                        └▶ declined (exporter)
//   ready ─▶ shipped ─▶ out_for_delivery ─▶ delivered (admin)
//   delivered ─▶ received (consumer)

export enum OrderStatus {
  PAID = 'paid',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  PACKED = 'packed',
  READY_FOR_SHIPPING = 'ready_for_shipping',
  SHIPPED = 'shipped',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  RECEIVED = 'received',
}

export type OrderRole = 'vendor' | 'admin' | 'consumer';

// Linear happy path. DECLINED is a terminal branch and is handled
// separately from this sequence.
export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  OrderStatus.PAID,
  OrderStatus.ACCEPTED,
  OrderStatus.PACKED,
  OrderStatus.READY_FOR_SHIPPING,
  OrderStatus.SHIPPED,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED,
  OrderStatus.RECEIVED,
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PAID]: 'Paid',
  [OrderStatus.ACCEPTED]: 'Order accepted',
  [OrderStatus.DECLINED]: 'Declined',
  [OrderStatus.PACKED]: 'Packed',
  [OrderStatus.READY_FOR_SHIPPING]: 'Ready for shipping',
  [OrderStatus.SHIPPED]: 'Shipped',
  [OrderStatus.OUT_FOR_DELIVERY]: 'Out for delivery',
  [OrderStatus.DELIVERED]: 'Delivered',
  [OrderStatus.RECEIVED]: 'Received',
};

// Each entry: which role may push the order, from which status,
// to which status, and the label to show on the action button.
export interface Transition {
  role: OrderRole;
  from: OrderStatus;
  to: OrderStatus;
  actionLabel: string;
}

export const ORDER_TRANSITIONS: Transition[] = [
  {
    role: 'vendor',
    from: OrderStatus.PAID,
    to: OrderStatus.ACCEPTED,
    actionLabel: 'Accept order',
  },
  {
    role: 'vendor',
    from: OrderStatus.PAID,
    to: OrderStatus.DECLINED,
    actionLabel: 'Decline order',
  },
  {
    role: 'vendor',
    from: OrderStatus.ACCEPTED,
    to: OrderStatus.PACKED,
    actionLabel: 'Mark as packed',
  },
  {
    role: 'vendor',
    from: OrderStatus.PACKED,
    to: OrderStatus.READY_FOR_SHIPPING,
    actionLabel: 'Mark ready for shipping',
  },
  // Admin (delivery) — only when the order is ready can admin ship it.
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
  // Consumer — confirm receipt once delivered.
  {
    role: 'consumer',
    from: OrderStatus.DELIVERED,
    to: OrderStatus.RECEIVED,
    actionLabel: 'Confirm received',
  },
];

/**
 * Returns every transition currently available to a role at a given
 * status. Returns an array because a status can branch — e.g. the
 * exporter can Accept OR Decline a paid order.
 */
export function getAvailableTransitions(
  role: OrderRole,
  currentStatus: OrderStatus,
): Transition[] {
  return ORDER_TRANSITIONS.filter(
    (t) => t.role === role && t.from === currentStatus,
  );
}

/**
 * Returns the single next-step transition available to a role for a
 * given current status, or null if that role has no action right now.
 * Use this when a status can only ever branch to one next step.
 */
export function getAvailableTransition(
  role: OrderRole,
  currentStatus: OrderStatus,
): Transition | null {
  return getAvailableTransitions(role, currentStatus)[0] ?? null;
}

/**
 * The statuses a role should see in their order list.
 * - vendor (exporter): the orders they act on — paid (to accept/decline),
 *   then accepted / declined / packed / ready.
 * - admin & consumer: the whole pipeline (admin oversees it, the consumer
 *   owns it start to finish).
 */
export function roleVisibleStatuses(role: OrderRole): OrderStatus[] {
  switch (role) {
    case 'vendor':
      return [
        OrderStatus.PAID,
        OrderStatus.ACCEPTED,
        OrderStatus.DECLINED,
        OrderStatus.PACKED,
        OrderStatus.READY_FOR_SHIPPING,
      ];
    case 'admin':
    case 'consumer':
    default:
      return [
        OrderStatus.PAID,
        OrderStatus.ACCEPTED,
        OrderStatus.DECLINED,
        OrderStatus.PACKED,
        OrderStatus.READY_FOR_SHIPPING,
        OrderStatus.SHIPPED,
        OrderStatus.OUT_FOR_DELIVERY,
        OrderStatus.DELIVERED,
        OrderStatus.RECEIVED,
      ];
  }
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
