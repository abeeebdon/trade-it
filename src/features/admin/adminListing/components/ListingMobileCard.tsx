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
    <div className="helix-card p-4 block hover:border-primary/30 transition-colors">
      <Link href={`/admin/listings/${listing.id}`} className="block">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[15px] font-semibold text-text">
              {listing.title}
            </h3>
            <p className="text-[12px] text-muted mt-0.5">
              #{listing.id} · {categoryLabel(listing.category)}
            </p>
          </div>
          <StatusPill status={listing.status} />
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-mono text-primary font-semibold">
            {formatUSD(listing.retailPriceUsd)}
          </span>
          <span className="text-[13px] text-muted">
            Stock: {listing.stockQty}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2 text-[12px] text-muted">
          <span>{listing.sellerEmail}</span>
          <span>{formatDateTime(listing.createdAt)}</span>
        </div>
      </Link>

      {/* Mobile actions */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-border">
        {listing.status.toLowerCase() === 'draft' && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onModerate(listing);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-success/30 text-success text-[12px] font-medium hover:bg-success/10 transition-colors"
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
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-danger/30 text-danger text-[12px] font-medium hover:bg-danger/10 transition-colors"
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
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-success/30 text-success text-[12px] font-medium hover:bg-success/10 transition-colors"
          >
            <ShieldCheck size={14} />
            Activate
          </button>
        )}
      </div>
    </div>
  );
}
