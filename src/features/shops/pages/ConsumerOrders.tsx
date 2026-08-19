'use client';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/store/store';
import { useRouter } from 'next/navigation';
import OrderComp from '../components/OrderComp';
import OrderPageFilter from '../components/OrderPageFilter';
import QuoteCompPage from '../components/QuoteCompPage';

export default function ConsumerOrders() {
  const [filter, setFilter] = useState<'quotes' | 'orders' | ''>('');
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    router.push('/login');
    return <></>;
  }
  return (
    <main>
      <div className="text-primary!  helix-h2 mb-4 capitalize">
        My orders & quotes
      </div>
      <OrderPageFilter active={filter} onChange={setFilter} />
      {filter !== '' ? (
        filter == 'orders' ? (
          <OrderComp />
        ) : (
          <QuoteCompPage />
        )
      ) : (
        <>
          <OrderComp />
          <QuoteCompPage />
        </>
      )}
    </main>
  );
}
