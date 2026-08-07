import { AdminOrder } from '../../types/orders';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateToMM, formatUSD } from '@/lib/func';
import { categoryLabel } from './orders.utils';

export function OrderMobileCard({ order }: { order: AdminOrder }) {
  return (
    <section className="helix-card p-4 block hover:border-[#C9922A]/30 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[13px] font-mono font-semibold text-[#C9922A]">
            {order.orderNumber}
          </h3>
          <p className="text-[14px] text-[#F5F5F5] mt-0.5">
            {order.productName}
          </p>
          <p className="text-[12px] text-[#9CA3AF]">
            {categoryLabel(order.category)} · Qty: {order.quantity}
          </p>
        </div>
        <StatusPill status={order.status} />
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="font-mono text-[#C9922A] font-semibold">
          {formatUSD(order.amount)}
        </span>
        <StatusPill status={order.paymentStatus} />
      </div>

      <div className="flex items-center justify-between mt-2 text-[12px] text-[#6B7280]">
        <span>{order.email}</span>
        <span>{formatDateToMM(order.deliveryDate)}</span>
      </div>
    </section>
  );
}
