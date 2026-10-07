import EmptyState from './EmptyState';
import OrderCard from './OrderCard';
import type { DashboardOrder } from '../types';

interface ActiveOrdersSectionProps {
  orders: DashboardOrder[];
}

export default function ActiveOrdersSection({
  orders,
}: ActiveOrdersSectionProps) {
  return (
    <section className="mb-10">
      <h2 className="helix-h3 mb-4">Active orders</h2>
      {orders?.length === 0 ? (
        <EmptyState
          title="No active orders"
          cta="Shop now"
          to="/?beta=1"
          body="When you shop on JompShop, your orders will appear here with live tracking from Nigeria to your door."
        />
      ) : (
        <div className="space-y-4">
          {orders?.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>
      )}
    </section>
  );
}
