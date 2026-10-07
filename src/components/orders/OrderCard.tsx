import Link from 'next/link';
import { Package } from 'lucide-react';
import { toast } from 'sonner';
import { formatDateTime, formatUSD } from '@/lib/func';
import type { ConsumerOrder } from '@/features/shops/types/shops';
import {
  cardMeta,
  groupOf,
  type TabKey,
} from '@/features/orderManagement/components/CardMeta';
import { useAppSelector } from '@/hooks/store/store';
import { useRouter } from 'next/navigation';

const ACTIONS: Record<TabKey, string[]> = {
  completed: ['Feedback', 'Track order', 'Review'],
  delivery: ['Track order', 'Feedback'],
  processing: ['Feedback', 'Track order'],
  unpaid: ['Pay now', 'Feedback'],
  cancelled: ['Feedback'],
  all: [],
};

export interface OrderCardProps {
  order: ConsumerOrder;
  detailsHref?: (orderId: number) => string;
}

const defaultDetailsHref = (orderId: number) =>
  `/consumer/orders/details?id=${orderId}`;

export function OrderCard({
  order,
  detailsHref = defaultDetailsHref,
}: OrderCardProps) {
  const meta = cardMeta(order.status);
  const { Icon } = meta;
  const router = useRouter();
  const actions = ACTIONS[groupOf(order.status)] ?? [];
  const total = order.totalAmount ?? order.amount;
  const { user } = useAppSelector((state) => state.auth);

  return (
    <article className="helix-card rounded-xl overflow-hidden">
      {/* Status header */}
      <div className="flex items-center justify-between gap-3 px-4 pt-3.5 pb-2">
        <div
          className={`inline-flex items-center gap-2 text-[13px] font-medium ${meta.color}`}
        >
          <span
            className={`size-7 rounded-full inline-flex items-center justify-center ${meta.bg}`}
          >
            <Icon size={15} />
          </span>
          {meta.title}
        </div>
        <span className="text-[11px] text-muted font-mono">
          {formatDateTime(order.deliveryDate)}
        </span>
      </div>

      {/* Product row */}
      <article className="flex items-start gap-3 px-4 py-2">
        <div className="w-14 h-14 rounded-lg bg-bg border border-border-soft overflow-hidden flex items-center justify-center text-primary shrink-0">
          <Package size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <Link
            href={detailsHref(order.id)}
            className="block text-sm text-text truncate hover:text-primary hover:underline"
          >
            {order.productName}
          </Link>
          <p className="text-xs text-muted mt-1">
            Qty: {order.quantity}
            <span className="text-muted/70"> · {order.orderNumber}</span>
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-mono text-text">{formatUSD(total)}</p>
        </div>
      </article>

      {/* Order total */}
      <div className="flex items-center justify-between px-4 py-2.5 text-[12px] text-muted border-t border-border-soft">
        <span className="capitalize">{order.orderType} order</span>
        <span>
          Order Total:{' '}
          <b className="font-mono font-semibold text-primary">
            {formatUSD(total)}
          </b>
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 px-4 pb-3.5 pt-1 flex-wrap">
        {user?.role === 'exporter' ? (
          <button
            onClick={() => router.push(detailsHref(order.id))}
            className="helix-btn-secondary text-sm!"
          >
            View Details
          </button>
        ) : (
          actions.length > 0 &&
          actions.map((label) => (
            <button
              onClick={() => router.push(detailsHref(order.id))}
              key={label}
              className="helix-btn-secondary text-sm!"
            >
              {label}
            </button>
          ))
        )}
      </div>
    </article>
  );
}

export default OrderCard;
