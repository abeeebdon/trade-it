'use client';

import Link from 'next/link';
import { Check, Circle, Truck } from 'lucide-react';
import { cn } from '@/lib/cn';
import { formatDateToMM, formatUSD, sliceLastTen } from '@/lib/func';
import type { AdminOrder } from '@/features/admin/types/orders';

type OrderDTableProps = {
  orders: AdminOrder[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
};

/** Statuses the API may return once an order has been fulfilled. */
const FULFILLED_STATUSES = ['fulfilled', 'shipped', 'delivered', 'in_transit'];

const label = (value?: string | null) =>
  value ? value.replace(/_/g, ' ') : '—';

const headCell =
  'border-b border-border bg-bg px-3.5 py-2.5 text-left font-mono text-[10px] font-medium tracking-[0.12em] text-muted uppercase whitespace-nowrap';

const cell =
  'border-b border-border/50 px-3.5 py-2.5 text-[12px] text-text align-middle';

function PaymentPill({ status }: { status?: string | null }) {
  const value = (status ?? '').toLowerCase();
  const dot =
    value === 'paid'
      ? 'bg-success'
      : value === 'refunded' || value === 'failed'
        ? 'bg-danger'
        : 'bg-primary';

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-[10px] text-text whitespace-nowrap capitalize">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label(status)}
    </span>
  );
}

function FulfillmentPill({ status }: { status?: string | null }) {
  const fulfilled = FULFILLED_STATUSES.includes((status ?? '').toLowerCase());

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] whitespace-nowrap capitalize ${
        fulfilled
          ? 'border-border bg-bg-soft text-muted'
          : 'border-primary/40 bg-primary/15 text-primary'
      }`}
    >
      {fulfilled ? (
        <Check size={11} />
      ) : (
        <Circle size={9} fill="currentColor" />
      )}
      {label(status ?? 'unfulfilled')}
    </span>
  );
}

function OrderDMobileCard({
  order,
  selected,
  onToggleSelect,
}: {
  order: AdminOrder;
  selected: boolean;
  onToggleSelect: (id: string) => void;
}) {
  const id = String(order.id);

  return (
    <article
      className={cn(
        'rounded-lg border border-border bg-surface p-3.5',
        selected && 'bg-primary/5',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-2.5">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect(id)}
            aria-label={`Select order ${order.orderNumber}`}
            className="mt-0.5 accent-primary cursor-pointer"
          />
          <div className="min-w-0">
            <Link
              href={{ pathname: '/admin/orders/details', query: { id } }}
              className="block truncate font-mono text-[12px] text-primary hover:underline"
            >
              #{order.orderNumber}
            </Link>
            <p className="mt-0.5 truncate text-[13px] font-medium text-text">
              {order.productName}
            </p>
            <p className="truncate font-mono text-[10px] text-muted">
              {order.variantTitle || order.sku || order.category}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full border border-border/60 px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted">
          {label(order.status)}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-widest text-muted">
            Customer
          </p>
          <p className="truncate text-[11px] text-text">{order.shipTo}</p>
          {order.email && (
            <p className="truncate text-[10px] text-muted">{order.email}</p>
          )}
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-muted">
            Delivery date
          </p>
          <p className="text-[11px] text-text">
            {formatDateToMM(order.deliveryDate)}
          </p>
          <p className="text-[10px] capitalize text-muted">
            {label(order.orderType)}
          </p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-muted">Qty</p>
          <p className="font-mono text-[11px] text-text">{order.quantity}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-muted">
            Total
          </p>
          <p className="font-mono text-[12px] font-semibold text-primary">
            {formatUSD(order.totalAmount ?? order.amount ?? 0)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-border/50 pt-2.5">
        <PaymentPill status={order.paymentStatus} />
        <FulfillmentPill status={order.fulfillmentStatus} />
        {(order.trackingNumber || order.courierName) && (
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-muted">
            <Truck size={12} className="text-secondary" />
            {order.courierName || order.trackingNumber}
          </span>
        )}
      </div>
    </article>
  );
}

export default function OrderDTable({
  orders,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: OrderDTableProps) {
  return (
    <>
      <div className="hidden md:block overflow-hidden rounded-lg border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-295 border-collapse text-left">
            <thead>
              <tr>
                <th className={cn(headCell, 'w-10')}>
                  <input
                    type="checkbox"
                    onChange={onToggleSelectAll}
                    aria-label="Select all orders"
                    className="accent-primary cursor-pointer"
                  />
                </th>
                <th className={headCell}>Order</th>
                <th className={headCell}>Delivery Date</th>
                <th className={headCell}>Customer</th>
                <th className={headCell}>Product</th>
                <th className={headCell}>Qty</th>
                <th className={headCell}>Channel</th>
                <th className={headCell}>Total</th>
                <th className={headCell}>Payment status</th>
                <th className={headCell}>Fulfillment status</th>
                <th className={headCell}>Tracking</th>
                <th className={headCell}>Status</th>
              </tr>
            </thead>

            <tbody className="[&_tr:last-child_td]:border-b-0">
              {orders.map((order) => {
                const id = String(order.id);
                const selected = selectedIds.includes(id);

                return (
                  <tr
                    key={order.id}
                    className={cn(
                      'transition-colors hover:bg-primary/5',
                      selected && 'bg-primary/5',
                    )}
                  >
                    <td className={cell}>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => onToggleSelect(id)}
                        aria-label={`Select order ${order.orderNumber}`}
                        className="accent-primary cursor-pointer"
                      />
                    </td>

                    <td
                      className={cn(
                        cell,
                        'font-mono text-[12px] text-primary whitespace-nowrap',
                      )}
                    >
                      <Link
                        href={{
                          pathname: '/admin/orders/details',
                          query: { id },
                        }}
                        className="hover:underline"
                      >
                        #{sliceLastTen(order.orderNumber)}
                      </Link>
                    </td>

                    <td
                      className={cn(
                        cell,
                        'text-[12px] text-muted whitespace-nowrap',
                      )}
                    >
                      {formatDateToMM(order.deliveryDate)}
                    </td>

                    <td className={cn(cell, 'whitespace-nowrap')}>
                      <p className="text-text">{order.shipTo}</p>
                      {order.email && (
                        <p className="text-[10px] text-muted">{order.email}</p>
                      )}
                    </td>

                    <td className={cell}>
                      <p className="text-text truncate max-w-56">
                        {order.productName}
                      </p>
                      <p className="text-[10px] text-muted font-mono truncate max-w-56">
                        {order.variantTitle || order.sku || order.category}
                      </p>
                    </td>

                    <td className={cn(cell, 'font-mono whitespace-nowrap')}>
                      {order.quantity}
                    </td>

                    <td className={cn(cell, 'whitespace-nowrap')}>
                      <span className="rounded border border-border/60 bg-bg-soft px-2 py-0.5 text-[10px] text-muted capitalize">
                        {label(order.orderType)}
                      </span>
                    </td>

                    <td
                      className={cn(
                        cell,
                        'font-mono text-primary whitespace-nowrap',
                      )}
                    >
                      {formatUSD(order.totalAmount ?? order.amount ?? 0)}
                    </td>

                    <td className={cell}>
                      <PaymentPill
                        status={
                          order.paymentStatus.toLowerCase() == 'paid'
                            ? 'paid'
                            : 'unpaid'
                        }
                      />
                    </td>

                    <td className={cell}>
                      <FulfillmentPill status={order.fulfillmentStatus} />
                    </td>

                    <td className={cn(cell, 'text-[12px] whitespace-nowrap')}>
                      {order.trackingNumber || order.courierName ? (
                        <span className="inline-flex items-center gap-1.5 text-muted">
                          {order.courierName || order.trackingNumber}
                          {order.courierName && order.trackingNumber && (
                            <span className="font-mono text-[10px]">
                              · {order.trackingNumber}
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>

                    <td className={cn(cell, 'whitespace-nowrap')}>
                      <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                        {label(order.status)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-3">
        {orders.map((order) => (
          <OrderDMobileCard
            key={order.id}
            order={order}
            selected={selectedIds.includes(String(order.id))}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </div>

      {orders.length === 0 && (
        <div className="rounded-lg border border-border bg-surface px-4 py-10 text-center text-sm text-muted">
          No orders match the current filters.
        </div>
      )}
    </>
  );
}
