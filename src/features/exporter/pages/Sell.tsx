'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import {
  Plus,
  Truck,
  Store,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { formatUSD } from '@/lib/func';
import { RootState } from '@/store/store';
import { useHeader } from '@/context/HeaderContext';
import { StatusPill } from '@/features/shops/components/StatusPill';
import ListingForm from '../components/ListingForm';
import { useGetListings } from '../hooks/useListings';
import { PER_PAGE } from '@/lib/constants';

// Component

export default function Sell() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { setHeader } = useHeader();

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const isExporter = user?.role === 'exporter';

  const { data, isPending, isError } = useGetListings({
    pageNumber: page,
    pageSize: PER_PAGE,
  });

  const listings = data?.listings.data ?? [];
  const totalPages = data?.listings.totalPages ?? 1;

  // Notice text — prefer API value, fall back to static copy
  const notice =
    data?.notice ??
    (isExporter
      ? 'Riby Inc is Delivery Partner of Record for all listings you create here. Consumers pay Helix; you receive USD net of fees; Riby handles US customs & last-mile delivery.'
      : 'Listings here sell your US-stocked inventory to consumers with 48-hour delivery.');

  const editingListing = listings.find((l) => l.id === editing) ?? null;

  //  Header
  useEffect(() => {
    setHeader({
      title: data?.sectionTitle ?? 'Direct-to-Consumer Listings',
      kicker: isExporter
        ? 'Exporter · Sell DTC with Riby of Record'
        : 'Buyer · Sell from local inventory',
      action: (
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="helix-btn-primary inline-flex items-center gap-2"
          data-testid="create-listing-btn"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">New listing</span>
          <span className="sm:hidden">New</span>
        </button>
      ),
    });

    return () => {
      setHeader(null);
    };
  }, [isExporter, data?.sectionTitle, setHeader]);

  // Loading
  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="helix-card p-5 h-20 animate-pulse opacity-40" />
        <div className="helix-card overflow-hidden">
          <div className="p-5 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-14 bg-[#1A7A6E]/10 rounded animate-pulse opacity-40"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────

  if (isError) {
    return (
      <div className="helix-card p-10 text-center text-[#9CA3AF] text-sm">
        Failed to load listings. Please refresh.
      </div>
    );
  }

  return (
    <>
      {/* INFO BANNER */}
      <div className="helix-card p-4 sm:p-5 mb-6 border-[#C9922A]/30 bg-[#C9922A]/5">
        <div className="flex items-start gap-3">
          {isExporter ? (
            <Truck size={22} className="text-[#C9922A] shrink-0" />
          ) : (
            <Store size={22} className="text-[#1A7A6E] shrink-0" />
          )}
          <p className="text-[13px] sm:text-sm text-[#F5F5F5] leading-relaxed">
            {notice}
          </p>
        </div>
      </div>

      {/* STATS ROW */}
      {data && (data.totalListings > 0 || data.activeListings > 0) && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="helix-card p-4 text-center">
            <div className="font-mono text-2xl font-bold text-text">
              {data.totalListings}
            </div>
            <div className="helix-label mt-1">Total</div>
          </div>
          <div className="helix-card p-4 text-center">
            <div className="font-mono text-2xl font-bold text-[#1A7A6E]">
              {data.activeListings}
            </div>
            <div className="helix-label mt-1">Active</div>
          </div>
          <div className="helix-card p-4 text-center">
            <div className="font-mono text-2xl font-bold text-[#C9922A]">
              {data.outOfStockListings}
            </div>
            <div className="helix-label mt-1">Out of Stock</div>
          </div>
        </div>
      )}

      {/* EMPTY */}
      {listings.length === 0 && (
        <div className="helix-card p-12 text-center text-[#9CA3AF]">
          No listings yet. Create your first listing to start selling.
          <div className="mt-4">
            <button
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
              className="helix-btn-primary inline-flex items-center gap-2"
            >
              <Plus size={14} /> New listing
            </button>
          </div>
        </div>
      )}

      {listings.length > 0 && (
        <>
          {/* MOBILE */}
          <div className="grid gap-4 lg:hidden">
            {listings.map((l) => (
              <div key={l.id} className="helix-card p-4 space-y-4">
                <div className="flex gap-4">
                  {l.photos?.[0] ? (
                    <Image
                      src={l.photos[0]}
                      alt={l.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                      unoptimized
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-[#1A7A6E]/10 flex items-center justify-center text-[10px] font-mono shrink-0">
                      NO IMG
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm truncate">
                      {l.title}
                    </h3>
                    <p className="text-xs text-[#9CA3AF] mt-1">{l.category}</p>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <StatusPill status={l.status} />
                      <span
                        className={`helix-status ${
                          l.fulfillment_mode === 'riby_dtc'
                            ? 'helix-status-gold'
                            : 'helix-status-ok'
                        }`}
                      >
                        {l.fulfillment_mode === 'riby_dtc'
                          ? 'DTC · RIBY'
                          : 'LOCAL · 48HR'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Price</p>
                    <p className="font-semibold font-mono">
                      {formatUSD(l.retail_price_usd)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#9CA3AF]">Stock</p>
                    <p className="font-semibold font-mono">{l.stock_qty}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setEditing(l.id);
                    setOpen(true);
                  }}
                  className="helix-btn-secondary w-full inline-flex items-center justify-center gap-2"
                >
                  <Pencil size={15} />
                  Edit
                </button>
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:block helix-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="helix-table min-w-full">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Mode</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((l) => (
                    <tr key={l.id}>
                      <td>
                        {l.photos?.[0] ? (
                          <Image
                            src={l.photos[0]}
                            alt={l.title}
                            width={56}
                            height={56}
                            className="w-14 h-14 rounded object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-14 h-14 rounded bg-[#1A7A6E]/10 flex items-center justify-center text-[10px] font-mono">
                            NO IMG
                          </div>
                        )}
                      </td>
                      <td className="max-w-[200px] truncate">{l.title}</td>
                      <td className="text-[13px] text-[#9CA3AF]">
                        {l.category}
                      </td>
                      <td className="font-mono">
                        {formatUSD(l.retail_price_usd)}
                      </td>
                      <td className="font-mono">{l.stock_qty}</td>
                      <td>
                        <span
                          className={`helix-status ${
                            l.fulfillment_mode === 'riby_dtc'
                              ? 'helix-status-gold'
                              : 'helix-status-ok'
                          }`}
                        >
                          {l.fulfillment_mode === 'riby_dtc'
                            ? 'DTC · RIBY'
                            : 'LOCAL · 48HR'}
                        </span>
                      </td>
                      <td>
                        <StatusPill status={l.status} />
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setEditing(l.id);
                            setOpen(true);
                          }}
                          className="text-[#1A7A6E] hover:text-[#C9922A] transition"
                        >
                          <Pencil size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 px-5 py-4 border-t border-[#1A7A6E]/15">
                <button
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  className="p-2 rounded border border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E] hover:text-[#F5F5F5] disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-8 h-8 rounded text-[12px] font-mono border transition ${
                        n === page
                          ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A] font-bold'
                          : 'bg-transparent text-[#9CA3AF] border-[#1A7A6E]/40 hover:border-[#1A7A6E] hover:text-[#F5F5F5]'
                      }`}
                    >
                      {n}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={page === totalPages}
                  className="p-2 rounded border border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E] hover:text-[#F5F5F5] disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* MODAL */}
      <ListingForm
        open={open}
        isExporter={isExporter}
        editing={editingListing}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={() => {
          setOpen(false);
          setEditing(null);
        }}
      />
    </>
  );
}
