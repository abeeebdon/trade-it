import { formatUSD } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import JourneyTracker from './JourneyTracker';
import type { DashboardOrder } from '../types';

interface OrderCardProps {
  order: DashboardOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="helix-card p-5" data-testid={`cs-order-${order.id}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-13 h-13 rounded-lg overflow-hidden bg-[#0A1628]">
          {order.listing_photos?.[0] && (
            <img
              src={order.listing_photos[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[14px] truncate">
            {order.product_name || 'Order'}
          </div>
          <div className="text-[11px] font-mono text-[#9CA3AF]">
            {order.order_number} ·{' '}
            {new Date(order.created_at).toLocaleDateString()}
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[15px] text-[#C9922A]">
            {formatUSD(order.total_usd)}
          </div>
          <div className="mt-1">
            <StatusPill status={order.status} />
          </div>
        </div>
      </div>
      <JourneyTracker journey={order.journey} />
    </div>
  );
}
