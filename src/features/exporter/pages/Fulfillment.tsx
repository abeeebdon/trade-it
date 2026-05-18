'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MessageCircle } from 'lucide-react';
import { formatUSD } from '@/lib/func';
import type {
  SellerQuote,
  FulfillmentOrder,
  RespondForm,
} from '../types/exporter';
import { mockSellerQuotes, mockFulfillmentOrders } from '../components/data';
import QuoteCard from '../components/QuoteCard';
import FulfillmentOrderCard from '../components/FulfillmentOrderCard';
import RespondQuoteModal from '../components/RespondQuoteModal';

// Fulfillment

export default function Fulfillment() {
  const [orders, setOrders] = useState<FulfillmentOrder[]>([]);
  const [quotes, setQuotes] = useState<SellerQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [respond, setRespond] = useState<SellerQuote | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<RespondForm>({
    quoted_unit_price_usd: '',
    quote_note: '',
    valid_days: 7,
  });

  const load = () => {
    setTimeout(() => {
      setOrders(mockFulfillmentOrders);
      setQuotes(mockSellerQuotes);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    load();
  }, []);

  // ── Open respond modal and pre-fill if quote already has a price
  const handleRespond = (q: SellerQuote) => {
    setRespond(q);
    setForm({
      quoted_unit_price_usd: q.quoted_unit_price_usd
        ? String(q.quoted_unit_price_usd)
        : '',
      quote_note: '',
      valid_days: 7,
    });
  };

  // ── Send quote response
  const sendQuote = async () => {
    if (!respond || !form.quoted_unit_price_usd) {
      toast.error('Please enter a unit price');
      return;
    }
    setBusy(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      // Mock: update quote status to 'quoted' in local state
      setQuotes((prev) =>
        prev.map((q) =>
          q.id === respond.id
            ? {
                ...q,
                status: 'quoted' as const,
                quoted_unit_price_usd: Number(form.quoted_unit_price_usd),
                quoted_total_usd:
                  Number(form.quoted_unit_price_usd) * q.quantity,
                quote_valid_until: new Date(
                  Date.now() + form.valid_days * 86400000,
                )
                  .toISOString()
                  .split('T')[0],
              }
            : q,
        ),
      );
      toast.success('Quote sent to consumer');
      setRespond(null);
      setForm({ quoted_unit_price_usd: '', quote_note: '', valid_days: 7 });
    } catch {
      toast.error('Failed to send quote');
    } finally {
      setBusy(false);
    }
  };

  // ── Mark shipped
  const ship = async (id: string) => {
    const tn = window.prompt('Tracking number (leave blank to auto-generate)');
    if (tn === null) return; // user cancelled prompt
    try {
      await new Promise((res) => setTimeout(res, 500));
      const trackingNumber =
        tn.trim() || `AUTO-${Date.now().toString().slice(-8)}`;
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? {
                ...o,
                status: 'shipped' as const,
                tracking_number: trackingNumber,
              }
            : o,
        ),
      );
      toast.success('Marked shipped');
    } catch {
      toast.error('Failed');
    }
  };

  // ── Mark delivered + release escrow
  const deliver = async (id: string) => {
    const confirmed = window.confirm(
      'Mark delivered? This releases the escrow funds to your USD wallet (net of 2% fee).',
    );
    if (!confirmed) return;
    try {
      await new Promise((res) => setTimeout(res, 600));
      const order = orders.find((o) => o.id === id);
      const creditAmount = order ? order.total_usd * 0.98 : 0;
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? {
                ...o,
                status: 'delivered' as const,
                escrow_status: 'released' as const,
              }
            : o,
        ),
      );
      toast.success(
        `Escrow released · ${formatUSD(creditAmount)} credited to your USD wallet`,
      );
    } catch {
      toast.error('Failed');
    }
  };

  // ── Loading skeleton
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="helix-card p-5 h-36 animate-pulse opacity-40"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* ── Quote requests ── */}
      {quotes.length > 0 && (
        <div className="mb-8">
          <div className="helix-label mb-3 flex items-center gap-2">
            <MessageCircle size={14} /> Quote requests
          </div>
          <div className="space-y-3">
            {quotes.map((q) => (
              <QuoteCard key={q.id} q={q} onRespond={handleRespond} />
            ))}
          </div>
        </div>
      )}

      {/* ── Fulfillment orders ── */}
      {orders.length === 0 ? (
        <div className="helix-card p-12 text-center text-[#9CA3AF]">
          No consumer orders yet.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="helix-label mb-1">Orders in fulfillment queue</div>
          {orders.map((o) => (
            <FulfillmentOrderCard
              key={o.id}
              o={o}
              onShip={ship}
              onDeliver={deliver}
            />
          ))}
        </div>
      )}

      {/* ── Respond to quote modal ── */}
      {respond && (
        <RespondQuoteModal
          quote={respond}
          form={form}
          busy={busy}
          onFormChange={setForm}
          onSend={sendQuote}
          onClose={() => setRespond(null)}
        />
      )}
    </>
  );
}
