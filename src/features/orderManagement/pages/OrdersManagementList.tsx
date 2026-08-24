'use client';

import { OrderManagementList } from '@/components/orders/OrderManagementList';
import type { OrderRole } from '@/features/orderManagement/lib/orderStatus';

export interface OrdersManagementListProps {
  title?: string;
  subtitle?: string;
  /** Base URL the detail links are built from (defaults to the buyer demo). */
  basePath?: string;
  /** Role scoping for the list (defaults to vendor for the buyer demo). */
  role?: OrderRole;
  perspective?: string;
}

export default function OrdersManagementList({
  title = 'Order Management',
  subtitle = 'Pack and hand off confirmed export orders to the platform for shipping.',
  basePath = '/buyer/orders-demo',
  role = 'vendor',
}: OrdersManagementListProps) {
  return (
    <OrderManagementList
      role={role}
      title={title}
      subtitle={subtitle}
      detailsHref={(id) => `${basePath}/${id}`}
    />
  );
}
