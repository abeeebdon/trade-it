'use client';

import { useMemo, useState } from 'react';
import { OrderCard } from './OrderCard';
import { OrderTabs } from './OrderTabs';
import { useAppSelector } from '@/hooks/store/store';
import { selectOrders } from '@/store/orders/orders.slice';
import {
  groupOf,
  type TabKey,
} from '@/features/orderManagement/components/CardMeta';
import type { OrderRole } from '@/features/orderManagement/lib/orderStatus';

export interface OrderManagementListProps {
  title?: string;
  subtitle?: string;

  role?: OrderRole;
  hideUnpaid?: boolean;
  detailsHref?: (orderId: number) => string;
}

export function OrderManagementList({
  title = 'Order Management',
  subtitle = 'Manage and track every order across the pipeline.',
  hideUnpaid = false,
  detailsHref,
}: OrderManagementListProps) {
  const [filter, setFilter] = useState<TabKey>('all');
  const allOrders = useAppSelector(selectOrders);

  const orders = useMemo(() => {
    const list = hideUnpaid
      ? allOrders.filter((o) => groupOf(o.status) !== 'unpaid')
      : allOrders;
    if (filter === 'all') return list;
    return list.filter((o) => groupOf(o.status) === filter);
  }, [allOrders, filter, hideUnpaid]);

  return (
    <article className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text">{title}</h1>
          <p className="text-sm text-muted">{subtitle}</p>
        </div>
      </div>

      {/* Status tabs */}
      <OrderTabs value={filter} onChange={setFilter} />

      {orders.length === 0 ? (
        <div className="helix-card rounded-xl p-12 text-center text-muted text-sm">
          No orders match this status.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} detailsHref={detailsHref} />
          ))}
        </div>
      )}
    </article>
  );
}

export default OrderManagementList;
