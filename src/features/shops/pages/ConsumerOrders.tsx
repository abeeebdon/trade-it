'use client';
import { useEffect, useState } from 'react';
import { StatusPill } from '../components/StatusPill';
import { formatUSD } from '@/lib/func';
import Link from 'next/link';
import { Lock } from 'lucide-react';
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
      <div className="text-primary!  helix-h3 mb-2">My orders & quotes</div>
      <h1 className="helix-h2 mb-6">Jompshop · Order history</h1>
      <OrderPageFilter active={filter} onChange={setFilter} /> {/* Quotes */}
      {filter !== '' ? (
        filter == 'orders' ? (
          <OrderComp />
        ) : (
          <QuoteCompPage />
        )
      ) : (
        <>
          <QuoteCompPage />
          <OrderComp />
        </>
      )}
    </main>
  );
}
