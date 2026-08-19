'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatUSD } from '@/lib/func';
import { useCart, useClearCart } from '../hooks/useCart';
import { PageLoading } from '@/components/loading';
import Loader from '@/components/buttons/Loader';
import { EmptyCart } from '@/features/payment/components/EmptyCart';
import WarningModal from '@/components/modals/WarningModal';
import CartItemList from '@/features/payment/components/CartItemList';

export default function CartPage() {
  const { data, isPending } = useCart();
  const { mutate: clearCart, isPending: isClearing } = useClearCart();
  const [showClearWarning, setShowClearWarning] = useState(false);

  const items = data?.items ?? [];
  const subtotal = data?.subtotal ?? 0;

  if (isPending) {
    return <PageLoading message="Loading your cart..." />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="grid lg:grid-cols-3 gap-6 lg:gap-8">
      <article className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="helix-h3 text-lg sm:text-2xl">
            Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h2>
          <button
            onClick={() => setShowClearWarning(true)}
            className="text-xs cursor-pointer text-danger hover:underline shrink-0"
          >
            {isClearing ? <Loader className="text-danger" /> : 'Clear all'}
          </button>
        </div>

        <CartItemList items={items} />
      </article>

      {/* ── Order Summary ─────────────────────────────── */}
      <section className="lg:col-span-1">
        <article className="helix-card p-4 sm:p-6 lg:sticky lg:top-24">
          <h3 className="helix-h3 mb-4 text-lg sm:text-2xl">Order Summary</h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span className="font-mono font-medium text-text">
                {formatUSD(subtotal)}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted shrink-0">Shipping</span>
              <span className="font-mono font-medium text-text">
                {formatUSD(data?.shipping ?? 0)}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted shrink-0">Tax</span>
              <span className="font-mono font-medium text-text">
                {formatUSD(data?.tax ?? 0)}
              </span>
            </div>

            <hr className="border-border" />

            <div className="flex justify-between text-sm sm:text-base font-semibold">
              <span className="text-text">Estimated Total</span>
              <span className="font-mono text-primary">
                {formatUSD(data?.total ?? 0)}
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="helix-btn-primary w-full mt-6 inline-flex items-center justify-center gap-2 text-sm"
          >
            Proceed to checkout <ArrowRight size={16} />
          </Link>

          <Link
            href="/shop"
            className="block text-center text-xs text-secondary hover:text-primary mt-3 transition-colors"
          >
            Continue shopping
          </Link>
        </article>
      </section>

      <WarningModal
        open={showClearWarning}
        onClose={() => setShowClearWarning(false)}
        onConfirm={() => {
          clearCart();
          setShowClearWarning(false);
        }}
        loading={isClearing}
        label="Clear cart?"
        btnText="Clear cart"
        text="Are you sure you want to remove all items from your cart? This action cannot be undone."
      />
    </section>
  );
}
