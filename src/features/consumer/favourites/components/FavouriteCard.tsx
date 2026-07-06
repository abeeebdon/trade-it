'use client';

import { Trash } from 'lucide-react';
import { formatUSD } from '@/lib/func';
import type { FavouriteItem } from '../types';

interface FavouriteCardProps {
  item: FavouriteItem;
  onRemove: (id: string) => void;
  onAddToCart: (item: FavouriteItem) => void;
}

export default function FavouriteCard({
  item,
  onRemove,
  onAddToCart,
}: FavouriteCardProps) {
  return (
    <div
      className="helix-card overflow-hidden flex flex-col"
      data-testid={`fav-${item.id}`}
    >
      <div className="aspect-[4/3] relative">
        <img
          src={item.photos?.[0]}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 bg-[#0A1628]/85 rounded-full w-8 h-8 flex items-center justify-center text-[#E74C3C] hover:bg-[#0A1628]"
          data-testid={`unfav-${item.id}`}
        >
          <Trash size={14} />
        </button>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <div className="text-[13px] font-semibold leading-tight line-clamp-2">
          {item.title}
        </div>
        <div className="text-[10px] text-[#9CA3AF] font-mono uppercase tracking-wider mt-1 truncate">
          {item.seller_name || 'Verified'}
        </div>
        <div className="text-[15px] font-mono text-[#C9922A] mt-auto pt-3">
          {formatUSD(item.retail_price_usd)}
        </div>
        <button
          onClick={() => onAddToCart(item)}
          className="helix-btn-primary text-[12px] py-2 mt-2"
          data-testid={`cart-${item.id}`}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
