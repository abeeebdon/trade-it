'use client';

import { Loading } from '@/components/loading';
import { useGetConsumerQuotes } from '../hooks/useGetOrders';
import QuoteCard from './QuoteCard';

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
              <QuoteCard key={q.id} quote={q} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default QuoteCompPage;
