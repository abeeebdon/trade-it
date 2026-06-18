import { formatUSD } from '@/lib/func';
import Image from 'next/image';
import Link from 'next/link';
import { Store, Truck } from 'lucide-react';
import { Product } from '@/features/landingPage/types/home';

// const FALLBACK_IMG =
// 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=80';

export default function ListingCard({ l }: { l: Product }) {
  // const isDtc = l.fulfillment_mode === 'riby_dtc';
  console.log(l);
  return (
    <Link
      href={`/shop/product/${l.id}`}
      className="helix-card group overflow-hidden flex flex-col"
    >
      <div className="aspect-3/2 relative overflow-hidden">
        <Image
          src={l.thumbnailImage}
          width={150}
          height={100}
          alt={l.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* {l.} */}
        {/* <div className=" absolute top-2 left-2 ">
          {isDtc ? (
            <span className="helix-status helix-status-gold">
              <Truck size={20} /> Direct · Riby of Record
            </span>
          ) : (
            <span className="helix-status helix-status-ok">
              <Store size={20} /> US · 48hr
            </span>
          )}
        </div> */}
      </div>
      <article className="p-4 flex-1  flex flex-col">
        <p className="text-[10px] font-mono uppercase tracking-wider text-[#1A7A6E]">
          {l.category.replace('-', ' ')}
        </p>
        <p className="helix-h3 mt-1 line-clamp-2 text-[15px]">
          {l.productName}
        </p>
        <div className="mt-auto pt-2 flex items-end justify-between">
          <div>
            <p className="font-mono text-xl text-[#C9922A] font-bold">
              {formatUSD(l.priceUsd)}
            </p>
            <p className="text-[10px] text-[#9CA3AF] font-mono uppercase tracking-wider">
              {/* {l.seller_name} */}
            </p>
          </div>
          <div className="text-right text-[10px] text-[#9CA3AF]">
            {l.unit > 5 ? (
              <span className="text-[#1A7A6E]">In stock</span>
            ) : (
              <span className="text-[#C9922A]">Only {l.unit} left</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
