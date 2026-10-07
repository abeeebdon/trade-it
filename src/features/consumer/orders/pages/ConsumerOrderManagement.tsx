'use client';

import { OrderManagementList } from '@/components/orders/OrderManagementList';

export default function ConsumerOrderManagement() {
  return (
    <OrderManagementList
      role="consumer"
      title="Order Management"
      subtitle="Track your purchases and confirm delivery once your order arrives."
      detailsHref={(id) => `/consumer/orders/details?id=${id}`}
    />
  );
}
