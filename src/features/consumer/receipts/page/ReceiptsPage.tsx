'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { formatUSD, formatDateTime } from '@/lib/func';
import { useGetReceipts, useDownloadReceipt } from '../hooks/useReceipts';
import ReceiptRow from '../components/ReceiptRow';
import ReceiptCard from '../components/ReceiptCard';
import ReceiptPreviewModal from '../components/ReceiptPreviewModal';
import ReceiptsEmptyState from '../components/ReceiptsEmptyState';
import ReceiptsSkeleton from '../components/ReceiptsSkeleton';
import type { Receipt } from '../types';

export default function Receipts() {
  const [preview, setPreview] = useState<Receipt | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const { data, isLoading } = useGetReceipts();
  const { mutateAsync: downloadMutate } = useDownloadReceipt();

  const items = data?.data?.data ?? [];

  // ── Text‑based download fallback (offline / preview) ─────
  const downloadText = (o: Receipt) => {
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

  // ── API download handler ─────────────────────────────────
  const handleDownload = async (o: Receipt) => {
    setDownloadingId(o.id);
    try {
      await downloadMutate(o.order_number);
    } catch {
      // fallback to text download on error
      downloadText(o);
    } finally {
      setDownloadingId(null);
    }
  };

  // ── Preview download still uses text (no orderId needed) ─
  const handlePreviewDownload = (o: Receipt) => {
    downloadText(o);
  };

  if (isLoading) return <ReceiptsSkeleton />;

  return (
    <main>
      <p className="text-[13px] text-[#9CA3AF] mb-6">
        Preview or download a receipt for every completed purchase.
      </p>

      {items.length === 0 ? (
        <ReceiptsEmptyState />
      ) : (
        <>
          {/* ── Desktop table ─────────────────────────────── */}
          <div className="hidden md:block helix-card overflow-x-auto">
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
                  <ReceiptRow
                    key={o.id}
                    receipt={o}
                    onPreview={setPreview}
                    onDownload={handleDownload}
                    isDownloading={downloadingId === o.id}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile cards ──────────────────────────────── */}
          <div className="md:hidden space-y-3">
            {items.map((o) => (
              <ReceiptCard
                key={o.id}
                receipt={o}
                onPreview={setPreview}
                onDownload={handleDownload}
                isDownloading={downloadingId === o.id}
              />
            ))}
          </div>
        </>
      )}

      {preview && (
        <ReceiptPreviewModal
          receipt={preview}
          onClose={() => setPreview(null)}
          onDownload={handlePreviewDownload}
        />
      )}
    </main>
  );
}
