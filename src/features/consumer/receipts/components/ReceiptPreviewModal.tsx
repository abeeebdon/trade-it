'use client';

import { Download } from 'lucide-react';
import { formatUSD, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import type { Receipt } from '../types';

interface ReceiptPreviewModalProps {
  receipt: Receipt;
  onClose: () => void;
  onDownload: (receipt: Receipt) => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[#9CA3AF]">
      <span>{label}</span>
      <span className="font-mono text-[#F5F5F5]">{value}</span>
    </div>
  );
}

export default function ReceiptPreviewModal({
  receipt: order,
  onClose,
  onDownload,
}: ReceiptPreviewModalProps) {
  const qty = order.quantity || 1;
  const unit =
    order.unit_price_usd ?? (qty > 0 ? (order.total_usd || 0) / qty : 0);
  const subtotal = order.subtotal_usd ?? unit * qty;
  const shipping = order.shipping_usd || 0;
  const fee = order.platform_fee_usd || 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-testid="receipt-preview-modal"
    >
      <div
        className="absolute inset-0 bg-[#0A1628]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative helix-card p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1A7A6E]/20 pb-3">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#C9922A]">
                JompShop Receipt
              </div>
              <div className="text-[11px] text-[#9CA3AF] mt-0.5">
                {formatDateTime(order.created_at)}
              </div>
            </div>
            <StatusPill status={order.status} />
          </div>

          {/* Product row */}
          <div className="flex gap-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#0A1628] shrink-0">
              {order.listing_photos?.[0] && (
                <img
                  src={order.listing_photos[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold">
                {order.product_name}
              </div>
              <div className="text-[11px] text-[#9CA3AF] mt-0.5 font-mono">
                Qty {qty} · {formatUSD(unit)} each
              </div>
              {order.ships_from && (
                <div className="text-[11px] text-[#9CA3AF] mt-1">
                  Ships from {order.ships_from}
                </div>
              )}
            </div>
          </div>

          {/* Ship-to */}
          {order.shipping_address && (
            <div className="rounded-md border border-[#1A7A6E]/15 bg-[#0A1628]/30 p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#9CA3AF] mb-1">
                Ship to
              </div>
              <div className="text-[13px] text-[#F5F5F5]">
                {order.shipping_name}
              </div>
              <div className="text-[12px] text-[#9CA3AF]">
                {order.shipping_address}
              </div>
            </div>
          )}

          {/* Breakdown */}
          <div className="rounded-md border border-[#1A7A6E]/15 bg-[#0A1628]/30 p-3 space-y-1.5 text-[13px]">
            <Row label="Subtotal" value={formatUSD(subtotal)} />
            {shipping > 0 && (
              <Row label="Shipping" value={formatUSD(shipping)} />
            )}
            {fee > 0 && (
              <Row label="Platform fee (2%)" value={formatUSD(fee)} />
            )}
            <div className="flex justify-between border-t border-[#1A7A6E]/15 pt-2 mt-2 font-semibold">
              <span>Total (USD)</span>
              <span className="font-mono text-[#C9922A]">
                {formatUSD(order.total_usd)}
              </span>
            </div>
          </div>

          {order.escrow_held_by && (
            <div className="text-[11px] text-[#9CA3AF] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A6B4A]" />
              Held in escrow by{' '}
              <b className="text-[#F5F5F5]">{order.escrow_held_by}</b>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => onDownload(order)}
              className="helix-btn-secondary flex-1 text-sm inline-flex items-center justify-center gap-1.5"
              data-testid="receipt-preview-download"
            >
              <Download size={13} /> Download .txt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
