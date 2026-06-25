import { Lock } from 'lucide-react';
import Link from 'next/link';
import { StatusPill } from './StatusPill';
import { formatUSD } from '@/lib/func';
import { useEffect, useState } from 'react';
import { Quote } from '../types/shops';
import { testQuotes } from '../components/data';
import { Loading } from '@/components/loading';

const QuoteCompPage = () => {
  const [quotes, setQuotes] = useState<{
    as_consumer: Quote[];
    as_seller: Quote[];
  }>({
    as_consumer: [],
    as_seller: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setQuotes({
        as_consumer: testQuotes,
        as_seller: [],
      });
      setLoading(false);
    }, 800); // simulate API delay
  }, []);
  return (
    <article className="mt-6">
      <h3 className="helix-h3 mb-3">Quote requests</h3>
      {loading ? (
        <div className="flex justify-center min-h-50">
          <Loading />
        </div>
      ) : (
        quotes.as_consumer.length > 0 && (
          <div className="mb-10">
            <div className="space-y-3">
              {quotes.as_consumer.map((q) => (
                <div key={q.id} className="helix-card p-5">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <div className="text-[11px] font-mono tracking-widest text-[#1A7A6E]">
                        {q.quote_number}
                      </div>
                      <div className="helix-h3 mt-1">{q.listing_title}</div>
                      <div className="text-[12px] text-[#9CA3AF]">
                        Qty requested: {q.quantity}
                      </div>
                      {q.message && (
                        <div className="text-[12px] mt-2 italic">
                          &ldquo;{q.message}&rdquo;
                        </div>
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
                            {formatUSD(q.quoted_unit_price_usd ?? 0)}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#9CA3AF] tracking-widest">
                            QUOTED TOTAL
                          </div>
                          <div className="font-mono text-[#C9922A] text-lg">
                            {formatUSD(q.quoted_total_usd ?? 0)}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#9CA3AF] tracking-widest">
                            VALID UNTIL
                          </div>
                          <div className="font-mono">{q.quote_valid_until}</div>
                        </div>
                      </div>
                      {q.quote_note && (
                        <p className="text-[12px] text-[#9CA3AF] mt-3">
                          Seller: {q.quote_note}
                        </p>
                      )}
                      <div className="flex gap-2 mt-4">
                        <Link
                          href={`/shop/product/${q.listing_id}?quote=${q.id}`}
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
        )
      )}
    </article>
  );
};

export default QuoteCompPage;
