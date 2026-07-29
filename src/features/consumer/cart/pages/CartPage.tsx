'use client';

import { useMemo, useCallback, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { formatUSD } from '@/lib/func';

type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  photo: string;
};

const CART_KEY = 'jomp_cart';

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]') as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('jomp-cart-updated'));
}

// Simple external store backed by localStorage + event

function cartStoreSubscribe(cb: () => void) {
  const onUpdate = () => cb();
  window.addEventListener('jomp-cart-updated', onUpdate);
  return () => window.removeEventListener('jomp-cart-updated', onUpdate);
}

let cachedRaw = '';
let cachedSnapshot: CartItem[] = [];

function cartStoreSnapshot(): CartItem[] {
  const raw =
    typeof window !== 'undefined'
      ? localStorage.getItem(CART_KEY) || '[]'
      : '[]';
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  try {
    cachedSnapshot = JSON.parse(raw) as CartItem[];
  } catch {
    cachedSnapshot = [];
  }
  return cachedSnapshot;
}

export default function CartPage() {
  const items = useSyncExternalStore(cartStoreSubscribe, cartStoreSnapshot);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  );

  const updateQty = useCallback((id: string, delta: number) => {
    const cart = loadCart();
    const next = cart
      .map((i) => {
        if (i.id !== id) return i;
        const newQty = i.qty + delta;
        return newQty < 1 ? null : { ...i, qty: newQty };
      })
      .filter(Boolean) as CartItem[];
    saveCart(next);
  }, []);

  const removeItem = useCallback((id: string, title: string) => {
    const cart = loadCart();
    const next = cart.filter((i) => i.id !== id);
    saveCart(next);
    toast.success(`${title} removed from cart`);
  }, []);

  const clearCart = useCallback(() => {
    saveCart([]);
    toast.success('Cart cleared');
  }, []);

  if (items.length === 0) {
    return (
      <div className="helix-card p-6 sm:p-12 text-center">
        <div className="mx-auto rounded-full bg-[#1A7A6E]/10 flex items-center justify-center mb-4">
          <ShoppingBag size={24} className="sm:size-7 text-[#1A7A6E]" />
        </div>
        <h2 className="helix-h3 mb-2">Your cart is empty</h2>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mb-6 max-w-sm mx-auto">
          Looks like you haven&apos;t added any products yet. Browse the
          marketplace to find what you need.
        </p>
        <Link
          href="/shop"
          className="helix-btn-primary inline-flex items-center gap-2 text-sm"
        >
          <ShoppingBag size={14} /> Browse marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className=" grid lg:grid-cols-3 gap-6 lg:gap-8">
      {/* ── Cart Items ─────────────────────────────────── */}
      <div className="lg:col-span-2 space-y-4">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <h2 className="helix-h3 text-lg sm:text-2xl">
            Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h2>
          <button
            onClick={clearCart}
            className="text-xs text-[#E74C3C] hover:underline shrink-0"
          >
            Clear all
          </button>
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className="helix-card flex  flex-col lg:flex-row gap-3 sm:gap-4 p-3 sm:p-4"
          >
            <div className="flex gap-3 sm:gap-4 items-center w-full sm:w-auto sm:flex-1 min-w-0">
              {/* Photo */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-[#1A7A6E]/10">
                {item.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- cart photos may come from arbitrary hosts
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#9CA3AF] text-[10px]">
                    NO IMG
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-medium truncate">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-[13px] text-[#9CA3AF] font-mono mt-0.5">
                  {formatUSD(item.price)}
                </p>
              </div>
            </div>

            <article className="flex items-center  justify-end gap-3 sm:gap-4">
              <section className="flex items-center gap-1">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  disabled={item.qty <= 1}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-[#1A7A6E]/20 flex items-center justify-center text-[#1A7A6E] hover:bg-[#1A7A6E]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 sm:w-10 text-center text-sm font-mono tabular-nums">
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-[#1A7A6E]/20 flex items-center justify-center text-[#1A7A6E] hover:bg-[#1A7A6E]/10 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </section>

              <span className="text-right text-sm font-mono font-medium tabular-nums">
                {formatUSD(item.price * item.qty)}
              </span>

              <button
                onClick={() => removeItem(item.id, item.title)}
                className="text-muted hover:text-[#E74C3C] transition-colors p-1  shrink-0"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </article>
          </div>
        ))}
      </div>

      <div className="lg:col-span-1">
        <div className="helix-card p-4 sm:p-6 lg:sticky lg:top-24">
          <h3 className="helix-h3 mb-4 text-lg sm:text-2xl">Order Summary</h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span className="font-mono font-medium">
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

            <hr className="border-[#1A7A6E]/15" />

            <div className="flex justify-between text-sm sm:text-base font-semibold">
              <span>Estimated Total</span>
              <span className="font-mono">{formatUSD(subtotal)}</span>
            </div>
          </div>

          <button className="helix-btn-primary w-full mt-6 inline-flex items-center justify-center gap-2 text-sm">
            Proceed to checkout <ArrowRight size={16} />
          </button>

          <Link
            href="/shop"
            className="block text-center text-xs text-[#1A7A6E] hover:text-[#C9922A] mt-3 transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
