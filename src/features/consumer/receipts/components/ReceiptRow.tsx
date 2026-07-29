'use client';

import { Eye, Download } from 'lucide-react';
import { formatUSD, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import type { Receipt } from '../types';

interface ReceiptRowProps {
  receipt: Receipt;
  onPreview: (receipt: Receipt) => void;
  onDownload: (receipt: Receipt) => void;
  isDownloading?: boolean;
}

export default function ReceiptRow({
  receipt: o,
  onPreview,
  onDownload,
  isDownloading = false,
}: ReceiptRowProps) {
  return (
    <tr data-testid={`receipt-${o.id}`}>
      <td className="whitespace-nowrap">{formatDateTime(o.created_at)}</td>
      <td className="font-mono text-[12px] whitespace-nowrap">
        {o.order_number}
      </td>
      <td className="max-w-70 truncate">{o.product_name}</td>
      <td className="text-right font-mono text-[#C9922A] whitespace-nowrap">
        {formatUSD(o.total_usd)}
      </td>
      <td>
        <StatusPill status={o.status} />
      </td>
      <td className="text-right whitespace-nowrap">
        <button
          onClick={() => onPreview(o)}
          className="helix-btn-primary text-[11px] py-1.5 px-3 inline-flex items-center gap-1.5 mr-2"
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
      </td>
    </tr>
  );
}
