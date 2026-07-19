'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import AddressCard from '../components/AddressCard';
import AddressesEmptyState from '../components/AddressesEmptyState';
import AddAddressModal from '../components/AddAddressModal';
import AddressesSkeleton from '../components/AddressesSkeleton';
import WarningModal from '@/components/modals/WarningModal';
import {
  useGetAddresses,
  useDeleteAddress,
  useSetDefaultAddress,
} from '../hooks/useAddresses';

export default function Addresses() {
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const { data, isLoading } = useGetAddresses();
  const { mutate: remove, isPending: deleting } = useDeleteAddress();
  const { mutate: setDefault } = useSetDefaultAddress();

  const items = data?.data?.data ?? [];

  const handleDelete = (id: number) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (deleteTarget === null) return;
    remove(deleteTarget, {
      onSettled: () => setDeleteTarget(null),
    });
  };

  const handleSetDefault = (id: number) => {
    setDefault(id);
  };

  if (isLoading) return <AddressesSkeleton />;

  return (
    <main>
      <p className="text-[13px] text-[#9CA3AF] mb-6">
        Where your JompShop orders arrive. We currently deliver within the
        United States.
      </p>

      {items.length === 0 ? (
        <AddressesEmptyState onAdd={() => setOpen(true)} />
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setOpen(true)}
              className="helix-btn-primary text-sm inline-flex items-center gap-1.5"
              data-testid="cs-add-addr"
            >
              <Plus size={13} /> Add address
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((a) => (
              <AddressCard
                key={a.id}
                address={a}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
              />
            ))}
          </div>
        </>
      )}

      {open && <AddAddressModal onClose={() => setOpen(false)} />}

      <WarningModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        label="Remove address"
        text="Are you sure you want to remove this address? This action cannot be undone."
        btnText="Remove"
      />
    </main>
  );
}
