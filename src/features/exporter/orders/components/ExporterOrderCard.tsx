'use client';

import Link from 'next/link';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateTime, formatUSD } from '@/lib/func';
import { SellerOrder } from '../types/exporterOrdersType';

interface ExporterOrderCardProps {
  order: SellerOrder;
}

const ExporterOrderCard = ({ order }: ExporterOrderCardProps) => {
  return (
    <article className="helix-card p-4 space-y-3 md:hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.12em] text-primary uppercase">
            {order.orderNumber}
          </p>
          <h3 className="mt-1 text-sm font-medium text-text truncate">
            {order.productName}
          </h3>
        </div>
        <StatusPill status={order.status} />
      </div>

      <div className="flex items-center justify-between gap-3 text-[12px] text-muted">
        <span>{order.quantity} units</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-primary text-sm">
          {formatUSD(order.amount)}
        </span>
        <StatusPill status={order.paymentStatus} />
      </div>

      <div className="border-t border-[#1A7A6E]/10 pt-3 text-[12px] text-muted space-y-1">
        <div>Delivery: {formatDateTime(order.deliveryDate)}</div>
        <div className="flex items-center justify-between gap-2">
          <span>{order.role}</span>
          <Link
            href={{
              pathname: '/exporter/orders/details',
              query: { id: `${order.id}` },
            }}
            className="text-primary hover:underline"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ExporterOrderCard;
