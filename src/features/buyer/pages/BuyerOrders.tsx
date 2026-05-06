'use client';
import Pagination, { paginate } from '@/components/ui/Pagination';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { useAppSelector } from '@/hooks/store/store';
import { formatDateTime, formatUSD } from '@/lib/func';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import OrderTableSkeleton from '../components/OrderTableSkeleton';

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
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const dummyOrders = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        order_number: 1000 + i,
        buyer_user_id: 1,
        product_name: `Premium Product ${i + 1}`,
        quantity: (i % 20) + 1,
        agreed_price_usd: (i % 450) + 50,
        target_delivery_date: new Date().toISOString(),
        status: ['pending', 'shipped', 'delivered'][i % 3] as Order['status'],
        payment_status: ['pending', 'paid', 'failed'][
          i % 3
        ] as Order['payment_status'],
      })),
    [],
  );

  // ✅ simulate API
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(dummyOrders);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <main>
      {loading ? (
        <OrderTableSkeleton />
      ) : orders.length === 0 ? (
        <div className="helix-card p-12 text-center text-[#9CA3AF]">
          No orders yet.{' '}
          {user?.role === 'buyer'
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
                  {p.items.map((o, i) => (
                    <tr key={i} data-testid={`order-row-${i + 1}`}>
                      <td>
                        <Link
                          href={`/orders/${i + 1}`}
                          className="font-mono text-[#C9922A]"
                        >
                          {o?.order_number ?? 0}
                        </Link>
                      </td>
                      <td className="text-[12px]">
                        {/* {o.buyer_user_id === user?.user_id
                          ? 'Buyer'
                          : 'Supplier'} */}
                      </td>
                      <td className="max-w-55 truncate">{o.product_name}</td>
                      <td className="font-mono">{o.quantity}</td>
                      <td className="font-mono">
                        {formatUSD(o.agreed_price_usd)}
                      </td>
                      <td className="text-[12px] text-[#9CA3AF]">
                        {formatDateTime(o.target_delivery_date)}
                      </td>
                      <td>
                        <StatusPill status={o.status} />
                      </td>
                      <td>
                        <StatusPill status={o.payment_status} />
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
