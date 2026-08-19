'use client';

import { formatUSD } from '@/lib/func';

interface OrderSummaryProps {
  subtotal: number;
  shippingFee: number;
  total: number;
}

export const OrderSummary = ({
  subtotal,
  shippingFee,
  total,
}: OrderSummaryProps) => (
  <article className="helix-card p-6">
    <h2 className="helix-h3 mb-4">Order Summary</h2>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-muted">
        <span>Subtotal</span>
        <span>{formatUSD(subtotal)}</span>
      </div>
      <div className="flex justify-between text-muted">
        <span>Shipping</span>
        <span>{formatUSD(shippingFee)}</span>
      </div>
      <hr className="border-border my-2" />
      <div className="flex justify-between font-semibold text-text text-base">
        <span>Total</span>
        <span className="text-primary">{formatUSD(total)}</span>
      </div>
    </div>
  </article>
);
