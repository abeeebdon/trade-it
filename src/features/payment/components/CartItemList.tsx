'use client';

import { CartItemDto } from '@/features/consumer/cart/types/cart';
import CartItemCard from './CartItemCard';
interface CartItemListProps {
  items: CartItemDto[];
}

const CartItemList = ({ items }: CartItemListProps) => {
  return (
    <article className="helix-card p-6">
      <h2 className="helix-h3 mb-4">Cart Items ({items.length})</h2>
      <section className="divide-y divide-border">
        {items.map((item) => {
          return <CartItemCard item={item} key={item.cartItemId} />;
        })}
      </section>
    </article>
  );
};

export default CartItemList;
