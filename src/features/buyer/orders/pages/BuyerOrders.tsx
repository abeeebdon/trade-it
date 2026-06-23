'use client';
import Pagination, { paginate } from '@/components/ui/Pagination';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { useAppSelector } from '@/hooks/store/store';
import { formatDateTime, formatUSD } from '@/lib/func';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import OrderTableSkeleton from '../../components/OrderTableSkeleton';
import { useGetBuyerOrders } from '../hooks/useGetBuyerOrders';

const PER_PAGE = 10;

interface Order {
  order_number: number;
  buyer_user_id: number;
  product_name: string;
  quantity: number;
  agreed_price_usd: number;
  target_delivery_date: string;
  status: string;
  payment_status: string;
}

export default function BUyerOrders() {
  const { user } = useAppSelector((state) => state.auth);
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);

  const { data: buyerOrders, isPending } = useGetBuyerOrders();

  return (
    <main>
      {isPending ? (
        <OrderTableSkeleton />
      ) : buyerOrders?.length === 0 ? (
        <div className="helix-card p-12 text-center text-[#9CA3AF]">
          No orders yet.{' '}
          {user?.role === 'retailer'
            ? 'Browse the marketplace to submit an RFQ.'
            : 'Inbound RFQs and confirmed trades will appear here.'}
        </div>
      ) : (
        (() => {
          const p = paginate(orders, page, PER_PAGE);
          return (
            <div className="helix-card overflow-hidden">
              <table className="helix-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Role</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Amount</th>
                    <th>Delivery</th>
                    <th>Status</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {buyerOrders?.map((o, i) => (
                    <tr key={i}>
                      <td>
                        <Link
                          href={`/orders/${i + 1}`}
                          className="font-mono text-[#C9922A]"
                        >
                          {o?.orderNumber ?? 0}
                        </Link>
                      </td>
                      <td className="text-[12px]">
                        {/* {o.buyer_user_id === user?.user_id
                          ? 'Buyer'
                          : 'Supplier'} */}
                      </td>
                      <td className="max-w-55 truncate">{o.productName}</td>
                      <td className="font-mono">{o.quantity}</td>
                      <td className="font-mono">{formatUSD(o.amount)}</td>
                      <td className="text-[12px] text-[#9CA3AF]">
                        {formatDateTime(o.deliveryDate)}
                      </td>
                      <td>
                        <StatusPill status={o.status} />
                      </td>
                      <td>
                        <StatusPill status={o.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                page={p.page}
                totalPages={p.totalPages}
                onChange={setPage}
              />
            </div>
          );
        })()
      )}
    </main>
  );
}
