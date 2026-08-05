'use client';

import { Trash2, Minus, Plus } from 'lucide-react';
import { formatUSD } from '@/lib/func';
import type { CartItem } from '@/store/cart/cart.slice';

interface CartItemListProps {
  items: CartItem[];
  onQuantityChange: (productId: number, newQty: number) => void;
  onRemove: (productId: number) => void;
}

export const CartItemList = ({
  items,
  onQuantityChange,
  onRemove,
}: CartItemListProps) => (
  <article className="helix-card p-6">
    <h2 className="helix-h3 mb-4">Cart Items ({items.length})</h2>
    <div className="divide-y divide-border">
      {items.map((item) => (
        <div
          key={item.productId}
          className="flex gap-4 py-4 first:pt-0 last:pb-0"
        >
          {/* Thumbnail */}
          <div className="w-20 h-20 rounded-md bg-secondary/10 shrink-0 overflow-hidden">
            {item.thumbnailImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumbnailImage}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                No img
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-text text-sm truncate">
              {item.productName}
            </h3>
            <p className="text-xs text-muted mt-0.5">
              {item.description?.slice(0, 80)}
              {item.description && item.description.length > 80 ? '...' : ''}
            </p>

            {/* Quantity controls */}
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() =>
                  onQuantityChange(item.productId, item.quantity - 1)
                }
                className="w-7 h-7 rounded border border-secondary/30 flex items-center justify-center text-muted hover:text-text transition-colors"
                disabled={item.quantity <= 1}
              >
                <Minus size={14} />
              </button>
              <span className="text-sm w-6 text-center text-text">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  onQuantityChange(item.productId, item.quantity + 1)
                }
                className="w-7 h-7 rounded border border-secondary/30 flex items-center justify-center text-muted hover:text-text transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            <p className="font-mono text-primary text-sm mt-1">
              {formatUSD(item.priceUsd * item.quantity)}
            </p>
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={() => onRemove(item.productId)}
            className="text-muted hover:text-danger transition-colors self-start"
            title="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  </article>
);
