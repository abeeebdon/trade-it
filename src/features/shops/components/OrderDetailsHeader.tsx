'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { formatDateTime } from '@/lib/func';
import { StatusPill } from './StatusPill';
import { ConsumerOrder } from '../types/shops';

interface OrderDetailsHeaderProps {
  order: ConsumerOrder;
}

const OrderDetailsHeader = ({ order }: OrderDetailsHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <button
          onClick={() => router.push('/shop/orders')}
          className="flex items-center gap-2 text-[14px] text-muted hover:text-text cursor-pointer transition-colors mb-2"
        >
          <ArrowLeft size={16} />
          Back to orders
        </button>
        <h1 className="text-[22px] font-bold text-text">
          Order {order.orderNumber}
        </h1>
        <p className="text-[13px] text-muted mt-1">
          Placed on {formatDateTime(order.deliveryDate)}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <StatusPill status={order.status} />
        <StatusPill status={order.paymentStatus} />
      </div>
    </div>
  );
};

export default OrderDetailsHeader;
