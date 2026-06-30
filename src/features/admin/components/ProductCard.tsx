import { formatNGN, formatUSD } from '@/lib/func';
import Image from 'next/image';
import Link from 'next/link';
import { MarketPlaceCardProps } from '../types/catalog';

export default function ProductCard({ p }: MarketPlaceCardProps) {
  return (
    <Link
      href={{
        pathname: 'productDetails',
        query: { id: p.id },
      }}
      className="helix-card group overflow-hidden flex flex-col"
    >
      <div className="aspect-4/ bg-[#0A1628] relative overflow-hidden">
        <Image
          width={200}
          height={200}
          src={p.thumbnailImage}
          alt={p.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
          {/* {p.compliance_badges?.slice(0, 2).map((b) => (
            <span key={b} className="helix-status helix-status-gold">
              {b}
            </span>
          ))} */}
        </div>
        <div className="absolute bottom-3 right-3">
          {/* {p.exportStatus >= 80 && (
            <span className="helix-status helix-status-ok">
              <CheckCircle size={10} /> Export Ready
            </span>
          )} */}
          {p.exportStatus}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#1A7A6E]">
          {p.category.replace('-', ' ')}
        </div>
        <div className="helix-h3 mt-1 line-clamp-2">{p.productName}</div>
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            <div className="font-mono text-xl text-[#C9922A] font-bold">
              {formatUSD(p.amountInUsd)}
            </div>
            <div className="text-[11px] text-[#9CA3AF] font-mono">
              {formatNGN(p.amountInNGN)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">
              MOQ
            </div>
            <div className="font-mono text-[13px]">
              {p.moq} {p.moq}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
