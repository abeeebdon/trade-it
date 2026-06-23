'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { formatUSD, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetSellerOrders } from '../../hooks/useOrders';
import { Loading } from '@/components/loading';
import Pagination from '../../components/pagination';

export default function Orders() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useGetSellerOrders({
    pageNumber: page,
    pageSize: 10,
  });
  const orders = useMemo(() => {
    return data ? data : [];
  }, [data]);
  const totalPages = useMemo(() => {
    return data ? Math.ceil(data.length / 10) : 1;
  }, [data]);
  // Loading
  if (isPending) {
    return (
      <div className="h-[70vh] overflow-hidden justify-center flex items-center opacity-40">
        {/* <div className="p-5 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-[#1A7A6E]/10 rounded" />
          ))}
        </div> */}
        <Loading />
      </div>
    );
  }

  // Error

  if (isError) {
    return (
      <div className="helix-card p-12 text-center text-[#9CA3AF] text-sm">
        Failed to load orders. Please refresh.
      </div>
    );
  }

  // Empty

  if (orders.length === 0) {
    return (
      <div className="helix-card p-12 text-center text-[#9CA3AF]">
        No orders yet.{' '}
        {user?.role === 'retailer'
          ? 'Browse the marketplace to submit an RFQ.'
          : 'Inbound RFQs and confirmed trades will appear here.'}
      </div>
    );
  }

  return (
    <div className="helix-card overflow-hidden">
      <div className="overflow-x-auto">
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} data-testid={`order-row-${o.id}`}>
                <td className="font-mono text-[#C9922A]">{o.orderNumber}</td>
                <td className="text-[12px]">
                  {o.shipTo === user?.id ? 'Buyer' : 'Supplier'}
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
                  <StatusPill status={o.paymentStatus} />
                </td>
                <td>
                  <Link
                    href={{
                      pathname: '/exporter/orders/details',
                      query: { id: `${o.id}` },
                    }}
                    className="text-[12px] text-[#C9922A] hover:underline whitespace-nowrap"
                  >
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
}
