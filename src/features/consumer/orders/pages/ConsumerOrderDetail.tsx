'use client';

import OrderManagementDetail from '@/features/orderManagement/pages/OrderManagementDetail';

export default function ConsumerOrderDetail() {
  return <OrderManagementDetail role="consumer" basePath="/consumer/orders" />;
}
