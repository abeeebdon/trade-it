'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Archive } from 'lucide-react';
import { useGetAdminListings } from '../hooks/useGetAdminListings';
import { AdminListing } from '../types/listings';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatUSD } from '@/lib/func';
import Pagination, { paginate } from '@/components/ui/Pagination';
import SelectDropDown from '@/components/SelectDropDown';
import {
  ListingRowSkeleton,
  ListingCardSkeleton,
  FilterBarSkeleton,
} from '../components/ListingsSkeleton';
import { ListingsError } from '../components/ListingsError';
import { ListingsEmpty } from '../components/ListingsEmpty';
import ModerateListingModal from '../components/ModerateListingModal';
import ListingMobileCard from '../components/ListingMobileCard';
import FilterBar, { StatusFilter } from '../components/FilterBar';
import { categoryLabel } from '../utils';

// ── Main Page ──────────────────────────────────────────
const AdminListings = () => {
  const [status, setStatus] = useState<StatusFilter>('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [moderateTarget, setModerateTarget] = useState<AdminListing | null>(
    null,
  );

  const { data, isPending, isError, refetch } = useGetAdminListings({
    status: status || undefined,
  });

  const listings: AdminListing[] = useMemo(() => data ?? [], [data]);

  const { items, totalPages } = paginate(listings, page, pageSize);
  const totalRecords = listings.length;

  // ── Loading ────────────────────────────────────────
  if (isPending) {
    return (
      <div className="space-y-6">
        <FilterBarSkeleton />

        {/* Desktop skeleton */}
        <div className="hidden md:block helix-card overflow-hidden">
          <table className="helix-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <ListingRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile skeleton */}
        <div className="md:hidden space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────
  if (isError) {
    return <ListingsError onRetry={() => refetch()} />;
  }

  // ── Empty ──────────────────────────────────────────
  if (listings.length === 0) {
    return (
      <div className="space-y-6">
        <FilterBar
          status={status}
          onStatusChange={(s) => {
            setStatus(s);
            setPage(1);
          }}
        />
        <ListingsEmpty />
      </div>
    );
  }

  // ── Data ───────────────────────────────────────────
  return (
    <div className="space-y-6">
      <FilterBar
        status={status}
        onStatusChange={(s) => {
          setStatus(s);
          setPage(1);
        }}
      />

      {/* Desktop table */}
      <div className="hidden md:block helix-card overflow-hidden">
        <table className="helix-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((listing) => (
              <tr
                key={listing.id}
                className="cursor-pointer hover:bg-[#C9922A]/5 transition-colors"
              >
                <td className="font-mono text-[13px] text-[#9CA3AF]">
                  <p className="block">#{listing.id}</p>
                </td>
                <td>
                  <p className="block font-medium text-[#F5F5F5] hover:text-[#C9922A] transition-colors">
                    {listing.title}
                  </p>
                </td>
                <td className="text-[13px] text-[#9CA3AF]">
                  <Link
                    href={`/admin/listings/${listing.id}`}
                    className="block"
                  >
                    {categoryLabel(listing.category)}
                  </Link>
                </td>
                <td className="text-[13px]">
                  <Link
                    href={`/admin/listings/${listing.id}`}
                    className="block"
                  >
                    {listing.sellerEmail}
                  </Link>
                </td>
                <td className="font-mono text-[#C9922A]">
                  <Link
                    href={`/admin/listings/${listing.id}`}
                    className="block"
                  >
                    {formatUSD(listing.retailPriceUsd)}
                  </Link>
                </td>
                <td>
                  <Link
                    href={`/admin/listings/${listing.id}`}
                    className="block"
                  >
                    {listing.stockQty}
                  </Link>
                </td>
                <td>
                  <Link
                    href={`/admin/listings/${listing.id}`}
                    className="block"
                  >
                    <StatusPill status={listing.status} />
                  </Link>
                </td>
                <td>
                  <div className="flex items-center gap-1.5">
                    {listing.status.toLowerCase() === 'draft' && (
                      <button
                        type="button"
                        onClick={() => setModerateTarget(listing)}
                        title="Activate"
                        className="p-1.5 rounded-lg border border-[#22C55E]/30 text-[#22C55E] hover:bg-[#22C55E]/10 transition-colors"
                      >
                        <ShieldCheck size={15} />
                      </button>
                    )}
                    {listing.status.toLowerCase() === 'active' && (
                      <button
                        type="button"
                        onClick={() => setModerateTarget(listing)}
                        title="Archive"
                        className="p-1.5 rounded-lg border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                      >
                        <Archive size={15} />
                      </button>
                    )}
                    {listing.status.toLowerCase() === 'archived' && (
                      <button
                        type="button"
                        onClick={() => setModerateTarget(listing)}
                        title="Activate"
                        className="p-1.5 rounded-lg border border-[#22C55E]/30 text-[#22C55E] hover:bg-[#22C55E]/10 transition-colors"
                      >
                        <ShieldCheck size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {items.map((listing) => (
          <ListingMobileCard
            key={listing.id}
            listing={listing}
            onModerate={setModerateTarget}
          />
        ))}
      </div>

      {/* Pagination + page size */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
          <span>
            Total records:{' '}
            <strong className="text-[#F5F5F5]">{totalRecords}</strong>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          <SelectDropDown
            pageNum={pageSize}
            setPageNum={(n) => {
              setPageSize(n);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Moderate modal */}
      {moderateTarget && (
        <ModerateListingModal
          listingId={moderateTarget.id}
          listingTitle={moderateTarget.title}
          currentStatus={moderateTarget.status}
          onClose={() => setModerateTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminListings;
