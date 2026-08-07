import { Lock } from 'lucide-react';
import Link from 'next/link';
import { StatusPill } from './StatusPill';
import { formatDateTime, formatUSD } from '@/lib/func';
import { Loading } from '@/components/loading';
import { useGetConsumerQuotes } from '../hooks/useGetOrders';

const QuoteCompPage = () => {
  const { data, isPending } = useGetConsumerQuotes();

  return (
    <article className="mt-6">
      <h3 className="helix-h3 mb-3">Quote requests</h3>
      {isPending ? (
        <div className="flex justify-center min-h-50">
          <Loading />
        </div>
      ) : data?.length === 0 ? (
        <div className="helix-card p-12 text-center text-[#9CA3AF]">
          <p className="text-[14px] text-[#9CA3AF]">
            You have no quote requests at this time.
          </p>
        </div>
      ) : (
        <div className="mb-10">
          <div className="space-y-3">
            {data?.map((q) => (
              <div key={q.id} className="helix-card p-5">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <h2 className="helix-h3 mt-1">{q.productName}</h2>
                    <div className="text-[12px] text-[#9CA3AF]">
                      Qty requested: {q.quantity}
                    </div>
                    {q.message && (
                      <p className="text-[12px] mt-2 italic">
                        &ldquo;{q.message}&rdquo;
                      </p>
                    )}
                  </div>
                  <StatusPill status={q.status} />
                </div>
                {q.status === 'quoted' && (
                  <div className="mt-4 pt-3 border-t border-[#1A7A6E]/15">
                    <div className="grid grid-cols-3 gap-4 text-[13px]">
                      <div>
                        <div className="text-[10px] text-[#9CA3AF] tracking-widest">
                          QUOTED UNIT
                        </div>
                        <div className="font-mono text-[#C9922A]">
                          {formatUSD(q.quotedUnitPriceUsd ?? 0)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#9CA3AF] tracking-widest">
                          QUOTED TOTAL
                        </div>
                        <div className="font-mono text-[#C9922A] text-lg">
                          {formatUSD(q.quotedTotalUsd ?? 0)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#9CA3AF] tracking-widest">
                          VALID UNTIL
                        </div>
                        <div className="font-mono">
                          {formatDateTime(q.quoteValidUntil ?? '')}
                        </div>
                      </div>
                    </div>
                    {q.sellerNote && (
                      <p className="text-[12px] text-[#9CA3AF] mt-3">
                        Seller: {q.sellerNote}
                      </p>
                    )}
                    <div className="flex gap-2 mt-4">
                      <Link
                        href={`/shop/product/${q.sellerId}?quote=${q.id}`}
                        className="helix-btn-primary text-sm inline-flex items-center gap-2"
                      >
                        <Lock size={12} /> Accept &amp; prepay (escrow)
                      </Link>
                      <button
                        // onClick={() => declineQuote(q.id)}
                        className="helix-btn-secondary text-sm"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default QuoteCompPage;
