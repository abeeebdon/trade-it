'use client';

import { OrderManagementList } from '@/components/orders/OrderManagementList';

export default function DeliveryOverview() {
  return (
    <OrderManagementList
      role="admin"
      title="Order Management"
      subtitle="Oversee the full pipeline — ship, dispatch and deliver every order"
      hideUnpaid
      detailsHref={(id) => `/admin/delivery/${id}`}
    />
  );
}
