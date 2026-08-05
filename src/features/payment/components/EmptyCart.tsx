'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import PressableBtn from '@/components/buttons/PressableBtn';

interface EmptyCartProps {
  onBrowse: () => void;
}

export const EmptyCart = ({ onBrowse }: EmptyCartProps) => (
  <article className="flex flex-col items-center justify-center gap-4 h-[60vh]">
    <ShoppingCart size={48} className="text-muted" />
    <h2 className="helix-h2 text-text">Your cart is empty</h2>
    <p className="text-muted text-sm">
      Looks like you haven&apos;t added anything yet.
    </p>
    <PressableBtn
      handleClick={onBrowse}
      title="Browse Products"
      className="helix-btn-primary"
    />
  </article>
);
