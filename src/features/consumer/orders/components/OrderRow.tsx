'use client';

import { Package, CircleCheck, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { formatUSD, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import type { Order } from '../types';

interface OrderRowProps {
  order: Order;
}

export default function OrderRow({ order }: OrderRowProps) {
  const isDelivered = ['delivered', 'released'].includes(
    order.status?.toLowerCase(),
  );

  return (
    <div className="helix-card p-5" data-testid={`cs-order-${order.id}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#0A1628] shrink-0 flex items-center justify-center text-[#1A7A6E]">
          <Package size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[14px] truncate">
            {order.productName || 'Order'}
          </div>
          <div className="text-[11px] font-mono text-[#9CA3AF] mt-0.5">
            {order.orderNumber} · {formatDateTime(order.deliveryDate)}
          </div>
          <div className="text-[12px] text-[#9CA3AF] mt-1">
            {order.quantity} × {formatUSD(order.amount)} ={' '}
            <span className="text-[#C9922A] font-mono font-semibold">
              {formatUSD(order.amount * order.quantity)}
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-[15px] text-[#C9922A]">
            {formatUSD(order.amount * order.quantity)}
          </div>
          <div className="mt-1">
            <StatusPill status={order.status} />
          </div>
        </div>
      </div>

      {/* Order details */}
      <div className="rounded-md border border-[#1A7A6E]/15 bg-[#0A1628]/25 p-3 mb-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#9CA3AF] mb-2">
          Order details
        </div>
        <div className="flex items-center justify-between text-[13px] py-1">
          <span className="text-[#F5F5F5] truncate flex-1 pr-2">
            {order.productName}{' '}
            <span className="text-[#9CA3AF]">× {order.quantity}</span>
          </span>
          <span className="font-mono text-[#F5F5F5]">
            {formatUSD(order.amount * order.quantity)}
          </span>
        </div>
        <div className="flex items-center justify-between text-[12px] py-1 text-[#9CA3AF]">
          <span>Order type</span>
          <span className="font-mono capitalize">{order.orderType}</span>
        </div>
        <div className="flex items-center justify-between text-[12px] py-1 text-[#9CA3AF]">
          <span>Payment</span>
          <span className="font-mono capitalize">
            {order.paymentStatus?.replace(/_/g, ' ')}
          </span>
        </div>
        {order.shipTo && (
          <div className="flex items-center justify-between text-[12px] py-1 text-[#9CA3AF]">
            <span>Ship to</span>
            <span className="text-right max-w-[60%] truncate">
              {order.shipTo}
              {order.shippingAddress ? `, ${order.shippingAddress}` : ''}
            </span>
          </div>
        )}
      </div>

      {isDelivered ? (
        <div className="flex items-center justify-between border-t border-[#1A7A6E]/15 pt-3 gap-3 flex-wrap">
          <span className="text-[13px] text-[#1A6B4A] inline-flex items-center gap-1.5">
            <CircleCheck size={14} /> Delivered{' '}
            {formatDateTime(order.deliveryDate)}
          </span>
          <div className="flex gap-4 text-[12px]">
            <button
              onClick={() => toast.info('Review coming soon')}
              className="text-[#C9922A] hover:underline"
              data-testid={`review-${order.id}`}
            >
              Leave a review →
            </button>
            <button
              onClick={() => toast.info('Receipt view coming soon')}
              className="text-[#C9922A] hover:underline"
            >
              View receipt →
            </button>
            <button
              onClick={() => toast.info('Support form opened')}
              className="text-[#9CA3AF] hover:text-[#F5F5F5]"
            >
              Report a problem
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 border-t border-[#1A7A6E]/15 pt-3">
          <Clock size={14} className="text-[#C9922A]" />
          <span className="text-[13px] text-[#9CA3AF]">
            Order is {order.status?.replace(/_/g, ' ')} — updates will appear
            here
          </span>
        </div>
      )}
    </div>
  );
}
