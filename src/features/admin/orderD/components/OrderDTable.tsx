'use client';

import { Check, Circle, Truck } from 'lucide-react';
import { formatUSD } from '@/lib/func';
import type { OrderDRecord } from '../types';
import { formatItems, formatOrderDate, formatRelativeDay } from '../utils';

type OrderDTableProps = {
  orders: OrderDRecord[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onEdit: (order: OrderDRecord) => void;
};

function PaymentPill({ status }: { status: OrderDRecord['paymentStatus'] }) {
  const dot =
    status === 'Paid'
      ? 'bg-emerald-500'
      : status === 'Refunded'
        ? 'bg-red-400'
        : 'bg-[#C9922A]';

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-[11px] text-text whitespace-nowrap">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

function FulfillmentPill({
  status,
}: {
  status: OrderDRecord['fulfillmentStatus'];
}) {
  const fulfilled = status === 'Fulfilled';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] whitespace-nowrap ${
        fulfilled
          ? 'border-border bg-bg-soft text-muted'
          : 'border-[#C9922A]/40 bg-[#C9922A]/15 text-[#C9922A]'
      }`}
    >
      {fulfilled ? (
        <Check size={11} />
      ) : (
        <Circle size={9} fill="currentColor" />
      )}
      {status}
    </span>
  );
}

export default function OrderDTable({
  orders,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
}: OrderDTableProps) {
  const allSelected =
    orders.length > 0 &&
    orders.every((order) => selectedIds.includes(order.id));

  return (
    <div className="helix-card overflow-x-auto">
      <table className="helix-table min-w-[1180px]">
        <thead>
          <tr>
            <th className="w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleSelectAll}
                aria-label="Select all orders"
                className="accent-primary cursor-pointer"
              />
            </th>
            <th>Order</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Fulfill by</th>
            <th>Channel</th>
            <th>Total</th>
            <th>Payment status</th>
            <th>Fulfillment status</th>
            <th>Items</th>
            <th>Delivery status</th>
            <th>Delivery method</th>
            <th>Tags</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            const selected = selectedIds.includes(order.id);

            return (
              <tr
                key={order.id}
                onClick={() => onEdit(order)}
                className={`cursor-pointer transition-colors ${
                  selected ? 'bg-primary/5' : ''
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onToggleSelect(order.id)}
                    onClick={(event) => event.stopPropagation()}
                    aria-label={`Select order ${order.orderNumber}`}
                    className="accent-primary cursor-pointer"
                  />
                </td>

                <td className="font-mono text-[13px] text-[#C9922A] whitespace-nowrap">
                  #{order.orderNumber}
                </td>

                <td className="text-[13px] text-muted whitespace-nowrap">
                  {formatOrderDate(order.placedAt)}
                </td>

                <td className="whitespace-nowrap">{order.customer}</td>

                <td className="text-[13px] text-muted whitespace-nowrap">
                  {formatRelativeDay(order.fulfillBy) || '—'}
                </td>

                <td className="whitespace-nowrap">
                  <span className="rounded border border-border/60 bg-bg-soft px-2 py-0.5 text-[11px] text-muted">
                    {order.channel}
                  </span>
                </td>

                <td className="font-mono text-[#C9922A] whitespace-nowrap">
                  {formatUSD(order.total)}
                </td>

                <td>
                  <PaymentPill status={order.paymentStatus} />
                </td>

                <td>
                  <FulfillmentPill status={order.fulfillmentStatus} />
                </td>

                <td className="text-[13px] text-muted whitespace-nowrap">
                  {formatItems(order.items)}
                </td>

                <td className="text-[13px] whitespace-nowrap">
                  {order.deliveryStatus ? (
                    <span className="inline-flex items-center gap-1.5 text-muted">
                      <Truck size={13} className="text-[#1A7A6E]" />
                      {order.deliveryStatus}
                    </span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>

                <td className="text-[13px] text-muted whitespace-nowrap">
                  {order.deliveryMethod}
                </td>

                <td>
                  <div className="flex flex-wrap gap-1">
                    {order.tags.length > 0 ? (
                      order.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-[13px] text-muted">—</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {orders.length === 0 && (
        <p className="px-4 py-10 text-center text-sm text-muted">
          No orders match the current filters.
        </p>
      )}
    </div>
  );
}
