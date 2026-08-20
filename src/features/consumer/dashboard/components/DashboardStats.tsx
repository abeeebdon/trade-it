import { Package, Heart, ShoppingBag, DollarSign } from 'lucide-react';
import { formatUSD } from '@/lib/func';
import StatCard from './StatCard';
import type { DashboardStats } from '../types';

interface DashboardStatsProps {
  stats: DashboardStats;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  console.log(stats);
  return (
    <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        to="/account/orders"
        icon={Package}
        label="Total orders"
        value={stats?.totalOrders ?? 0}
      />
      <StatCard
        to="/account/orders"
        icon={ShoppingBag}
        label="In transit"
        value={stats.inTransit}
        accent
      />
      <StatCard
        to="/account/favourites"
        icon={Heart}
        label="Favourites"
        value={stats.favourites}
      />
      <StatCard
        to="/account/receipts"
        icon={DollarSign}
        label="Total spent"
        value={formatUSD(stats.totalSpent)}
      />
    </article>
  );
}
