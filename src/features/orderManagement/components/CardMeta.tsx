import {
  CircleAlert,
  CircleCheck,
  Clock,
  PackageCheck,
  Truck,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import {
  ORDER_STATUS_LABELS,
  OrderStatus,
} from '@/features/orderManagement/lib/orderStatus';

/* ---- Consumer-style status groups (shared by the list and its cards) ---- */
export type TabKey =
  | 'all'
  | 'unpaid'
  | 'processing'
  | 'delivery'
  | 'completed'
  | 'cancelled';

// Real status strings returned by the backend, folded into the
// consumer-facing tab groups.
const UNPAID_STATUSES = [
  'pending_payment',
  'unpaid',
  'requires_payment',
  'pending',
];
const PROCESSING_STATUSES = [
  'paid',
  'accepted',
  'packed',
  'ready_for_shipping',
];
const DELIVERY_STATUSES = ['shipped', 'out_for_delivery', 'delivered'];
const COMPLETED_STATUSES = ['received'];
const CANCELLED_STATUSES = ['cancelled', 'canceled', 'declined', 'refunded'];

export function groupOf(status: string): TabKey {
  const s = (status ?? '').toLowerCase();
  if (CANCELLED_STATUSES.includes(s)) return 'cancelled';
  if (DELIVERY_STATUSES.includes(s)) return 'delivery';
  if (COMPLETED_STATUSES.includes(s)) return 'completed';
  if (UNPAID_STATUSES.includes(s)) return 'unpaid';
  if (PROCESSING_STATUSES.includes(s)) return 'processing';
  return 'all';
}

interface CardMeta {
  title: string;
  Icon: LucideIcon;
  color: string; // icon + title color
  bg: string; // soft icon-chip background
}

export function cardMeta(status: string): CardMeta {
  const s = (status ?? '').toLowerCase() as OrderStatus;

  const metaFor: Record<
    OrderStatus,
    { Icon: LucideIcon; color: string; bg: string }
  > = {
    [OrderStatus.PAID]: {
      Icon: CircleCheck,
      color: 'text-[#e9b45e]',
      bg: 'bg-[#e9b45e]/10',
    },
    [OrderStatus.ACCEPTED]: {
      Icon: CircleCheck,
      color: 'text-[#5fd3c3]',
      bg: 'bg-[#5fd3c3]/10',
    },
    [OrderStatus.DECLINED]: {
      Icon: XCircle,
      color: 'text-[#9ca3af]',
      bg: 'bg-[#9ca3af]/10',
    },
    [OrderStatus.PACKED]: {
      Icon: PackageCheck,
      color: 'text-[#e9b45e]',
      bg: 'bg-[#e9b45e]/10',
    },
    [OrderStatus.READY_FOR_SHIPPING]: {
      Icon: PackageCheck,
      color: 'text-[#e9b45e]',
      bg: 'bg-[#e9b45e]/10',
    },
    [OrderStatus.SHIPPED]: {
      Icon: PackageCheck,
      color: 'text-[#e9b45e]',
      bg: 'bg-[#e9b45e]/10',
    },
    [OrderStatus.OUT_FOR_DELIVERY]: {
      Icon: Truck,
      color: 'text-[#5fd3c3]',
      bg: 'bg-[#5fd3c3]/10',
    },
    [OrderStatus.DELIVERED]: {
      Icon: CircleCheck,
      color: 'text-[#5fd3c3]',
      bg: 'bg-[#5fd3c3]/10',
    },
    [OrderStatus.RECEIVED]: {
      Icon: CircleCheck,
      color: 'text-[#5fd3c3]',
      bg: 'bg-[#5fd3c3]/10',
    },
  };

  const known = metaFor[s];
  if (known) {
    // Show the SAME specific label used on the detail page + tracker so
    // the status reads identically across the board.
    return {
      title: ORDER_STATUS_LABELS[s] ?? s,
      ...known,
    };
  }

  // Unknown / not-yet-mapped statuses fall back to group labels.
  switch (groupOf(status)) {
    case 'completed':
      return {
        title: 'Transaction completed',
        Icon: CircleCheck,
        color: 'text-[#5fd3c3]',
        bg: 'bg-[#5fd3c3]/10',
      };
    case 'delivery':
      return {
        title: 'In delivery',
        Icon: Truck,
        color: 'text-[#e9b45e]',
        bg: 'bg-[#e9b45e]/10',
      };
    case 'processing':
      return {
        title: 'Order processing',
        Icon: Clock,
        color: 'text-[#e9b45e]',
        bg: 'bg-[#e9b45e]/10',
      };
    case 'cancelled':
      return {
        title: 'Order canceled',
        Icon: XCircle,
        color: 'text-[#9ca3af]',
        bg: 'bg-[#9ca3af]/10',
      };
    default:
      return {
        title: 'Payment pending',
        Icon: CircleAlert,
        color: 'text-[#e9b45e]',
        bg: 'bg-[#e9b45e]/10',
      };
  }
}
