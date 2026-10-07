'use client';

import DashboardSkeleton from '../components/DashboardSkeleton';
import DashboardErrorState from '../components/DashboardErrorState';
import DashboardStats from '../components/DashboardStats';
import ActiveOrdersSection from '../components/ActiveOrdersSection';
import BuyAgainSection from '../components/BuyAgainSection';
import { useConsumerDashboard } from '../hooks/useConsumerDashboard';

export default function ConsumerDashboard() {
  const { data: d, isLoading, isError, refetch } = useConsumerDashboard();
  if (isLoading && !d) return <DashboardSkeleton />;

  if (isError && !d) {
    return <DashboardErrorState onRetry={refetch} />;
  }

  if (!d) return null;

  return (
    <main>
      <p className="text-[13px] text-[#9CA3AF] mb-6">{/* {contextLine} */}</p>

      {/* Quick Stats */}
      <DashboardStats stats={d?.stats} />

      {/* Active Orders */}
      <ActiveOrdersSection orders={d.activeOrders} />

      {/* Buy Again */}
      <BuyAgainSection items={d.buyAgain} />
    </main>
  );
}
