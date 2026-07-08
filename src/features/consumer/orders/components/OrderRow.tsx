'use client';

import { Package, CircleCheck } from 'lucide-react';
import { toast } from 'sonner';
import { formatUSD, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import JourneyTracker from '@/features/consumer/dashboard/components/JourneyTracker';
import type { Order } from '../types';

interface OrderRowProps {
  order: Order;
}

export default function OrderRow({ order }: OrderRowProps) {
  const isDelivered = ['delivered', 'released'].includes(order.status);
  const qty = order.quantity || 1;
  const unit =
    order.unit_price_usd || (qty > 0 ? (order.total_usd || 0) / qty : 0);
  const shipping = order.shipping_usd || 0;
  const fee = order.platform_fee_usd || 0;
  const subtotal = order.subtotal_usd ?? unit * qty;

  return (
    <div className="helix-card p-5" data-testid={`cs-order-${order.id}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#0A1628] shrink-0">
          {order.listing_photos?.[0] ? (
            <img
              src={order.listing_photos[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#1A7A6E]">
              <Package size={22} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[14px] truncate">
            {order.product_name || order.listing_title || 'Order'}
          </div>
          <div className="text-[11px] font-mono text-[#9CA3AF] mt-0.5">
            {order.order_number} · {formatDateTime(order.created_at)}
            {order.tracking_number && (
              <>
                {' '}
                · TRK <b className="text-[#C9922A]">{order.tracking_number}</b>
              </>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-[15px] text-[#C9922A]">
            {formatUSD(order.total_usd)}
          </div>
          <div className="mt-1">
            <StatusPill status={order.status} />
          </div>
        </div>
      </div>

      {/* Line item breakdown */}
      <div className="rounded-md border border-[#1A7A6E]/15 bg-[#0A1628]/25 p-3 mb-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#9CA3AF] mb-2">
          Order breakdown
        </div>
        <div className="flex items-center justify-between text-[13px] py-1">
          <span className="text-[#F5F5F5] truncate flex-1 pr-2">
            {order.product_name || order.listing_title || 'Item'}{' '}
            <span className="text-[#9CA3AF]">× {qty}</span>
          </span>
          <span className="font-mono text-[#9CA3AF]">
            {formatUSD(unit)} each
          </span>
          <span className="font-mono text-[#F5F5F5] w-24 text-right">
            {formatUSD(subtotal)}
          </span>
        </div>
        {shipping > 0 && (
          <div className="flex items-center justify-between text-[12px] py-1 text-[#9CA3AF]">
            <span>
              Shipping (DPOR: {order.delivery_partner_of_record || 'Riby Inc'})
            </span>
            <span className="font-mono">{formatUSD(shipping)}</span>
          </div>
        )}
        {fee > 0 && (
          <div className="flex items-center justify-between text-[12px] py-1 text-[#9CA3AF]">
            <span>Platform fee (2%)</span>
            <span className="font-mono">{formatUSD(fee)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-[13px] pt-2 mt-1 border-t border-[#1A7A6E]/15 font-semibold">
          <span>Total</span>
          <span className="font-mono text-[#C9922A]">
            {formatUSD(order.total_usd)}
          </span>
        </div>
      </div>

      {isDelivered ? (
        <div className="flex items-center justify-between border-t border-[#1A7A6E]/15 pt-3 gap-3 flex-wrap">
          <span className="text-[13px] text-[#1A6B4A] inline-flex items-center gap-1.5">
            <CircleCheck size={14} /> Delivered{' '}
            {order.delivered_at ? formatDateTime(order.delivered_at) : ''}
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
        <JourneyTracker journey={order.journey} />
      )}
    </div>
  );
}
