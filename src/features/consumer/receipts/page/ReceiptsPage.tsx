'use client';

import { useEffect, useState } from 'react';
import { Eye, Download } from 'lucide-react';
import { toast } from 'sonner';
import { formatUSD, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { MOCK_RECEIPTS } from '../constants';
import ReceiptPreviewModal from '../components/ReceiptPreviewModal';
import ReceiptsEmptyState from '../components/ReceiptsEmptyState';
import ReceiptsSkeleton from '../components/ReceiptsSkeleton';
import type { Receipt } from '../types';

const SIMULATED_DELAY_MS = 700;

export default function Receipts() {
  const [items, setItems] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<Receipt | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setItems(MOCK_RECEIPTS);
      setLoading(false);
    }, SIMULATED_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const download = (o: Receipt) => {
    const rows: [string, string][] = [
      ['Order', o.order_number],
      ['Date', formatDateTime(o.created_at)],
      ['Product', o.product_name ?? ''],
      ['Quantity', String(o.quantity || 1)],
      [
        'Unit price',
        formatUSD(o.unit_price_usd ?? o.total_usd / (o.quantity || 1)),
      ],
      ['Subtotal', formatUSD(o.subtotal_usd || o.total_usd)],
      ['Platform fee', formatUSD(o.platform_fee_usd || 0)],
      ['Shipping', formatUSD(o.shipping_usd || 0)],
      ['Total (USD)', formatUSD(o.total_usd)],
      ['Status', o.status],
      ['Escrow', o.escrow_held_by || 'Riby Inc (US Escrow)'],
    ];
    const text =
      'JOMPSHOP · RECEIPT\n' +
      '='.repeat(48) +
      '\n' +
      rows.map(([k, v]) => `${k.padEnd(16)} ${v}`).join('\n') +
      '\n\nThank you for shopping on JompShop.\nsupport@jompshop.com\n';
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${o.order_number}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Receipt downloaded');
  };

  if (loading) return <ReceiptsSkeleton />;

  return (
    <main>
      <p className="text-[13px] text-[#9CA3AF] mb-6">
        Preview or download a receipt for every completed purchase.
      </p>

      {items.length === 0 ? (
        <ReceiptsEmptyState />
      ) : (
        <div className="helix-card overflow-x-auto">
          <table className="helix-table w-full">
            <thead>
              <tr>
                <th className="text-left">Date</th>
                <th className="text-left">Order</th>
                <th className="text-left">Product</th>
                <th className="text-right">Total</th>
                <th className="text-left">Status</th>
                <th className="text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id} data-testid={`receipt-${o.id}`}>
                  <td>{formatDateTime(o.created_at)}</td>
                  <td className="font-mono text-[12px]">{o.order_number}</td>
                  <td className="max-w-70 truncate">{o.product_name}</td>
                  <td className="text-right font-mono text-[#C9922A]">
                    {formatUSD(o.total_usd)}
                  </td>
                  <td>
                    <StatusPill status={o.status} />
                  </td>
                  <td className="text-right whitespace-nowrap">
                    <button
                      onClick={() => setPreview(o)}
                      className="helix-btn-primary text-[11px] py-1.5 px-3 inline-flex items-center gap-1.5 mr-2"
                      data-testid={`preview-${o.id}`}
                    >
                      <Eye size={12} /> Preview
                    </button>
                    <button
                      onClick={() => download(o)}
                      className="text-[#9CA3AF] hover:text-[#C9922A] inline-flex items-center gap-1 text-[12px]"
                      title="Download as .txt"
                      data-testid={`dl-${o.id}`}
                    >
                      <Download size={13} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {preview && (
        <ReceiptPreviewModal
          receipt={preview}
          onClose={() => setPreview(null)}
          onDownload={download}
        />
      )}
    </main>
  );
}
