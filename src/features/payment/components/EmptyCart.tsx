import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export const EmptyCart = () => (
  <article className="flex flex-col items-center justify-center gap-4 h-[60vh]">
    <ShoppingCart size={48} className="text-muted" />
    <h2 className="helix-h2 text-text">Your cart is empty</h2>
    <p className="text-muted text-sm">
      Looks like you haven&apos;t added anything yet.
    </p>
    <Link href="/" className="helix-btn-primary">
      Browse Products
    </Link>
  </article>
);
