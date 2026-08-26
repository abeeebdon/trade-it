'use client';

import { useMemo, useState } from 'react';
import { OrderCard } from './OrderCard';
import { OrderTabs } from './OrderTabs';
import OrderFilter, {
  type DeliveryFilter,
  type PaymentFilter,
} from './OrderFilter';
import { useAppSelector } from '@/hooks/store/store';
import { selectOrders } from '@/store/orders/orders.slice';
import {
  deliveryGroupOf,
  groupOf,
  paymentGroupOf,
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
  const [paymentStatus, setPaymentStatus] = useState<PaymentFilter>('All');
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryFilter>('All');
  const allOrders = useAppSelector(selectOrders);

  const orders = useMemo(() => {
    let list = hideUnpaid
      ? allOrders.filter((o) => groupOf(o.status) !== 'unpaid')
      : allOrders;

    if (filter !== 'all') {
      list = list.filter((o) => groupOf(o.status) === filter);
    }
    if (paymentStatus !== 'All') {
      list = list.filter(
        (o) => paymentGroupOf(o.paymentStatus, o.status) === paymentStatus,
      );
    }
    if (deliveryStatus !== 'All') {
      list = list.filter((o) => deliveryGroupOf(o.status) === deliveryStatus);
    }
    return list;
  }, [allOrders, filter, hideUnpaid, paymentStatus, deliveryStatus]);

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
      {/* <OrderTabs value={filter} onChange={setFilter} /> */}

      {/* Payment + delivery filters */}
      <OrderFilter
        paymentStatus={paymentStatus}
        deliveryStatus={deliveryStatus}
        onPaymentStatusChange={setPaymentStatus}
        onDeliveryStatusChange={setDeliveryStatus}
      />

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
