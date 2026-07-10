'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useGetAdminListings } from '../hooks/useGetAdminListings';
import { AdminListing } from '../types/listings';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateTime, formatUSD } from '@/lib/func';
import Pagination, { paginate } from '@/components/ui/Pagination';
import SelectDropDown from '@/components/SelectDropDown';
import {
  ListingRowSkeleton,
  ListingCardSkeleton,
  FilterBarSkeleton,
} from '../components/ListingsSkeleton';
import { ListingsError } from '../components/ListingsError';
import { ListingsEmpty } from '../components/ListingsEmpty';

// ── Helpers ────────────────────────────────────────────
const categoryLabel = (cat: string) =>
  cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// ── Mobile Card ────────────────────────────────────────
function ListingMobileCard({ listing }: { listing: AdminListing }) {
  return (
    <Link
      href={`/admin/listings/${listing.id}`}
      className="helix-card p-4 block hover:border-[#C9922A]/30 transition-colors"
    >
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
  );
}

// ── Filters ────────────────────────────────────────────
type StatusFilter = '' | 'Published' | 'Draft';

const statusFilters: [StatusFilter, string][] = [
  ['', 'All'],
  ['Published', 'Published'],
  ['Draft', 'Draft'],
];

// ── Filter Bar ─────────────────────────────────────────
function FilterBar({
  status,
  onStatusChange,
}: {
  status: StatusFilter;
  onStatusChange: (s: StatusFilter) => void;
}) {
  return (
    <div className="helix-card px-5 py-3 flex flex-wrap gap-2 items-center">
      <span className="text-[12px] text-[#9CA3AF] mr-1">Status:</span>
      {statusFilters.map(([value, label]) => (
        <button
          key={value}
          onClick={() => onStatusChange(value)}
          className={`px-3 py-1.5 rounded-full text-[12px] border transition-colors ${
            status === value
              ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]'
              : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E] hover:text-[#F5F5F5]'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────
const AdminListings = () => {
  const [status, setStatus] = useState<StatusFilter>('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
            </tr>
          </thead>
          <tbody>
            {items.map((listing) => (
              <tr
                key={listing.id}
                className="cursor-pointer hover:bg-[#C9922A]/5 transition-colors"
              >
                <td className="font-mono text-[13px] text-[#9CA3AF]">
                  <Link
                    href={`/admin/listings/${listing.id}`}
                    className="block"
                  >
                    #{listing.id}
                  </Link>
                </td>
                <td>
                  <Link
                    href={`/admin/listings/${listing.id}`}
                    className="block font-medium text-[#F5F5F5] hover:text-[#C9922A] transition-colors"
                  >
                    {listing.title}
                  </Link>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {items.map((listing) => (
          <ListingMobileCard key={listing.id} listing={listing} />
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
    </div>
  );
};

export default AdminListings;
