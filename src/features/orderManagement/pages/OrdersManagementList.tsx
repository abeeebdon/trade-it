'use client';

// pages/OrdersManagementList.tsx
// Reusable order-management list for the dummy-data demo. Rendered once
// per role end (admin, consumer, retailer, exporter) with a status
// filter, a desktop table and mobile cards, all backed by DUMMY_ORDERS.

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PackageSearch } from 'lucide-react';
import { DUMMY_ORDERS } from '@/features/orderManagement/data/dummyOrders';
import {
  ORDER_STATUS_LABELS,
  OrderRole,
  OrderStatus,
} from '@/features/orderManagement/lib/orderStatus';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateTime, formatUSD } from '@/lib/func';

type StatusFilter = OrderStatus | 'all';

interface OrdersManagementListProps {
  role: OrderRole;
  perspective: string; // e.g. "Buyer", "Fulfiller", "Platform admin"
  title: string;
  subtitle: string;
  basePath: string; // e.g. "/admin/orders-demo"
}

const FILTERS: StatusFilter[] = ['all', ...Object.values(OrderStatus)];

export default function OrdersManagementList({
  perspective,
  title,
  subtitle,
  basePath,
}: OrdersManagementListProps) {
  const [filter, setFilter] = useState<StatusFilter>('all');

  const orders = useMemo(() => {
    if (filter === 'all') return DUMMY_ORDERS;
    return DUMMY_ORDERS.filter((o) => o.status === filter);
  }, [filter]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <PackageSearch size={22} className="text-[#C9922A]" />
        <div>
          <h1 className="text-xl font-semibold text-white">{title}</h1>
          <p className="text-sm text-white/50">{subtitle}</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === f
                ? 'bg-[#C9922A] text-[#0A1628]'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {f === 'all' ? 'All' : ORDER_STATUS_LABELS[f]}
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="helix-card p-12 text-center text-[#9CA3AF] text-sm">
          No orders match this status.
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="helix-card overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="helix-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>You are</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="font-mono text-[#C9922A]">
                        <Link
                          href={`${basePath}/${o.id}`}
                          className="hover:underline"
                        >
                          {o.orderNumber}
                        </Link>
                      </td>
                      <td className="text-[12px] text-white/50">
                        {perspective}
                      </td>
                      <td className="max-w-55 truncate">{o.items[0]?.name}</td>
                      <td className="font-mono">{o.items[0]?.quantity}</td>
                      <td className="font-mono">{formatUSD(o.total)}</td>
                      <td className="text-[12px] text-[#9CA3AF]">
                        {formatDateTime(o.createdAt)}
                      </td>
                      <td>
                        <StatusPill status={o.status} />
                      </td>
                      <td>
                        <Link
                          href={`${basePath}/${o.id}`}
                          className="text-[12px] text-[#C9922A] hover:underline whitespace-nowrap"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {orders.map((o) => (
              <Link
                key={o.id}
                href={`${basePath}/${o.id}`}
                className="helix-card rounded-xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-[#C9922A]">
                    {o.orderNumber}
                  </span>
                  <StatusPill status={o.status} />
                </div>
                <div>
                  <p className="text-sm text-white/90 truncate">
                    {o.items[0]?.name}
                  </p>
                  <p className="text-xs text-white/40">
                    Qty {o.items[0]?.quantity} · {formatDateTime(o.createdAt)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">
                    {formatUSD(o.total)}
                  </p>
                  <span className="text-xs text-[#C9922A]">Manage →</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
