'use client';

import { Eye, Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { ListingItem } from '../../types/buyers';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatUSD } from '@/lib/func';
import WarningModal from '@/components/modals/WarningModal';
import { useDeleteLocalListing } from '../hooks/useGetInventory';
import { useRouter } from 'next/navigation';

const STATUS_MAP: Record<number, string> = {
  1: 'active',
  2: 'draft',
  3: 'out_of_stock',
  4: 'archived',
};

const statusLabel = (id: number): string => STATUS_MAP[id] || 'pending';

interface Props {
  item: ListingItem;
  onEdit: (item: ListingItem) => void;
}

const InventoryTableCard = ({ item, onEdit }: Props) => {
  const [deleteTarget, setDeleteTarget] = useState<ListingItem | null>(null);
  const router = useRouter();

  const { mutateAsync: deleteListing, isPending: deleting } =
    useDeleteLocalListing(() => setDeleteTarget(null));
  return (
    <>
      <tr key={item.id}>
        <td>
          <Image
            src={item.images?.[0] || '/images/placeholder.png'}
            alt=""
            width={56}
            height={56}
            className="w-14 h-14 rounded object-cover"
          />
        </td>
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
};

export default InventoryTableCard;
