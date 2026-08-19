'use client';

import { useMemo } from 'react';
import { toast } from 'sonner';
import type { FulfillmentOrder } from '../types/fulftillment';
import { useExporterQuotes } from '../hooks/useFulfillment';
import QuoteCard from '../components/QuoteCard';
import FulfillmentOrderCard from '../components/FulfillmentOrderCard';

export default function Fulfillment() {
  const { data, isPending } = useExporterQuotes();
  const quotes = data?.data || [];
  const orders: FulfillmentOrder[] = useMemo(() => [], []);

  const ship = async (id: string) => {
    void id; // TODO: use in real API call
    const tn = window.prompt('Tracking number (leave blank to auto-generate)');
    if (tn === null) return;
    try {
      // TODO: call real ship API with id
      await new Promise((res) => setTimeout(res, 500));
      toast.success('Marked shipped');
    } catch {
      toast.error('Failed');
    }
  };

  const deliver = async (id: string) => {
    void id; // TODO: use in real API call
    const confirmed = window.confirm(
      'Mark delivered? This releases the escrow funds to your USD wallet (net of 2% fee).',
    );
    if (!confirmed) return;
    try {
      // TODO: call real deliver API with id
      await new Promise((res) => setTimeout(res, 600));
      toast.success('Escrow released · funds credited to your USD wallet');
    } catch {
      toast.error('Failed');
    }
  };

  return (
    <section>
      {isPending ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="helix-card p-5 h-36 animate-pulse opacity-40"
            />
          ))}
        </div>
      ) : (
        quotes.length > 0 && (
          <div className="space-y-3 mb-10">
            {quotes.map((q) => (
              <QuoteCard key={q.id} q={q} />
            ))}
          </div>
        )
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
    </section>
  );
}
