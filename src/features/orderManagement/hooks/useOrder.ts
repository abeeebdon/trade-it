// hooks/useOrder.ts
// One fetch hook, parameterized by API base path, reused by all three
// screens. Keeps the data-loading logic in one place while each role's
// route (/api/vendor/orders, /api/admin/orders, /api/consumer/orders)
// stays fully separate on the backend.

import { useEffect, useState } from 'react';
import { OrderStatus } from '@/features/orderManagement/lib/orderStatus';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  consumerName: string;
  vendorName: string;
  createdAt: string;
}

export function useOrder(apiBasePath: string, orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiBasePath}/${orderId}`);
        if (!res.ok) throw new Error("Couldn't load this order.");
        const data = await res.json();
        if (!cancelled) setOrder(data);
      } catch (err) {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : 'Something went wrong.',
          );
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [apiBasePath, orderId]);

  return { order, setOrder, isLoading, error };
}
