'use client';

import { Trash2, Minus, Plus } from 'lucide-react';
import { formatUSD } from '@/lib/func';
import {
  useRemoveFromCart,
  useUpdateCartItemQuantity,
} from '@/features/consumer/cart/hooks/useCart';
import { toast } from 'sonner';
import Image from 'next/image';
import Loader from '@/components/buttons/Loader';
import { CartItemDto } from '@/features/consumer/cart/types/cart';
interface CartItemListProps {
  items: CartItemDto[];
}

const CartItemList = ({ items }: CartItemListProps) => {
  const { mutate: updateQty, isPending: isUpdatingQty } =
    useUpdateCartItemQuantity();
  const { mutate: removeItem, isPending: isRemovingItem } = useRemoveFromCart();

  const handleQuantityChange = (cartItemId: number, newQty: number) => {
    if (newQty < 1) return;
    updateQty({ cartItemId, quantity: newQty });
  };

  const handleRemove = (cartItemId: number) => {
    removeItem(cartItemId);
    toast.info('Item removed from cart');
  };

  return (
    <article className="helix-card p-6">
      <h2 className="helix-h3 mb-4">Cart Items ({items.length})</h2>
      <div className="divide-y divide-border">
        {items.map((item) => (
          <div
            key={item.cartItemId}
            className="flex gap-4 py-4 first:pt-0 last:pb-0"
          >
            {/* Thumbnail */}
            <div className="w-20 h-20 rounded-md bg-secondary/10 shrink-0 overflow-hidden">
              {item.thumbnailImage ? (
                <Image
                  src={item.thumbnailImage}
                  alt={item.productName}
                  className="w-full h-full object-cover"
                  width={80}
                  height={80}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                  No img
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="helix-h3">{item.productName}</h3>

              {/* Quantity controls */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() =>
                    handleQuantityChange(item.cartItemId, item.quantity - 1)
                  }
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-secondary/20 flex items-center justify-center text-secondary hover:bg-secondary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  disabled={item.quantity <= 1 || isUpdatingQty}
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm w-6 text-center text-text">
                  {isUpdatingQty ? <Loader /> : item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleQuantityChange(item.cartItemId, item.quantity + 1)
                  }
                  className="w-7 h-7 rounded border border-secondary/30 flex items-center
                  justify-center text-muted hover:text-text transition-colors hover:bg-primary cursor-pointer"
                  disabled={isUpdatingQty}
                >
                  <Plus size={14} />
                </button>
              </div>

              <p className="font-mono text-primary text-sm mt-1">
                {formatUSD(item.price * item.quantity)}
              </p>
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() => handleRemove(item.cartItemId)}
              className="text-muted cursor-pointer hover:text-danger transition-colors self-start"
              title="Remove item"
            >
              {isRemovingItem ? (
                <Loader className="text-red-500" />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        ))}
      </div>
    </article>
  );
};

export default CartItemList;
