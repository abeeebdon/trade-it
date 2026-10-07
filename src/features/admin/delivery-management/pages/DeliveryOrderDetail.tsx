'use client';

import { useParams } from 'next/navigation';
import OrderManagementDetail from '@/features/orderManagement/pages/OrderManagementDetail';

/**
 * Admin delivery detail — wraps the shared detail page with the
 * admin role and back-link so this feature owns its own page.
 */
export default function DeliveryOrderDetail() {
  const { id } = useParams<{ id: string }>();
  return (
    <OrderManagementDetail
      role="admin"
      orderId={id}
      basePath="/admin/delivery"
    />
  );
}
