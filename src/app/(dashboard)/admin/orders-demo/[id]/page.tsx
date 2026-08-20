'use client';

import { useParams } from 'next/navigation';
import OrderManagementDetail from '@/features/orderManagement/pages/OrderManagementDetail';

export default function AdminOrderDemoDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <OrderManagementDetail
      role="admin"
      orderId={id}
      basePath="/admin/orders-demo"
    />
  );
}
