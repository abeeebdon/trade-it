'use client';

import { formatUSD } from '@/lib/func';
import type { OrderDRecord } from '../types';

type OrderDStatsProps = {
  orders: OrderDRecord[];
};

type Stat = {
  label: string;
  value: string;
  progress: number;
};

const percent = (part: number, whole: number) =>
  whole === 0 ? 0 : Math.min(100, Math.round((part / whole) * 100));

export default function OrderDStats({ orders }: OrderDStatsProps) {
  const orderCount = orders.length;
  const itemsOrdered = orders.reduce((sum, order) => sum + order.items, 0);
  const fulfilled = orders.filter(
    (order) => order.fulfillmentStatus === 'Fulfilled',
  ).length;
  const delivered = orders.filter(
    (order) => order.deliveryStatus === 'Delivered',
  ).length;

  const stats: Stat[] = [
    {
      label: 'Orders',
      value: orderCount.toLocaleString(),
      progress: orderCount === 0 ? 0 : 100,
    },
    {
      label: 'Items ordered',
      value: itemsOrdered.toLocaleString(),
      progress: percent(itemsOrdered, orderCount * 3),
    },
    {
      // Real sales reversals come from the orders API; none in this demo set.
      label: 'Sales reversals',
      value: formatUSD(0),
      progress: 0,
    },
    {
      label: 'Orders fulfilled',
      value: fulfilled.toLocaleString(),
      progress: percent(fulfilled, orderCount),
    },
    {
      label: 'Orders delivered',
      value: delivered.toLocaleString(),
      progress: percent(delivered, orderCount),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="helix-card p-4">
          <p className="helix-label mb-0">{stat.label}</p>

          <p className="font-mono text-2xl font-bold text-text mt-2">
            {stat.value}
          </p>

          <div className="mt-3 h-1 w-full rounded-full bg-bg-soft overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${stat.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
