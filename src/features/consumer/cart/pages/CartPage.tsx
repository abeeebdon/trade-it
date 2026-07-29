'use client';

import { useMemo, useCallback, useSyncExternalStore } from 'react';
import Image from 'next/image';
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

function cartStoreSnapshot(): CartItem[] {
  return loadCart();
}

// ── Component ────────────────────────────────────────────

export default function CartPage() {
  const items = useSyncExternalStore(cartStoreSubscribe, cartStoreSnapshot);

  // ── Derived ──────────────────────────────────────────

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  );

  // ── Actions ──────────────────────────────────────────

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

  // ── Empty state ──────────────────────────────────────

  if (items.length === 0) {
    return (
      <div className="helix-card p-12 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#1A7A6E]/10 flex items-center justify-center mb-4">
          <ShoppingBag size={28} className="text-[#1A7A6E]" />
        </div>
        <h2 className="helix-h3 mb-2">Your cart is empty</h2>
        <p className="text-sm text-[#9CA3AF] mb-6 max-w-sm mx-auto">
          Looks like you haven&apos;t added any products yet. Browse the
          marketplace to find what you need.
        </p>
        <Link
          href="/shop"
          className="helix-btn-primary inline-flex items-center gap-2"
        >
          <ShoppingBag size={14} /> Browse marketplace
        </Link>
      </div>
    );
  }

  // ── Cart with items ──────────────────────────────────

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* ── Cart Items ─────────────────────────────────── */}
      <div className="lg:col-span-2 space-y-4">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <h2 className="helix-h3">
            Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h2>
          <button
            onClick={clearCart}
            className="text-xs text-[#E74C3C] hover:underline"
          >
            Clear all
          </button>
        </div>

        {items.map((item) => (
          <div key={item.id} className="helix-card flex gap-4 p-4 items-center">
            {/* Photo */}
            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#1A7A6E]/10">
              {item.photo ? (
                <Image
                  src={item.photo}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#9CA3AF] text-[10px]">
                  NO IMG
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium truncate">{item.title}</h3>
              <p className="text-[13px] text-[#9CA3AF] font-mono mt-0.5">
                {formatUSD(item.price)}
              </p>
            </div>

            {/* Qty controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateQty(item.id, -1)}
                disabled={item.qty <= 1}
                className="w-8 h-8 rounded border border-[#1A7A6E]/20 flex items-center justify-center text-[#1A7A6E] hover:bg-[#1A7A6E]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-mono tabular-nums">
                {item.qty}
              </span>
              <button
                onClick={() => updateQty(item.id, 1)}
                className="w-8 h-8 rounded border border-[#1A7A6E]/20 flex items-center justify-center text-[#1A7A6E] hover:bg-[#1A7A6E]/10 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Line total */}
            <span className="w-24 text-right text-sm font-mono font-medium tabular-nums hidden sm:block">
              {formatUSD(item.price * item.qty)}
            </span>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.id, item.title)}
              className="text-[#9CA3AF] hover:text-[#E74C3C] transition-colors p-1"
              title="Remove"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* ── Summary sidebar ────────────────────────────── */}
      <div className="lg:col-span-1">
        <div className="helix-card p-6 sticky top-24">
          <h3 className="helix-h3 mb-4">Order Summary</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Subtotal</span>
              <span className="font-mono font-medium">
                {formatUSD(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Shipping</span>
              <span className="text-[#9CA3AF]">Calculated at checkout</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Tax</span>
              <span className="text-[#9CA3AF]">Calculated at checkout</span>
            </div>

            <hr className="border-[#1A7A6E]/15" />

            <div className="flex justify-between text-base font-semibold">
              <span>Estimated Total</span>
              <span className="font-mono">{formatUSD(subtotal)}</span>
            </div>
          </div>

          <button className="helix-btn-primary w-full mt-6 inline-flex items-center justify-center gap-2">
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
