'use client';

import { AdminOrder } from '../../types/orders';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateToMM, formatUSD } from '@/lib/func';
import { categoryLabel } from './orders.utils';

export function OrdersTable({ orders }: { orders: AdminOrder[] }) {
  return (
    <div className="hidden md:block helix-card overflow-hidden">
      <table className="helix-table">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="cursor-pointer hover:bg-[#C9922A]/5 transition-colors"
            >
              <td className="font-mono text-[13px] text-[#C9922A]">
                {order.orderNumber}
              </td>

              <td>{order.quantity}</td>
              <td className="font-mono text-[#C9922A]">
                {formatUSD(order.amount)}
              </td>
              <td>
                <StatusPill status={order.status} />
              </td>
              <td>
                <StatusPill status={order.paymentStatus} />
              </td>
              <td className="text-[13px] text-[#9CA3AF]">
                {formatDateToMM(order.deliveryDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
