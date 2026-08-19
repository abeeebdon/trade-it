'use client';

import { useMemo, useState } from 'react';
import { useGetAdminOrders } from '../../hooks/useGetAdminOrders';
import { AdminOrder } from '../../types/orders';
import Pagination, { paginate } from '@/components/ui/Pagination';
import SelectDropDown from '@/components/SelectDropDown';
import {
  OrderRowSkeleton,
  OrderCardSkeleton,
} from '../../components/OrdersSkeleton';
import { OrdersError } from '../../components/OrdersError';
import { OrdersEmpty } from '../../components/OrdersEmpty';
import { FilterBarSkeleton } from '../../adminListing/components/ListingsSkeleton';
import { OrderMobileCard } from '../components/OrderMobileCard';
import { OrdersFilterBar, StatusFilter } from '../components/OrdersFilterBar';
import { OrdersTable } from '../components/OrdersTable';

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
        <OrdersFilterBar
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
      <OrdersFilterBar
        status={status}
        onStatusChange={(s) => {
          setStatus(s);
          setPage(1);
        }}
      />

      {/* Desktop table */}
      <OrdersTable orders={items} />

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {items.map((order) => (
          <OrderMobileCard key={order.id} order={order} />
        ))}
      </div>

      {/* Pagination + page size */}
      <article className="flex flex-col sm:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
          <span>
            Total records:{' '}
            <strong className="text-[#F5F5F5]">{totalRecords}</strong>
          </span>
        </div>
        <div className="flex items-center  gap-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          <SelectDropDown
            pageNum={pageSize}
            setPageNum={(n) => {
              setPageSize(n);
              setPage(1);
            }}
          />
        </div>
      </article>
    </div>
  );
};

export default AdminOrders;
