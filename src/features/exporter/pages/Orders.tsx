'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatUSD, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetSellerOrders } from '../hooks/useOrders';
import { PER_PAGE } from '@/lib/constants';

//  Component

export default function Orders() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useGetSellerOrders({
    pageNumber: page,
    pageSize: PER_PAGE,
  });

  const orders = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  // Loading
  if (isPending) {
    return (
      <div className="helix-card overflow-hidden animate-pulse opacity-40">
        <div className="p-5 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-[#1A7A6E]/10 rounded" />
          ))}
        </div>
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
        {user?.role === 'reseller'
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
                <td className="font-mono text-[#C9922A]">{o.order_number}</td>
                <td className="text-[12px]">
                  {o.buyer_user_id === user?.id ? 'Buyer' : 'Supplier'}
                </td>
                <td className="max-w-55 truncate">{o.product_name}</td>
                <td className="font-mono">{o.quantity}</td>
                <td className="font-mono">{formatUSD(o.agreed_price_usd)}</td>
                <td className="text-[12px] text-[#9CA3AF]">
                  {formatDateTime(o.target_delivery_date)}
                </td>
                <td>
                  <StatusPill status={o.status} />
                </td>
                <td>
                  <StatusPill status={o.payment_status} />
                </td>
                <td>
                  <Link
                    href={`/exporter/orders/${o.id}`}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 px-5 py-4 border-t border-[#1A7A6E]/15">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="p-2 rounded border border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E] hover:text-[#F5F5F5] disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={14} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-8 h-8 rounded text-[12px] font-mono border transition ${
                n === page
                  ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A] font-bold'
                  : 'bg-transparent text-[#9CA3AF] border-[#1A7A6E]/40 hover:border-[#1A7A6E] hover:text-[#F5F5F5]'
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="p-2 rounded border border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E] hover:text-[#F5F5F5] disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
