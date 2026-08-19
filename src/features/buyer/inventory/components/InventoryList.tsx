'use client';

import { Eye, Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ListingItem } from '../../types/buyers';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatUSD } from '@/lib/func';
import WarningModal from '@/components/modals/WarningModal';
import { useDeleteLocalListing } from '../hooks/useGetInventory';

// ── Helpers ──────────────────────────────────────────────

const STATUS_MAP: Record<number, string> = {
  1: 'active',
  2: 'draft',
  3: 'out_of_stock',
  4: 'archived',
};

const statusLabel = (id: number): string => STATUS_MAP[id] || 'pending';

// ── Props ────────────────────────────────────────────────

interface Props {
  items: ListingItem[];
  onEdit: (item: ListingItem) => void;
}

// ── Row sub-component ───────────────────────────────────

function InventoryRow({
  item,
  onEdit,
}: {
  item: ListingItem;
  onEdit: (item: ListingItem) => void;
}) {
  const [deleteTarget, setDeleteTarget] = useState<ListingItem | null>(null);
  const router = useRouter();

  const { mutateAsync: deleteListing, isPending: deleting } =
    useDeleteLocalListing(() => setDeleteTarget(null));
  console.log(item);
  return (
    <>
      {/* ── Table row (md+) ──────────────────────────── */}
      <tr key={item.id} className="hidden md:table-row">
        <td className="max-w-xs truncate">{item.title}</td>
        <td className="text-[12px] text-muted">{item.category}</td>
        <td className="font-mono">{formatUSD(item.retailPriceUsd)}</td>
        <td className="font-mono">{item.stockQty}</td>
        <td>
          <span className="helix-status helix-status-ok">LOCAL · 48HR</span>
        </td>
        <td>
          <StatusPill status={statusLabel(item.localListingStatusId)} />
        </td>
        <td>
          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/buyer/sell/details?id=${item.id}`)}
              className="text-muted hover:text-text"
              title="View details"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => onEdit(item)}
              className="text-secondary hover:text-primary"
              title="Edit listing"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => setDeleteTarget(item)}
              className="text-danger hover:text-shadow-danger"
              title="Delete listing"
            >
              <Trash size={16} />
            </button>
          </div>
        </td>
      </tr>

      {/* ── Card (mobile) ────────────────────────────── */}
      <div
        key={`card-${item.id}`}
        className="helix-card p-4 md:hidden space-y-3"
      >
        <div className="flex gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold truncate">{item.title}</h4>
            <p className="text-[12px] text-muted mt-0.5">{item.category}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="font-mono text-sm font-medium">
                {formatUSD(item.retailPriceUsd)}
              </span>
              <span className="helix-status helix-status-ok text-[10px]">
                LOCAL · 48HR
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-3">
            <span className="text-muted">
              Stock:{' '}
              <span className="font-mono text-text">{item.stockQty}</span>
            </span>
            <StatusPill status={statusLabel(item.localListingStatusId)} />
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => router.push(`/buyer/sell/details?id=${item.id}`)}
              className="p-1.5 rounded text-muted hover:text-text hover:bg-[#1A7A6E]/10"
              title="View details"
            >
              <Eye size={15} />
            </button>
            <button
              onClick={() => onEdit(item)}
              className="p-1.5 rounded text-secondary hover:text-primary hover:bg-[#1A7A6E]/10"
              title="Edit listing"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => setDeleteTarget(item)}
              className="p-1.5 rounded text-danger hover:bg-[#E74C3C]/10"
              title="Delete listing"
            >
              <Trash size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      <WarningModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteListing(deleteTarget.id!)}
        loading={deleting}
        label="Delete Listing"
        btnText="Delete"
        text={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </>
  );
}

// ── Main component ──────────────────────────────────────

export default function InventoryList({ items, onEdit }: Props) {
  if (items.length === 0) {
    return (
      <div className="helix-card flex justify-center flex-col items-center gap-6 p-10 text-center text-muted">
        No listings yet.
      </div>
    );
  }

  return (
    <>
      {/* Table — md and up */}
      <div className="hidden md:block helix-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="helix-table">
            <thead>
              <tr>
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
              {items.map((item) => (
                <InventoryRow key={item.id} item={item} onEdit={onEdit} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards — mobile only */}
      <div className="md:hidden space-y-3">
        {items.map((item) => (
          <InventoryRow key={item.id} item={item} onEdit={onEdit} />
        ))}
      </div>
    </>
  );
}
