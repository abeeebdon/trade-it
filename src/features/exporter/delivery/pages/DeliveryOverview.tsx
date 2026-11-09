'use client';

import { OrderManagementList } from '@/components/orders/OrderManagementList';
import { Loading } from '@/components/loading';
import { useGetSellerOrders } from '../../hooks/useOrders';
import OrderListFilters, {
  toStatusOptions,
} from '@/components/orders/OrderListFilters';
import { useMemo, useState } from 'react';
import {
  deliveryGroupOf,
  groupOf,
  paymentGroupOf,
  TabKey,
} from '@/features/orderManagement/components/CardMeta';
import OrderFilter, {
  DeliveryFilter,
  PaymentFilter,
} from '@/components/orders/OrderFilter';
import { useAppSelector } from '@/hooks/store/store';
import { selectOrders } from '@/store/orders/orders.slice';
import { OrderCard } from '@/components/orders/OrderCard';

export default function ExporterDeliveryOverview() {
  const [filter, setFilter] = useState<TabKey>('all');
  const [paymentStatus, setPaymentStatus] = useState<PaymentFilter>('All');
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryFilter>('All');
  const [search, setSearch] = useState('');
  const [product, setProduct] = useState('');
  const [status, setStatus] = useState('');
  const [delivery, setDelivery] = useState('');

  const { data, isPending, isError } = useGetSellerOrders({
    pageNumber: 1,
    pageSize: 100,
  });

  const storeOrders = useAppSelector(selectOrders);

  const allOrders = data ?? storeOrders;
  const statusOptions = useMemo(
    () => toStatusOptions(allOrders.map((order) => order.status)),
    [allOrders],
  );

  const clearFilters = () => {
    setFilter('all');
    setPaymentStatus('All');
    setDeliveryStatus('All');
    setSearch('');
    setProduct('');
    setStatus('');
    setDelivery('');
  };

  const visibleOrders = useMemo(() => {
    const term = search.trim().toLowerCase();

    let list = allOrders;

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
    paymentStatus,
    deliveryStatus,
    product,
    status,
    delivery,
    search,
  ]);
  const products = useMemo(
    () =>
      Array.from(new Set(allOrders.map((order) => order.productName)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [allOrders],
  );
  if (isPending) {
    return (
      <div className="h-[70vh] overflow-hidden justify-center flex items-center opacity-40">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="helix-card p-12 text-center text-muted text-sm">
        Failed to load orders. Please refresh.
      </div>
    );
  }

  return (
    <article className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text">Order Management</h1>
          <p className="text-sm text-muted">
            Pack and hand off confirmed export orders to the platform for
            shipping.
          </p>
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
            <OrderCard
              key={o.id}
              order={o}
              detailsHref={(id) => `/exporter/fulfillment/details?id=${id}`}
            />
          ))}
        </div>
      )}
    </article>
  );
}
