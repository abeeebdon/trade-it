'use client';

// pages/OrderManagementDetail.tsx
// Reusable order-detail page for the dummy-data demo. Shows the status
// tracker, itemized summary and the role-scoped "next step" action
// (which advances only local state since the data is constant).

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { DUMMY_ORDERS } from '@/features/orderManagement/data/dummyOrders';
import {
  ORDER_STATUS_LABELS,
  OrderRole,
  OrderStatus,
} from '@/features/orderManagement/lib/orderStatus';
import { OrderStatusTracker } from '@/features/orderManagement/components/OrderStatusTracker';
import { OrderSummaryCard } from '@/features/orderManagement/components/OrderSummaryCard';
import { DummyStatusActionButton } from '@/features/orderManagement/components/DummyStatusActionButton';
import { formatDateTime } from '@/lib/func';

interface OrderManagementDetailProps {
  role: OrderRole;
  orderId: string;
  basePath: string;
}

export default function OrderManagementDetail({
  role,
  orderId,
  basePath,
}: OrderManagementDetailProps) {
  const order = DUMMY_ORDERS.find((o) => o.id === orderId);
  const [status, setStatus] = useState<OrderStatus | null>(
    order ? order.status : null,
  );

  if (!order) {
    return <p className="text-sm text-red-400 px-4 py-6">Order not found.</p>;
  }

  const currentStatus = status ?? order.status;

  return (
    <div className="flex flex-col gap-4 p-4 max-w-3xl">
      <Link
        href={basePath}
        className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to orders
      </Link>

      <div className="flex items-center gap-2">
        <ShoppingBag size={18} className="text-[#C9922A]" />
        <h1 className="text-lg font-semibold text-white">
          Order #{order.orderNumber}
        </h1>
        <span className="text-xs text-white/40 ml-auto">
          Placed {formatDateTime(order.createdAt)}
        </span>
      </div>
      <p className="text-sm text-white/50">
        Sold by {order.vendorName} · Buyer {order.consumerName}
      </p>

      <div className="helix-card rounded-xl p-4">
        <OrderStatusTracker currentStatus={currentStatus} />
      </div>

      <OrderSummaryCard items={order.items} total={order.total} />

      <div className="helix-card rounded-xl p-4 flex flex-col gap-3">
        <p className="text-sm font-medium text-white/80">Manage order</p>
        <p className="text-xs text-white/40">
          Current status:{' '}
          <span className="text-[#C9922A]">
            {ORDER_STATUS_LABELS[currentStatus]}
          </span>
        </p>
        <DummyStatusActionButton
          role={role}
          currentStatus={currentStatus}
          onStatusChanged={(newStatus) => setStatus(newStatus)}
        />
      </div>
    </div>
  );
}
