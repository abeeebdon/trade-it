'use client';

import { formatUSD, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { Truck, Lock, CheckCircle2 } from 'lucide-react';
import type { FulfillmentOrder } from '../types/exporter';

interface FulfillmentOrderCardProps {
  o: FulfillmentOrder;
  onShip: (id: string) => void;
  onDeliver: (id: string) => void;
}

export default function FulfillmentOrderCard({
  o,
  onShip,
  onDeliver,
}: FulfillmentOrderCardProps) {
  return (
    <div className="helix-card p-5" data-testid={`ff-${o.id}`}>
      {/* ── Header row ── */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-mono tracking-widest text-[#1A7A6E]">
            {o.order_number} ·{' '}
            {o.checkout_mode === 'quote_prepay' ? 'QUOTED' : 'LISTED'}
          </div>
          <div className="helix-h3 mt-1">{o.listing_title}</div>
          <div className="text-[13px] mt-1 font-mono">
            {o.quantity} × {formatUSD(o.unit_price_usd)} ={' '}
            <span className="text-[#C9922A]">{formatUSD(o.total_usd)}</span>
          </div>
          {o.delivery_partner_of_record && (
            <div className="mt-2 text-[12px] inline-flex items-center gap-1 text-[#C9922A]">
              <Truck size={12} />
              Delivery partner of record: <b>{o.delivery_partner_of_record}</b>
            </div>
          )}
        </div>

        {/* ── Status + escrow ── */}
        <div className="text-right shrink-0">
          <div className="flex flex-col items-end gap-1">
            <StatusPill status={o.status} />
            <span
              className={`helix-status inline-flex items-center gap-1 ${
                o.escrow_status === 'held'
                  ? 'helix-status-gold'
                  : 'helix-status-ok'
              }`}
            >
              <Lock size={10} /> ESCROW · {o.escrow_status.toUpperCase()}
            </span>
          </div>
          <div className="text-[11px] text-[#9CA3AF] font-mono mt-1">
            {formatDateTime(o.created_at)}
          </div>
        </div>
      </div>

      {/* ── Shipping info ── */}
      <div className="mt-4 pt-3 border-t border-[#1A7A6E]/15 text-[12px] text-[#9CA3AF] space-y-0.5">
        <div>
          Ship to: {o.shipping_name}, {o.shipping_address}
        </div>
        <div>
          {o.shipping_email} · {o.shipping_phone || '—'}
        </div>
        {o.tracking_number && (
          <div className="mt-1 font-mono text-[#1A7A6E]">
            Tracking: {o.tracking_number}
          </div>
        )}
      </div>

      {/* ── Actions ── */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {o.status === 'paid' && (
          <button
            onClick={() => onShip(o.id)}
            className="helix-btn-primary text-sm"
            data-testid={`ship-${o.id}`}
          >
            Mark shipped
          </button>
        )}
        {(o.status === 'shipped' ||
          (o.status === 'paid' && o.escrow_status === 'held')) && (
          <button
            onClick={() => onDeliver(o.id)}
            className="helix-btn-primary text-sm inline-flex items-center gap-1"
            data-testid={`deliver-${o.id}`}
          >
            <CheckCircle2 size={14} /> Mark delivered · release escrow
          </button>
        )}
      </div>
    </div>
  );
}
