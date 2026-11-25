'use client';

import type { AdminOrder } from '@/features/admin/types/orders';

type OrderDStatsProps = {
  orders: AdminOrder[];
};

type Stat = {
  label: string;
  value: string | number;
};

export default function OrderDStats({ orders }: OrderDStatsProps) {
  const orderCount = orders.length;

  const stats: Stat[] = [
    {
      label: 'Orders',
      value: orderCount.toLocaleString(),
    },
    {
      label: 'Orders Pending',
      value: '10',
    },
    {
      label: 'Orders fulfilled',
      value: '10',
    },
    {
      label: 'Orders delivered',
      value: '10',
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
        </div>
      ))}
    </div>
  );
}
