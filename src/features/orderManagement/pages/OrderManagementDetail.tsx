'use client';

import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import {
  ORDER_STATUS_LABELS,
  OrderRole,
  OrderStatus,
} from '@/features/orderManagement/lib/orderStatus';
import { OrderStatusTracker } from '@/features/orderManagement/components/OrderStatusTracker';
import { OrderSummaryCard } from '@/features/orderManagement/components/OrderSummaryCard';
import { DummyStatusActionButton } from '@/features/orderManagement/components/DummyStatusActionButton';
import { formatDateTime } from '@/lib/func';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/hooks/store/store';
import { selectOrderById } from '@/store/orders/orders.slice';
import { DUMMY_ORDERS } from '../data/dummyOrders';
import BackButton from '@/components/buttons/BackButton';

interface OrderManagementDetailProps {
  role: OrderRole;
  basePath: string;
  orderId?: string | number;
}

export default function OrderManagementDetail({
  role,
  orderId,
}: OrderManagementDetailProps) {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');
  const resolvedId = orderId ?? queryId;
  const router = useRouter();
  const order =
    useAppSelector((state) => selectOrderById(state, resolvedId)) ??
    DUMMY_ORDERS[0];
  if (!order) {
    return <p className="text-sm text-danger px-4 py-6">Order not found.</p>;
  }

  const currentStatus = order.status as OrderStatus;
  const lineItems = [
    {
      id: String(order.productId),
      name: order.productName,
      quantity: order.quantity,
      price: order.amount / order.quantity,
    },
  ];
  const total = order.totalAmount ?? order.amount;

  return (
    <div className="flex flex-col gap-4 p-4 max-w-3xl">
      <BackButton title="Back to orders" />

      <div className="flex items-center ,t-4 gap-2">
        <ShoppingBag size={18} className="text-primary" />
        <h1 className="text-lg font-semibold text-text">
          Order #{order.orderNumber}
        </h1>
        <span className="text-xs text-muted ml-auto">
          Placed {formatDateTime(order.paidAt ?? order.deliveryDate)}
        </span>
      </div>
      <p className="text-sm text-muted">
        Deliver to {order.shipTo} · {order.shippingAddress}
      </p>

      <div className="helix-card rounded-xl p-4">
        <OrderStatusTracker currentStatus={currentStatus} />
      </div>

      <OrderSummaryCard items={lineItems} total={total} />

      <div className="helix-card rounded-xl p-4 flex flex-col gap-3">
        <p className="text-sm font-medium text-text">Manage order</p>
        <p className="text-xs text-muted">
          Current status:{' '}
          <span className="text-primary">
            {ORDER_STATUS_LABELS[currentStatus]}
          </span>
        </p>
        <DummyStatusActionButton
          orderId={order.id}
          role={role}
          currentStatus={currentStatus}
        />
      </div>
    </div>
  );
}
