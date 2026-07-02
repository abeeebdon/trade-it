import { formatNGN, formatUSD } from '@/lib/func';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCardPRops } from '../types/exporter';

export default function ProductCard({ p }: ProductCardPRops) {
  return (
    <Link
      href={{
        pathname: 'product-details',
        query: { id: p.id },
      }}
      className="helix-card group overflow-hidden flex flex-col h-full"
    >
      <div className="relative w-full h-45 bg-[#0A1628] overflow-hidden">
        {p.thumbnailImage ? (
          <Image
            src={p.thumbnailImage}
            alt={p.productName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#1A7A6E] text-[11px] font-mono tracking-widest">
            NO IMAGE
          </div>
        )}

        {/* <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
          {p.compliance_badges?.slice(0, 2).map((b) => (
            <span key={b} className="helix-status helix-status-gold">
              {b}
            </span>
          ))}
        </div> */}

        {/* <div className="absolute bottom-3 right-3">
          {p.export_readiness_score >= 80 && (
            <span className="helix-status helix-status-ok flex items-center gap-1">
              <CheckCircle size={10} /> Export Ready
            </span>
          )}
        </div> */}
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
              {formatNGN(p.amountInNaira)}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">
              MOQ
            </div>
            <div className="font-mono text-[13px]">
              {p.moq} {p.unit}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
