'use client';

import Link from 'next/link';
import { Trash, ShoppingCart, Eye } from 'lucide-react';
import type { ShoppingList } from '../types';
import Image from 'next/image';

interface ListCardProps {
  list: ShoppingList;
  onDelete: (id: string) => void;
  onAddAllToCart?: (id: string) => void;
  addingToCart?: boolean;
}

export default function ListCard({
  list,
  onDelete,
  onAddAllToCart,
  addingToCart,
}: ListCardProps) {
  return (
    <section className="helix-card p-5">
      <article className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-[15px]">{list.name}</p>
          <div className="text-[11px] font-mono text-[#9CA3AF] mt-0.5">
            {list.itemCount} item{list.itemCount === 1 ? '' : 's'}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={`/consumer/lists/details?id=${list.id}`}
            className="p-1.5 text-[#9CA3AF] hover:text-[#1A7A6E] transition-colors"
          >
            <Eye size={14} />
          </Link>
          <button
            onClick={() => onDelete(list.id)}
            className="p-1.5 text-[#9CA3AF] hover:text-[#E74C3C] transition-colors"
            data-testid={`del-list-${list.id}`}
          >
            <Trash size={14} />
          </button>
        </div>
      </article>
      {(list.items?.length ?? 0) > 0 ? (
        <div className="text-[12px] text-muted italic mb-3">
          <Link
            href={`/consumer/lists/details?id=${list.id}`}
            className="text-[#C9922A] hover:underline"
          >
            View items in list
          </Link>
        </div>
      ) : (
        <div className="text-[12px] text-muted italic mb-3">
          Empty list —{' '}
          <Link href="/?beta=1" className="text-primary hover:underline">
            browse to add items
          </Link>
        </div>
      )}
      <button
        onClick={() => onAddAllToCart?.(list.id)}
        disabled={list.itemCount === 0 || addingToCart}
        className="helix-btn-secondary text-[12px] w-full py-2 inline-flex items-center justify-center gap-1.5"
        data-testid={`add-cart-${list.id}`}
      >
        <ShoppingCart size={14} />
        {addingToCart ? 'Adding…' : 'Add all to cart'}
      </button>
    </section>
  );
}
