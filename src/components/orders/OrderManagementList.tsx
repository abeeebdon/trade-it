'use client';

import { useMemo, useState } from 'react';
import { OrderCard } from './OrderCard';
import OrderFilter, {
  type DeliveryFilter,
  type PaymentFilter,
} from './OrderFilter';
import OrderListFilters, { toStatusOptions } from './OrderListFilters';
import { useAppSelector } from '@/hooks/store/store';
import { selectOrders } from '@/store/orders/orders.slice';
import {
  deliveryGroupOf,
  groupOf,
  paymentGroupOf,
  type TabKey,
} from '@/features/orderManagement/components/CardMeta';
import type { OrderRole } from '@/features/orderManagement/lib/orderStatus';
import type { ConsumerOrder } from '@/features/shops/types/shops';

export interface OrderManagementListProps {
  title?: string;
  subtitle?: string;

  role?: OrderRole;
  hideUnpaid?: boolean;
  detailsHref?: (orderId: number) => string;
  /**
   * Orders loaded elsewhere (e.g. `useGetSellerOrders`).
   * When omitted the list falls back to the redux orders store.
   */
  orders?: ConsumerOrder[];
}

export function OrderManagementList({
  title = 'Order Management',
  subtitle = 'Manage and track every order across the pipeline.',
  hideUnpaid = false,
  orders: fetchedOrders,
  detailsHref,
}: OrderManagementListProps) {
  const [filter, setFilter] = useState<TabKey>('all');
  const [paymentStatus, setPaymentStatus] = useState<PaymentFilter>('All');
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryFilter>('All');
  const [search, setSearch] = useState('');
  const [product, setProduct] = useState('');
  const [status, setStatus] = useState('');
  const [delivery, setDelivery] = useState('');

  const storeOrders = useAppSelector(selectOrders);
  const allOrders = fetchedOrders ?? storeOrders;

  const products = useMemo(
    () =>
      Array.from(new Set(allOrders.map((order) => order.productName)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [allOrders],
  );

  const statusOptions = useMemo(
    () => toStatusOptions(allOrders.map((order) => order.status)),
    [allOrders],
  );

  const visibleOrders = useMemo(() => {
    const term = search.trim().toLowerCase();

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
    if (product) {
      list = list.filter((o) => o.productName === product);
    }
    if (status) {
      list = list.filter((o) => o.status === status);
    }
    if (delivery) {
      list = list.filter((o) => deliveryGroupOf(o.status) === delivery);
    }
    if (term) {
      list = list.filter((o) =>
        [o.orderNumber, o.productName, o.category, o.email, o.shipTo]
          .join(' ')
          .toLowerCase()
          .includes(term),
      );
    }

    return list;
  }, [
    allOrders,
    filter,
    hideUnpaid,
    paymentStatus,
    deliveryStatus,
    product,
    status,
    delivery,
    search,
  ]);

  const clearFilters = () => {
    setFilter('all');
    setPaymentStatus('All');
    setDeliveryStatus('All');
    setSearch('');
    setProduct('');
    setStatus('');
    setDelivery('');
  };

  return (
    <article className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text">{title}</h1>
          <p className="text-sm text-muted">{subtitle}</p>
        </div>
      </div>

      {/* Search + product / status filters */}
      <OrderListFilters
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by order, product or customer..."
        product={product}
        products={products}
        onProductChange={setProduct}
        status={status}
        statusOptions={statusOptions}
        onStatusChange={setStatus}
        delivery={delivery}
        onDeliveryChange={setDelivery}
        onClear={clearFilters}
        resultCount={visibleOrders.length}
        totalCount={allOrders.length}
      />

      {/* Payment + delivery filters */}
      <OrderFilter
        paymentStatus={paymentStatus}
        deliveryStatus={deliveryStatus}
        onPaymentStatusChange={setPaymentStatus}
        onDeliveryStatusChange={setDeliveryStatus}
      />

      {visibleOrders.length === 0 ? (
        <div className="helix-card rounded-xl p-12 text-center text-muted text-sm">
          No orders match your filters.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visibleOrders.map((o) => (
            <OrderCard key={o.id} order={o} detailsHref={detailsHref} />
          ))}
        </div>
      )}
    </article>
  );
}

export default OrderManagementList;
