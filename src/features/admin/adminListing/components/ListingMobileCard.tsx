'use client';

import Link from 'next/link';
import { ShieldCheck, Archive } from 'lucide-react';
import { AdminListing } from '../types/listings';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateTime, formatUSD } from '@/lib/func';
import { categoryLabel } from '../utils';

interface ListingMobileCardProps {
  listing: AdminListing;
  onModerate: (listing: AdminListing) => void;
}

export default function ListingMobileCard({
  listing,
  onModerate,
}: ListingMobileCardProps) {
  return (
    <div className="helix-card p-4 block hover:border-[#C9922A]/30 transition-colors">
      <Link href={`/admin/listings/${listing.id}`} className="block">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[15px] font-semibold text-[#F5F5F5]">
              {listing.title}
            </h3>
            <p className="text-[12px] text-[#9CA3AF] mt-0.5">
              #{listing.id} · {categoryLabel(listing.category)}
            </p>
          </div>
          <StatusPill status={listing.status} />
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-mono text-[#C9922A] font-semibold">
            {formatUSD(listing.retailPriceUsd)}
          </span>
          <span className="text-[13px] text-[#9CA3AF]">
            Stock: {listing.stockQty}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2 text-[12px] text-[#6B7280]">
          <span>{listing.sellerEmail}</span>
          <span>{formatDateTime(listing.createdAt)}</span>
        </div>
      </Link>

      {/* Mobile actions */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-[#1A7A6E]/15">
        {listing.status.toLowerCase() === 'draft' && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onModerate(listing);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#22C55E]/30 text-[#22C55E] text-[12px] font-medium hover:bg-[#22C55E]/10 transition-colors"
          >
            <ShieldCheck size={14} />
            Activate
          </button>
        )}
        {listing.status.toLowerCase() === 'active' && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onModerate(listing);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#EF4444]/30 text-[#EF4444] text-[12px] font-medium hover:bg-[#EF4444]/10 transition-colors"
          >
            <Archive size={14} />
            Archive
          </button>
        )}
        {listing.status.toLowerCase() === 'archived' && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onModerate(listing);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#22C55E]/30 text-[#22C55E] text-[12px] font-medium hover:bg-[#22C55E]/10 transition-colors"
          >
            <ShieldCheck size={14} />
            Activate
          </button>
        )}
      </div>
    </div>
  );
}
