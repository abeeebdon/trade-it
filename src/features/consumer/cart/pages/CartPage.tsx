'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { formatUSD } from '@/lib/func';
import { useAppSelector, useAppDispatch } from '@/hooks/store/store';
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  CartItem,
} from '@/store/cart/cart.slice';

export default function CartPage() {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.priceUsd * i.quantity, 0),
    [items],
  );

  const updateQty = (productId: number, newQty: number) => {
    if (newQty < 1) return;
    dispatch(updateCartItemQuantity({ productId, quantity: newQty }));
  };

  const removeItem = (productId: number, productName: string) => {
    dispatch(removeFromCart(productId));
    toast.success(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  if (items.length === 0) {
    return (
      <div className="helix-card p-6 sm:p-12 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
          <ShoppingBag size={24} className="sm:size-7 text-secondary" />
        </div>
        <h2 className="helix-h3 mb-2">Your cart is empty</h2>
        <p className="text-xs sm:text-sm text-muted mb-6 max-w-sm mx-auto">
          Looks like you haven&apos;t added any products yet. Browse the
          marketplace to find what you need.
        </p>
        <Link
          href="/"
          className="helix-btn-primary inline-flex items-center gap-2 text-sm"
        >
          <ShoppingBag size={14} /> Browse marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
      {/* ── Cart Items ─────────────────────────────────── */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="helix-h3 text-lg sm:text-2xl">
            Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h2>
          <button
            onClick={handleClearCart}
            className="text-xs text-danger hover:underline shrink-0"
          >
            Clear all
          </button>
        </div>

        {items.map((item: CartItem) => (
          <div
            key={item.productId}
            className="helix-card flex flex-col lg:flex-row gap-3 sm:gap-4 p-3 sm:p-4"
          >
            <div className="flex gap-3 sm:gap-4 items-center w-full sm:w-auto sm:flex-1 min-w-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-secondary/10">
                {item.thumbnailImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.thumbnailImage}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted text-[10px]">
                    NO IMG
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-medium text-text truncate">
                  {item.productName}
                </h3>
                <p className="text-[11px] sm:text-[13px] text-muted font-mono mt-0.5">
                  {formatUSD(item.priceUsd)}
                </p>
              </div>
            </div>

            <article className="flex items-center justify-end gap-3 sm:gap-4">
              <section className="flex items-center gap-1">
                <button
                  onClick={() => updateQty(item.productId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-secondary/20 flex items-center justify-center text-secondary hover:bg-secondary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 sm:w-10 text-center text-sm font-mono tabular-nums text-text">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQty(item.productId, item.quantity + 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-secondary/20 flex items-center justify-center text-secondary hover:bg-secondary/10 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </section>

              <span className="text-right text-sm font-mono font-medium tabular-nums text-text">
                {formatUSD(item.priceUsd * item.quantity)}
              </span>

              <button
                onClick={() => removeItem(item.productId, item.productName)}
                className="text-muted hover:text-danger transition-colors p-1 shrink-0"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </article>
          </div>
        ))}
      </div>

      {/* ── Order Summary ─────────────────────────────── */}
      <div className="lg:col-span-1">
        <div className="helix-card p-4 sm:p-6 lg:sticky lg:top-24">
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
              <span className="text-muted text-right">
                Calculated at checkout
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted shrink-0">Tax</span>
              <span className="text-muted text-right">
                Calculated at checkout
              </span>
            </div>

            <hr className="border-border" />

            <div className="flex justify-between text-sm sm:text-base font-semibold">
              <span className="text-text">Estimated Total</span>
              <span className="font-mono text-primary">
                {formatUSD(subtotal)}
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
        </div>
      </div>
    </div>
  );
}
