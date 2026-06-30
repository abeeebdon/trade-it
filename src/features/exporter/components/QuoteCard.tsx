'use client';

import { formatUSD } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import type { SellerQuote } from '../types/exporter';

interface QuoteCardProps {
  q: SellerQuote;
  onRespond: (q: SellerQuote) => void;
}

export default function QuoteCard({ q, onRespond }: QuoteCardProps) {
  return (
    <div className="helix-card p-5" data-testid={`seller-quote-${q.id}`}>
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-mono tracking-widest text-[#1A7A6E]">
            {q.quote_number}
          </div>
          <div className="helix-h3 mt-1">{q.listing_title}</div>
          <div className="text-[12px] text-[#9CA3AF] mt-1">
            Qty: {q.quantity} · From {q.consumer_name}{' '}
            <span className="hidden sm:inline">&lt;{q.consumer_email}&gt;</span>
          </div>
          {q.message && (
            <div className="text-[12px] mt-2 italic text-[#F5F5F5]">
              &ldquo;{q.message}&rdquo;
            </div>
          )}
          {q.quoted_unit_price_usd && (
            <div className="mt-2 text-[12px] text-[#C9922A] font-mono">
              Quoted: {formatUSD(q.quoted_unit_price_usd)} × {q.quantity} ={' '}
              {formatUSD(q.quoted_total_usd ?? 0)}
              {q.quote_valid_until && (
                <span className="text-[#9CA3AF]">
                  {' '}
                  (valid {q.quote_valid_until})
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <StatusPill status={q.status} />
          {q.status === 'pending' && (
            <button
              onClick={() => onRespond(q)}
              className="helix-btn-primary text-sm"
              data-testid={`respond-${q.id}`}
            >
              Respond
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
