'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useGetAdminOrders } from '../hooks/useGetAdminOrders';
import { AdminOrder } from '../types/orders';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateTime, formatUSD } from '@/lib/func';
import Pagination, { paginate } from '@/components/ui/Pagination';
import SelectDropDown from '@/components/SelectDropDown';
import {
  OrderRowSkeleton,
  OrderCardSkeleton,
} from '../components/OrdersSkeleton';
import { OrdersError } from '../components/OrdersError';
import { OrdersEmpty } from '../components/OrdersEmpty';
import { FilterBarSkeleton } from '../adminListing/components/ListingsSkeleton';

// ── Helpers ────────────────────────────────────────────
const categoryLabel = (cat: string) =>
  cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// ── Mobile Card ────────────────────────────────────────
function OrderMobileCard({ order }: { order: AdminOrder }) {
  return (
    <Link
      href={`/admin/orders/${order.id}`}
      className="helix-card p-4 block hover:border-[#C9922A]/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[13px] font-mono font-semibold text-[#C9922A]">
            {order.orderNumber}
          </h3>
          <p className="text-[14px] text-[#F5F5F5] mt-0.5">
            {order.productName}
          </p>
          <p className="text-[12px] text-[#9CA3AF]">
            {categoryLabel(order.category)} · Qty: {order.quantity}
          </p>
        </div>
        <StatusPill status={order.status} />
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="font-mono text-[#C9922A] font-semibold">
          {formatUSD(order.amount)}
        </span>
        <StatusPill status={order.paymentStatus} />
      </div>

      <div className="flex items-center justify-between mt-2 text-[12px] text-[#6B7280]">
        <span>{order.email}</span>
        <span>{formatDateTime(order.deliveryDate)}</span>
      </div>
    </Link>
  );
}

// ── Filters ────────────────────────────────────────────
type StatusFilter =
  | ''
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

const statusFilters: [StatusFilter, string][] = [
  ['', 'All'],
  ['pending', 'Pending'],
  ['confirmed', 'Confirmed'],
  ['shipped', 'Shipped'],
  ['delivered', 'Delivered'],
  ['cancelled', 'Cancelled'],
];

// ── Filter Bar ─────────────────────────────────────────
function FilterBar({
  status,
  onStatusChange,
}: {
  status: StatusFilter;
  onStatusChange: (s: StatusFilter) => void;
}) {
  return (
    <div className="helix-card px-5 py-3 flex flex-wrap gap-2 items-center">
      <span className="text-[12px] text-[#9CA3AF] mr-1">Status:</span>
      {statusFilters.map(([value, label]) => (
        <button
          key={value}
          onClick={() => onStatusChange(value)}
          className={`px-3 py-1.5 rounded-full text-[12px] border transition-colors ${
            status === value
              ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]'
              : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E] hover:text-[#F5F5F5]'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────
const AdminOrders = () => {
  const [status, setStatus] = useState<StatusFilter>('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isPending, isError, refetch } = useGetAdminOrders({
    status: status || undefined,
  });

  const orders: AdminOrder[] = useMemo(() => data ?? [], [data]);

  const { items, totalPages } = paginate(orders, page, pageSize);
  const totalRecords = orders.length;

  // ── Loading ────────────────────────────────────────
  if (isPending) {
    return (
      <div className="space-y-6">
        <FilterBarSkeleton />

        {/* Desktop skeleton */}
        <div className="hidden md:block helix-card overflow-hidden">
          <table className="helix-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Delivery</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <OrderRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile skeleton */}
        <div className="md:hidden space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────
  if (isError) {
    return <OrdersError onRetry={() => refetch()} />;
  }

  // ── Empty ──────────────────────────────────────────
  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <FilterBar
          status={status}
          onStatusChange={(s) => {
            setStatus(s);
            setPage(1);
          }}
        />
        <OrdersEmpty />
      </div>
    );
  }

  // ── Data ───────────────────────────────────────────
  return (
    <div className="space-y-6">
      <FilterBar
        status={status}
        onStatusChange={(s) => {
          setStatus(s);
          setPage(1);
        }}
      />

      {/* Desktop table */}
      <div className="hidden md:block helix-card overflow-hidden">
        <table className="helix-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Delivery</th>
            </tr>
          </thead>
          <tbody>
            {items.map((order) => (
              <tr
                key={order.id}
                className="cursor-pointer hover:bg-[#C9922A]/5 transition-colors"
              >
                <td className="font-mono text-[13px] text-[#C9922A]">
                  <Link href={`/admin/orders/${order.id}`} className="block">
                    {order.orderNumber}
                  </Link>
                </td>
                <td>
                  <Link href={`/admin/orders/${order.id}`} className="block">
                    <span className="font-medium text-[#F5F5F5] hover:text-[#C9922A] transition-colors">
                      {order.productName}
                    </span>
                    <span className="block text-[11px] text-[#9CA3AF]">
                      {categoryLabel(order.category)}
                    </span>
                  </Link>
                </td>
                <td>
                  <Link href={`/admin/orders/${order.id}`} className="block">
                    {order.quantity}
                  </Link>
                </td>
                <td className="font-mono text-[#C9922A]">
                  <Link href={`/admin/orders/${order.id}`} className="block">
                    {formatUSD(order.amount)}
                  </Link>
                </td>
                <td>
                  <Link href={`/admin/orders/${order.id}`} className="block">
                    <StatusPill status={order.status} />
                  </Link>
                </td>
                <td>
                  <Link href={`/admin/orders/${order.id}`} className="block">
                    <StatusPill status={order.paymentStatus} />
                  </Link>
                </td>
                <td className="text-[13px] text-[#9CA3AF]">
                  <Link href={`/admin/orders/${order.id}`} className="block">
                    {formatDateTime(order.deliveryDate)}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {items.map((order) => (
          <OrderMobileCard key={order.id} order={order} />
        ))}
      </div>

      {/* Pagination + page size */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
          <span>
            Total records:{' '}
            <strong className="text-[#F5F5F5]">{totalRecords}</strong>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          <SelectDropDown
            pageNum={pageSize}
            setPageNum={(n) => {
              setPageSize(n);
              setPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
