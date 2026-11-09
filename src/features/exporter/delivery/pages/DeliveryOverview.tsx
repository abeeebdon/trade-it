'use client';

import { OrderManagementList } from '@/components/orders/OrderManagementList';
import { Loading } from '@/components/loading';
import { useGetSellerOrders } from '../../hooks/useOrders';

export default function ExporterDeliveryOverview() {
  const { data, isPending, isError } = useGetSellerOrders({
    pageNumber: 1,
    pageSize: 100,
  });

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
    <OrderManagementList
      orders={data ?? []}
      role="vendor"
      title="Order Management"
      subtitle="Pack and hand off confirmed export orders to the platform for shipping."
      detailsHref={(id) => `/exporter/fulfillment/details?id=${id}`}
    />
  );
}
