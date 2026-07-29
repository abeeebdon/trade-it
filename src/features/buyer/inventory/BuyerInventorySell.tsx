'use client';
import { Plus, Store } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ListingItem } from '../types/buyers';
import PressableBtn from '@/components/buttons/PressableBtn';
import { useHeader } from '@/context/HeaderContext';
import ListingForm from './components/ListingForm';
import InventoryList from './components/InventoryList';
import InventoryTableSkeleton from './components/InventoryTableSkeleton';
import { useGetLocalListings } from './hooks/useGetInventory';

const BuyerInventorySell = () => {
  const { setHeader } = useHeader();

  const { data, isPending, isError, error, refetch } = useGetLocalListings({
    pageNumber: 1,
    pageSize: 10,
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ListingItem | null>(null);
  useEffect(() => {
    setHeader({
      title: 'Direct-to-Consumer Listings',
      kicker: 'Buyer · Sell from local inventory',
      action: (
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="helix-btn-primary inline-flex items-center gap-2"
        >
          <Plus size={14} /> New listing
        </button>
      ),
    });

    return () => setHeader(null);
  }, [setHeader]);
  return (
    <>
      <main className="">
        <div className="helix-card p-5 mb-6 border-primary/30 bg-primary/5">
          <div className="flex items-start gap-3">
            <Store size={22} className="text-secondary" />

            <p className="text-[13px] text-text">
              Listings here sell your <b>US-stocked inventory</b> to consumers
              with 48-hour delivery. Jompshop keeps a 2% marketplace fee; Anchor
              credits the remainder to your USD wallet instantly.
            </p>
          </div>
        </div>

        {isPending ? (
          <InventoryTableSkeleton />
        ) : isError ? (
          <div className="helix-card flex justify-center flex-col items-center gap-4 p-10 text-center">
            <p className="text-danger font-medium">Failed to load listings</p>
            <p className="text-sm text-muted">
              {error instanceof Error
                ? error.message
                : 'Something went wrong. Please try again.'}
            </p>
            <PressableBtn
              handleClick={() => refetch()}
              title="Try again"
              className="helix-btn-secondary w-fit gap-2"
            />
          </div>
        ) : data?.data?.length === 0 ? (
          <div className="helix-card flex justify-center flex-col items-center gap-6 p-10 text-center text-muted">
            No listings yet.
            <PressableBtn
              handleClick={() => {
                setEditing(null);
                setOpen(true);
              }}
              title="New Listing"
              leftComponent={<Plus size={14} />}
              className="helix-btn-primary  w-fit gap-2"
            />
          </div>
        ) : (
          <InventoryList
            items={data?.data ?? []}
            onEdit={(listing) => {
              setEditing(listing);
              setOpen(true);
            }}
          />
        )}
      </main>
      {open && (
        <ListingForm
          isExporter={false}
          editing={editing}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
};

export default BuyerInventorySell;
