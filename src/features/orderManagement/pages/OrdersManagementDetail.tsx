'use client';

import { useParams } from 'next/navigation';
import OrderManagementDetail from '@/features/orderManagement/pages/OrderManagementDetail';

/**
 * Buyer (retailer) demo order detail — keeps the buyer/orders-demo
 * route working while the real buyer order flow is built out.
 */
export default function OrdersManagementDetail() {
  const { id } = useParams<{ id: string }>();
  return (
    <OrderManagementDetail
      role="vendor"
      orderId={id}
      basePath="/buyer/orders-demo"
    />
  );
}
