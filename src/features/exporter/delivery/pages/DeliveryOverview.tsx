'use client';

import { OrderManagementList } from '@/components/orders/OrderManagementList';

export default function ExporterDeliveryOverview() {
  return (
    <OrderManagementList
      role="vendor"
      title="Order Management"
      subtitle="Pack and hand off confirmed export orders to the platform for shipping."
      detailsHref={(id) => `/exporter/delivery/details?id=${id}`}
    />
  );
}
