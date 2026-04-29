import { formatUSD } from '@/lib/func';
import Image from 'next/image';
import Link from 'next/link';
import { Truck, Storefront } from '@phosphor-icons/react';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=80';
export type Listing = {
  id: string | number;
  title: string;
  category: string;
  photos?: string[];
  fulfillment_mode: 'riby_dtc' | string;
  retail_price_usd: number;
  seller_name: string;
  stock_qty: number;
};
export default function ListingCard({ l }: { l: Listing }) {
  const isDtc = l.fulfillment_mode === 'riby_dtc';
  const photo = l.photos?.[0] || FALLBACK_IMG;
  return (
    <Link
      href={`/shop/product/${l.id}`}
      data-testid={`listing-${l.id}`}
      className="helix-card group overflow-hidden flex flex-col"
    >
      <div className="aspect-4/3 relative overflow-hidden">
        <Image
          src={photo}
          alt={l.title}
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK_IMG)
              e.currentTarget.src = FALLBACK_IMG;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2">
          {isDtc ? (
            <span className="helix-status helix-status-gold">
              <Truck size={10} /> Direct · Riby of Record
            </span>
          ) : (
            <span className="helix-status helix-status-ok">
              <Storefront size={10} weight="fill" /> US · 48hr
            </span>
          )}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-[10px] font-mono uppercase tracking-wider text-[#1A7A6E]">
          {l.category.replace('-', ' ')}
        </div>
        <div className="helix-h3 mt-1 line-clamp-2 text-[15px]">{l.title}</div>
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            <div className="font-mono text-xl text-[#C9922A] font-bold">
              {formatUSD(l.retail_price_usd)}
            </div>
            <div className="text-[10px] text-[#9CA3AF] font-mono uppercase tracking-wider">
              {l.seller_name}
            </div>
          </div>
          <div className="text-right text-[10px] text-[#9CA3AF]">
            {l.stock_qty > 5 ? (
              <span className="text-[#1A7A6E]">In stock</span>
            ) : (
              <span className="text-[#C9922A]">Only {l.stock_qty} left</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
