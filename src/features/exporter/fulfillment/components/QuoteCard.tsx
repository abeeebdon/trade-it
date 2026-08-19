'use client';

import { formatDateToMM, formatUSD } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import type { ApiQuoteRequest } from '../types/fulftillment';
import RespondQuoteModal from './RespondQuoteModal';
import { useState } from 'react';

interface QuoteCardProps {
  q: ApiQuoteRequest;
}

export default function QuoteCard({ q }: QuoteCardProps) {
  const [showRespondModal, setShowRespondModal] = useState(false);
  const handleQuoteSuccess = () => {
    // setShowRespondModal(false);
  };
  return (
    <>
      <div className="helix-card p-5" data-testid={`seller-quote-${q.id}`}>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-mono tracking-widest text-[#1A7A6E]">
              {q.quoteNumber}
            </div>
            <div className="helix-h3 mt-1">{q.productName}</div>
            <div className="text-[12px] text-[#9CA3AF] mt-1">
              Qty: {q.quantity} · From {q.buyerName}{' '}
              <span className="hidden sm:inline">&lt;{q.buyerEmail}&gt;</span>
            </div>
            {q.message && (
              <div className="text-[12px] mt-2 italic text-[#F5F5F5]">
                &ldquo;{q.message}&rdquo;
              </div>
            )}
            {q.quotedUnitPriceUsd && (
              <div className="mt-2 text-[12px] text-[#C9922A] font-mono">
                Quoted: {formatUSD(q.quotedUnitPriceUsd)} × {q.quantity} ={' '}
                {formatUSD(q.quotedTotalUsd ?? 0)}
                {q.quoteValidUntil && (
                  <span className="text-[#9CA3AF]">
                    (valid until {formatDateToMM(q.quoteValidUntil)})
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <StatusPill status={q.status} />
            {q.status === 'pending' && (
              <button
                onClick={() => setShowRespondModal(true)}
                className="helix-btn-primary text-sm"
              >
                Respond
              </button>
            )}
          </div>
        </div>
      </div>
      {showRespondModal && (
        <RespondQuoteModal
          quote={q}
          onClose={() => setShowRespondModal(false)}
          onSuccess={handleQuoteSuccess}
        />
      )}
    </>
  );
}
