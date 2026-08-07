'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { MessageCircle } from 'lucide-react';
import type { FulfillmentOrder, ApiQuoteRequest } from '../types/fulftillment';
import QuoteCard from '../components/QuoteCard';
import RespondQuoteModal from '../components/RespondQuoteModal';
import FulfillmentOrderCard from '../components/FulfillmentOrderCard';
import { useExporterQuotes } from '../hooks/useFulfillment';

export default function Fulfillment() {
  const [respond, setRespond] = useState<ApiQuoteRequest | null>(null);

  const { data, isPending } = useExporterQuotes();
  const quotes = data?.data || [];
  console.log('Exporter quotes:', quotes);
  const orders: FulfillmentOrder[] = useMemo(() => [], []);

  const handleRespond = (q: ApiQuoteRequest) => {
    setRespond(q);
  };

  const handleQuoteSuccess = () => {
    // TODO: refetch quotes via react-query invalidation
  };

  // ── Mark shipped (mock — replace with real API call)
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

  // ── Mark delivered + release escrow (mock — replace with real API call)
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

  // ── Loading skeleton
  if (isPending) {
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
              <QuoteCard
                key={q.id}
                q={q}
                onRespond={handleRespond}
                canRespond
              />
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
              canAct
            />
          ))}
        </div>
      )}

      {respond && (
        <RespondQuoteModal
          quote={respond}
          onClose={() => setRespond(null)}
          onSuccess={handleQuoteSuccess}
        />
      )}
    </>
  );
}
