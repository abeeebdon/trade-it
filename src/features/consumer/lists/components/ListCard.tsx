'use client';

import Link from 'next/link';
import { Trash, ShoppingCart } from 'lucide-react';
import type { ShoppingList } from '../types';

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
    <div className="helix-card p-5" data-testid={`list-${list.id}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-semibold text-[15px]">{list.name}</div>
          <div className="text-[11px] font-mono text-[#9CA3AF] mt-0.5">
            {list.item_count} item{list.item_count === 1 ? '' : 's'}
          </div>
        </div>
        <button
          onClick={() => onDelete(list.id)}
          className="text-[#9CA3AF] hover:text-[#E74C3C]"
          data-testid={`del-list-${list.id}`}
        >
          <Trash size={14} />
        </button>
      </div>
      {list.preview?.length ? (
        <div className="flex gap-2 mb-3">
          {list.preview.map((p) => (
            <img
              key={p.id}
              src={p.photos?.[0]}
              alt=""
              className="w-12 h-12 object-cover rounded"
            />
          ))}
        </div>
      ) : (
        <div className="text-[12px] text-[#9CA3AF] italic mb-3">
          Empty list —{' '}
          <Link href="/?beta=1" className="text-[#C9922A] hover:underline">
            browse to add items
          </Link>
        </div>
      )}
      <button
        onClick={() => onAddAllToCart?.(list.id)}
        disabled={list.item_count === 0 || addingToCart}
        className="helix-btn-secondary text-[12px] w-full py-2 inline-flex items-center justify-center gap-1.5"
        data-testid={`add-cart-${list.id}`}
      >
        <ShoppingCart size={14} />
        {addingToCart ? 'Adding…' : 'Add all to cart'}
      </button>
    </div>
  );
}
