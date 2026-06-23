import { StatusPill } from '@/features/shops/components/StatusPill';
import { useAppSelector } from '@/hooks/store/store';
import { formatUSD } from '@/lib/func';
import { Package } from 'lucide-react';
import Link from 'next/link';
import { DashboardOrderOverviewProps, OrderItem } from '../types/exporter';

const DashboardOrderOverview = ({
  data,
  orders,
}: DashboardOrderOverviewProps) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="helix-card lg:col-span-2 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1A7A6E]/20">
        <div>
          <div className="helix-label">Recent Orders</div>
          <div className="helix-h3 mt-1">
            {data?.recentOrders?.activeCount
              ? `${data.recentOrders.activeCount} active`
              : 'No orders yet'}
          </div>
        </div>
        <Link
          href="/exporter/orders"
          className="text-[12px] text-[#C9922A] hover:underline"
        >
          View all
        </Link>
      </div>

      {orders.length ? (
        <div className="overflow-x-auto">
          <table className="helix-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map((o: OrderItem) => (
                <tr key={o.id}>
                  <td className="font-mono text-[#C9922A]">
                    <Link href={`/orders/${o.id}`}>{o.orderNumber}</Link>
                  </td>
                  <td className="max-w-[220px] truncate">{o.productName}</td>
                  <td className="font-mono">{o.quantity}</td>
                  <td className="font-mono">{formatUSD(o.amount ?? 0)}</td>
                  <td>
                    <StatusPill status={o.status} />
                  </td>
                  <td>
                    <StatusPill status={o.paymentStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-10 text-center text-[#9CA3AF] text-sm">
          <Package size={34} className="mx-auto mb-3 text-[#1A7A6E]" />
          {user?.role === 'retailer'
            ? 'Browse the marketplace to submit your first RFQ.'
            : 'Orders you receive or place will appear here.'}
        </div>
      )}
    </div>
  );
};

export default DashboardOrderOverview;
