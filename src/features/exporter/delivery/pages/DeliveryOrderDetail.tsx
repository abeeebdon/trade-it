'use client';

import { useParams } from 'next/navigation';
import OrderManagementDetail from '@/features/orderManagement/pages/OrderManagementDetail';

/**
 * Exporter delivery detail — wraps the shared detail page with the
 * vendor (exporter) role and back-link so this feature owns its own
 * page.
 */
export default function DeliveryOrderDetail() {
  const { id } = useParams<{ id: string }>();
  return (
    <OrderManagementDetail
      role="vendor"
      orderId={id}
      basePath="/exporter/delivery"
    />
  );
}
