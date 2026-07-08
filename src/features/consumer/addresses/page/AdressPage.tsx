'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { MOCK_ADDRESSES } from '../constants';
import AddressCard from '../components/AddressCard';
import AddressesEmptyState from '../components/AddressesEmptyState';
import AddAddressModal from '../components/AddAddressModal';
import AddressesSkeleton from '../components/AddressesSkeleton';
import type { Address } from '../types';

const SIMULATED_DELAY_MS = 700;

export default function Addresses() {
  const [items, setItems] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setItems(MOCK_ADDRESSES);
      setLoading(false);
    }, SIMULATED_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const remove = (id: string) => {
    if (!window.confirm('Remove this address?')) return;
    setItems((prev) => prev.filter((a) => a.id !== id));
    toast.success('Address removed');
  };

  if (loading) return <AddressesSkeleton />;

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
              <AddressCard key={a.id} address={a} onDelete={remove} />
            ))}
          </div>
        </>
      )}

      {open && <AddAddressModal onClose={() => setOpen(false)} />}
    </main>
  );
}
