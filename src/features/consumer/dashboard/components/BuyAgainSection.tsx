'use client';

import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { formatUSD } from '@/lib/func';
import EmptyState from './EmptyState';
import type { Listing } from '../types';

interface BuyAgainSectionProps {
  items: Listing[];
}

const reorder = (listing: Listing) => {
  try {
    const cart = JSON.parse(localStorage.getItem('jomp_cart') || '[]') as {
      id: string;
      title: string;
      price: number;
      qty: number;
      photo: string;
    }[];
    const idx = cart.findIndex((x) => x.id === listing.id);
    if (idx >= 0) {
      cart[idx].qty += 1;
    } else {
      cart.push({
        id: listing.id,
        title: listing.title,
        price: listing.retail_price_usd,
        qty: 1,
        photo: listing.photos?.[0] ?? '',
      });
    }
    localStorage.setItem('jomp_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('jomp-cart-updated'));
    toast.success(`${listing.title} added to cart`);
  } catch {
    toast.error("Couldn't add to cart");
  }
};

export default function BuyAgainSection({ items }: BuyAgainSectionProps) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="helix-h3">Buy again</h2>
        <Link href="/" className="text-[12px] text-[#C9922A] hover:underline">
          Browse Marketplace →
        </Link>
      </div>
      {items?.length === 0 ? (
        <EmptyState
          title="Nothing to reorder yet"
          body="Once first order is delivered, we'll suggest reorders here."
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {items?.map((item) => (
            <div key={item.id} className="helix-card p-3 flex flex-col">
              <Image
                src={item.photos?.[0] ?? '/icons/ankara2.jpg'}
                alt={item.title}
                className="aspect-square object-cover rounded mb-2"
                width={200}
                height={200}
              />
              <div className="text-[12px] font-semibold leading-tight line-clamp-2 flex-1">
                {item.title}
              </div>
              <div className="text-[13px] font-mono text-[#C9922A] mt-2">
                {formatUSD(item.retail_price_usd)}
              </div>
              <button
                onClick={() => reorder(item)}
                className="mt-2 helix-btn-primary text-[11px] py-1.5"
              >
                Reorder
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
