'use client';

import { useParams } from 'next/navigation';
import OrderManagementDetail from '@/features/orderManagement/pages/OrderManagementDetail';

export default function RetailerOrderDemoDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <OrderManagementDetail
      role="vendor"
      orderId={id}
      basePath="/buyer/orders-demo"
    />
  );
}
