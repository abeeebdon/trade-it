'use client';

import { useMemo, useState } from 'react';
import { Package } from 'lucide-react';
import { formatUSD } from '@/lib/func';
import { categoryOf, FILTERS } from '../constants';
import FilterBar from '../components/FilterBar';
import OrderRow from '../components/OrderRow';
import OrdersEmptyState from '../components/OrdersEmptyState';
import OrdersSkeleton from '../components/OrdersSkeleton';
import type { OrderCounts, OrderStatusCategory, OrderTotals } from '../types';
import { useGetOrders } from '@/features/shops/hooks/useGetOrders';

export default function ConsumerOrders() {
  const [filter, setFilter] = useState<OrderStatusCategory>('all');

  const { data: orders = [], isPending } = useGetOrders();

  const { counts, totals } = useMemo(() => {
    const c: OrderCounts = {
      all: 0,
      in_transit: 0,
      delivered: 0,
      processing: 0,
    };
    const t: OrderTotals = {
      all: 0,
      in_transit: 0,
      delivered: 0,
      processing: 0,
    };

    for (const o of orders) {
      const cat = categoryOf(o.status);
      c.all += 1;
      t.all += o.amount;

      if (cat === 'in_transit') {
        c.in_transit += 1;
        t.in_transit += o.amount;
      } else if (cat === 'delivered') {
        c.delivered += 1;
        t.delivered += o.amount;
      } else if (cat === 'processing') {
        c.processing += 1;
        t.processing += o.amount;
      }
    }

    return { counts: c, totals: t };
  }, [orders]);

  const filtered = useMemo(() => {
    if (filter === 'all') return orders;
    return orders.filter((o) => categoryOf(o.status) === filter);
  }, [orders, filter]);

  const activeLabel = FILTERS.find((f) => f.v === filter)?.l || '';

  if (isPending) return <OrdersSkeleton />;

  return (
    <main>
      {/* Filter chips with counts */}
      <FilterBar filter={filter} onFilterChange={setFilter} counts={counts} />

      {/* Category summary breakdown */}
      {counts[filter] > 0 && (
        <div className="helix-card p-4 mb-6 flex flex-wrap items-center gap-4 text-[12px]">
          <div className="flex items-center gap-2">
            <Package size={14} className="text-[#C9922A]" />
            <span className="text-[#9CA3AF]">{activeLabel}:</span>
            <b className="text-[#F5F5F5]">{counts[filter]}</b>
            <span className="text-[#9CA3AF]">
              order{counts[filter] === 1 ? '' : 's'}
            </span>
          </div>
          <div className="h-4 w-px bg-[#1A7A6E]/30" />
          <div className="flex items-center gap-2">
            <span className="text-[#9CA3AF]">Total value:</span>
            <b className="font-mono text-[#C9922A]">
              {formatUSD(totals[filter] || 0)}
            </b>
          </div>
          {filter === 'in_transit' && counts.in_transit > 0 && (
            <>
              <div className="h-4 w-px bg-[#1A7A6E]/30" />
              <span className="text-[#C9922A]">
                ✈ Est. arrival in 5–12 days
              </span>
            </>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <OrdersEmptyState />
      ) : (
        <div className="space-y-4">
          {filtered.map((o) => (
            <OrderRow key={o.id} order={o} />
          ))}
        </div>
      )}
    </main>
  );
}
