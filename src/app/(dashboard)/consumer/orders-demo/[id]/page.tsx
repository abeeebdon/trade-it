'use client';

import { useParams } from 'next/navigation';
import OrderManagementDetail from '@/features/orderManagement/pages/OrderManagementDetail';

export default function ConsumerOrderDemoDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <OrderManagementDetail
      role="consumer"
      orderId={id}
      basePath="/consumer/orders-demo"
    />
  );
}
