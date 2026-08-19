'use client';

import { Lock } from 'lucide-react';
import { StatusPill } from './StatusPill';
import { formatDateTime, formatUSD } from '@/lib/func';
import PressableBtn from '@/components/buttons/PressableBtn';
import { AcceptAndPrepayQuotePayload, Quote } from '../types/shops';
import {
  useAcceptAndPrepayQuote,
  useDeclineQuote,
} from '../hooks/useGetOrders';
import { useState } from 'react';
import AcceptPrepayModal from './AcceptPrepayModal';
import WarningModal from '@/components/modals/WarningModal';

interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard = ({ quote }: QuoteCardProps) => {
  const acceptAndPrepay = useAcceptAndPrepayQuote();
  const decline = useDeclineQuote();

  const [prepayQuote, setPrepayQuote] = useState<Quote | null>(null);
  const [declineQuote, setDeclineQuote] = useState<Quote | null>(null);

  const handleAcceptAndPrepay = (q: Quote) => {
    setPrepayQuote(q);
  };

  const handleConfirmPrepay = (payload: AcceptAndPrepayQuotePayload) => {
    if (!prepayQuote) return;
    acceptAndPrepay.mutate(
      { quoteNumber: prepayQuote.quoteNumber, payload },
      {
        onSuccess: () => setPrepayQuote(null),
      },
    );
  };

  const handleDeclineQuote = (q: Quote) => {
    setDeclineQuote(q);
  };

  const handleConfirmDecline = () => {
    if (!declineQuote) return;
    decline.mutate(declineQuote.quoteNumber, {
      onSuccess: () => setDeclineQuote(null),
    });
  };
  return (
    <>
      <div className="helix-card p-5">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="helix-h3 mt-1">{quote.productName}</h2>
            <div className="text-[12px] text-[#9CA3AF]">
              Qty requested: {quote.quantity}
            </div>
            {quote.message && (
              <p className="text-[12px] mt-2 italic">
                &ldquo;{quote.message}&rdquo;
              </p>
            )}
          </div>
          <StatusPill status={quote.status} />
        </div>

        {quote.status === 'quoted' && (
          <div className="mt-4 pt-3 border-t border-[#1A7A6E]/15">
            <div className="grid grid-cols-3 gap-4 text-[13px]">
              <div>
                <p className="text-[10px] text-[#9CA3AF] tracking-widest">
                  QUOTED UNIT
                </p>
                <p className="font-mono text-[#C9922A]">
                  {formatUSD(quote.quotedUnitPriceUsd ?? 0)}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#9CA3AF] tracking-widest">
                  QUOTED TOTAL
                </p>
                <p className="font-mono text-[#C9922A] text-lg">
                  {formatUSD(quote.quotedTotalUsd ?? 0)}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#9CA3AF] tracking-widest">
                  VALID UNTIL
                </p>
                <p className="font-mono">
                  {formatDateTime(quote.quoteValidUntil ?? '')}
                </p>
              </div>
            </div>

            {quote.sellerNote && (
              <p className="text-[12px] text-[#9CA3AF] mt-3">
                Seller: {quote.sellerNote}
              </p>
            )}

            <div className="flex gap-4 mt-4">
              <PressableBtn
                handleClick={() => handleAcceptAndPrepay(quote)}
                loading={acceptAndPrepay.isPending}
                leftComponent={<Lock size={14} />}
                title="Accept &amp; prepay (escrow)"
                className="helix-btn-primary text-sm"
              />
              <PressableBtn
                handleClick={() => handleDeclineQuote(quote)}
                loading={decline.isPending}
                className="helix-btn-secondary text-sm"
                title="Decline"
              />
            </div>
          </div>
        )}
      </div>
      {prepayQuote && (
        <AcceptPrepayModal
          quote={prepayQuote}
          loading={acceptAndPrepay.isPending}
          onClose={() => setPrepayQuote(null)}
          onConfirm={handleConfirmPrepay}
        />
      )}
      {declineQuote && (
        <WarningModal
          open={!!declineQuote}
          onClose={() => setDeclineQuote(null)}
          onConfirm={handleConfirmDecline}
          loading={decline.isPending}
          label="Decline quote?"
          text={`You are declining the quoted price for "${declineQuote.productName}". This cannot be undone.`}
          btnText="Decline"
        />
      )}
    </>
  );
};

export default QuoteCard;
