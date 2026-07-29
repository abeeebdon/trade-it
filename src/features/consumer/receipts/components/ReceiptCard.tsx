'use client';

import { Eye, Download } from 'lucide-react';
import { formatUSD, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import type { Receipt } from '../types';

interface ReceiptCardProps {
  receipt: Receipt;
  onPreview: (receipt: Receipt) => void;
  onDownload: (receipt: Receipt) => void;
  isDownloading?: boolean;
}

export default function ReceiptCard({
  receipt: o,
  onPreview,
  onDownload,
  isDownloading = false,
}: ReceiptCardProps) {
  return (
    <div className="helix-card p-4 space-y-3" data-testid={`receipt-${o.id}`}>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[12px] text-[#C9922A]">
          {o.order_number}
        </span>
        <StatusPill status={o.status} />
      </div>

      {/* Product */}
      <p className="text-[14px] font-medium truncate">{o.product_name}</p>

      {/* Meta */}
      <div className="flex items-center justify-between text-[11px] text-[#9CA3AF]">
        <span>{formatDateTime(o.created_at)}</span>
        <span className="font-mono text-[#F5F5F5] text-[13px]">
          {formatUSD(o.total_usd)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1 border-t border-[#1A7A6E]/20">
        <button
          onClick={() => onPreview(o)}
          className="helix-btn-primary text-[11px] py-1.5 px-4 inline-flex items-center gap-1.5 flex-1 justify-center"
          data-testid={`preview-${o.id}`}
        >
          <Eye size={12} /> Preview
        </button>
        <button
          onClick={() => onDownload(o)}
          disabled={isDownloading}
          className="text-[#9CA3AF] hover:text-[#C9922A] inline-flex items-center gap-1 text-[12px] disabled:opacity-50"
          title="Download receipt"
          data-testid={`dl-${o.id}`}
        >
          <Download size={13} /> {isDownloading ? '…' : 'Download'}
        </button>
      </div>
    </div>
  );
}
