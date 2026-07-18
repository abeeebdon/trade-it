'use client';

import { ArrowLeft, Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatUSD } from '@/lib/func';
import { Skeleton } from '@/components/ui/skeleton';
import PressableBtn from '@/components/buttons/PressableBtn';
import WarningModal from '@/components/modals/WarningModal';
import {
  useGetListingById,
  useDeleteLocalListing,
} from './hooks/useGetInventory';
import ListingForm from './components/ListingForm';
import { ListingItem } from '../types/buyers';

const STATUS_MAP: Record<number, string> = {
  1: 'active',
  2: 'draft',
  3: 'out_of_stock',
  4: 'archived',
};

const statusLabel = (id: number): string => STATUS_MAP[id] || 'pending';

const InventoryDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);

  const { data, isPending, isError, error } = useGetListingById({ id: id! });
  const { mutateAsync: deleteListing, isPending: deleting } =
    useDeleteLocalListing(() => router.push('/buyer/sell'));

  const [showDelete, setShowDelete] = useState(false);

  if (!id) {
    return (
      <div className="helix-card flex justify-center flex-col items-center gap-4 p-10 text-center">
        <p className="text-muted">No listing ID provided.</p>
        <PressableBtn
          handleClick={() => router.push('/buyer/sell')}
          title="Back to listings"
          leftComponent={<ArrowLeft size={14} />}
          className="helix-btn-secondary w-fit gap-2"
        />
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="helix-card p-6 space-y-5">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-64 w-full rounded" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="helix-card flex justify-center flex-col items-center gap-4 p-10 text-center">
        <p className="text-danger font-medium">Failed to load listing</p>
        <p className="text-sm text-muted">
          {error instanceof Error ? error.message : 'Something went wrong.'}
        </p>
        <PressableBtn
          handleClick={() => router.push('/buyer/sell')}
          title="Back to listings"
          leftComponent={<ArrowLeft size={14} />}
          className="helix-btn-secondary w-fit gap-2"
        />
      </div>
    );
  }

  const item = data as ListingItem;

  return (
    <>
      <main className="space-y-6">
        {/* Back + actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/buyer/sell')}
            className="text-muted hover:text-text inline-flex items-center gap-1 text-sm"
          >
            <ArrowLeft size={16} /> Back to listings
          </button>

          <div className="flex gap-2">
            <PressableBtn
              handleClick={() => setEditOpen(true)}
              title="Edit"
              leftComponent={<Pencil size={14} />}
              className="helix-btn-secondary gap-2"
            />
            <PressableBtn
              handleClick={() => setShowDelete(true)}
              title="Delete"
              leftComponent={<Trash size={14} />}
              className="bg-danger/60 rounded p-3 text-danger hover:bg-danger/20 gap-2"
              loading={deleting}
            />
          </div>
        </div>

        {/* Images */}
        {item.images?.length > 0 && (
          <div className="helix-card p-4">
            <div className="flex gap-3 flex-wrap">
              {item.images.map((url, i) => (
                <Image
                  key={i}
                  src={url}
                  alt={item.title}
                  width={160}
                  height={160}
                  className="w-40 h-40 rounded-lg object-cover"
                />
              ))}
            </div>
          </div>
        )}

        {/* Main info */}
        <div className="helix-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="helix-h2">{item.title}</h1>
              <p className="text-sm text-muted mt-1">{item.category}</p>
            </div>
            <StatusPill status={statusLabel(item.localListingStatusId)} />
          </div>

          <p className="text-[13px] text-text mt-4 leading-relaxed">
            {item.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            <div>
              <p className="text-xs text-muted uppercase tracking-wide">
                Price
              </p>
              <p className="font-mono text-lg font-semibold text-text mt-1">
                {formatUSD(item.retailPriceUsd)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wide">
                Stock
              </p>
              <p className="font-mono text-lg font-semibold text-text mt-1">
                {item.stockQty}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wide">
                Ships From
              </p>
              <p className="text-sm font-medium text-text mt-1 capitalize">
                {item.shipsFrom}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wide">Mode</p>
              <p className="text-sm font-medium text-text mt-1">LOCAL · 48HR</p>
            </div>
          </div>
        </div>
      </main>

      {/* Edit modal */}
      {editOpen && (
        <ListingForm
          isExporter={false}
          editing={data}
          onClose={() => setEditOpen(false)}
        />
      )}

      {/* Delete confirmation */}
      <WarningModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => deleteListing(Number(id))}
        loading={deleting}
        label="Delete Listing"
        btnText="Delete"
        text={`Are you sure you want to delete "${item.title}"? This action cannot be undone.`}
      />
    </>
  );
};

export default InventoryDetails;
