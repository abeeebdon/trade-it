'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Heart, ShoppingBag, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { formatUSD } from '@/lib/func';
import StatCard from '../components/StatCard';
import OrderCard from '../components/OrderCard';
import EmptyState from '../components/EmptyState';
import DashboardSkeleton from '../components/DashboardSkeleton';
import { MOCK_DASHBOARD } from '../constants';
import type { DashboardData, Listing } from '../types';

const SIMULATED_DELAY_MS = 1200;

export default function ConsumerDashboard() {
  const [d, setD] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setD(MOCK_DASHBOARD);
      setLoading(false);
    }, SIMULATED_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const reorder = (listing: Listing) => {
    try {
      const c = JSON.parse(localStorage.getItem('jomp_cart') || '[]') as {
        id: string;
        title: string;
        price: number;
        qty: number;
        photo: string;
      }[];
      const idx = c.findIndex((x) => x.id === listing.id);
      if (idx >= 0) {
        c[idx].qty += 1;
      } else {
        c.push({
          id: listing.id,
          title: listing.title,
          price: listing.retail_price_usd,
          qty: 1,
          photo: listing.photos?.[0] ?? '',
        });
      }
      localStorage.setItem('jomp_cart', JSON.stringify(c));
      window.dispatchEvent(new Event('jomp-cart-updated'));
      toast.success(`${listing.title} added to cart`);
    } catch {
      toast.error("Couldn't add to cart");
    }
  };

  if (loading || !d) return <DashboardSkeleton />;

  const contextLine = d.active_orders[0]
    ? `Your ${d.active_orders[0].product_name?.split(' ').slice(0, 3).join(' ') || 'order'} is ${d.active_orders[0].status === 'at_customs' ? 'at US customs' : 'on its way'}.`
    : 'No active orders. Head over to the marketplace to shop.';

  return (
    <main>
      <p
        className="text-[13px] text-[#9CA3AF] mb-6"
        data-testid="cs-context-line"
      >
        {contextLine}
      </p>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          to="/account/orders"
          icon={Package}
          label="Total orders"
          value={d.stats.total_orders}
        />
        <StatCard
          to="/account/orders"
          icon={ShoppingBag}
          label="In transit"
          value={d.stats.in_transit}
          accent
        />
        <StatCard
          to="/account/favourites"
          icon={Heart}
          label="Favourites"
          value={d.stats.favourites}
        />
        <StatCard
          to="/account/receipts"
          icon={DollarSign}
          label="Total spent"
          value={formatUSD(d.stats.total_spent_usd)}
        />
      </div>

      {/* Active Orders */}
      <section className="mb-10">
        <h2 className="helix-h3 mb-4">Active orders</h2>
        {d.active_orders.length === 0 ? (
          <EmptyState
            title="No active orders"
            cta="Shop now"
            to="/?beta=1"
            body="When you shop on JompShop, your orders will appear here with live tracking from Nigeria to your door."
          />
        ) : (
          <div className="space-y-4">
            {d.active_orders.map((o) => (
              <OrderCard key={o.id} order={o} />
            ))}
          </div>
        )}
      </section>

      {/* Buy Again */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="helix-h3">Buy again</h2>
          <Link
            href="/?beta=1"
            className="text-[12px] text-[#C9922A] hover:underline"
          >
            Browse Marketplace →
          </Link>
        </div>
        {d.buy_again.length === 0 ? (
          <EmptyState
            title="Nothing to reorder yet"
            body="Once you place your first order, we'll suggest reorders here."
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {d.buy_again.map((l) => (
              <div key={l.id} className="helix-card p-3 flex flex-col">
                <img
                  src={l.photos?.[0]}
                  alt={l.title}
                  className="aspect-square object-cover rounded mb-2"
                />
                <div className="text-[12px] font-semibold leading-tight line-clamp-2 flex-1">
                  {l.title}
                </div>
                <div className="text-[13px] font-mono text-[#C9922A] mt-2">
                  {formatUSD(l.retail_price_usd)}
                </div>
                <button
                  onClick={() => reorder(l)}
                  className="mt-2 helix-btn-primary text-[11px] py-1.5"
                  data-testid={`reorder-${l.id}`}
                >
                  Reorder
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
