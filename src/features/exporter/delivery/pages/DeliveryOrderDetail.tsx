'use client';

import { useSearchParams } from 'next/navigation';
import OrderManagementDetail from '@/features/orderManagement/pages/OrderManagementDetail';
export default function DeliveryOrderDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  return (
    <OrderManagementDetail
      role="vendor"
      orderId={id}
      basePath="/exporter/delivery"
    />
  );
}
