'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import PaymentMethodCard from '../components/PaymentMethodCard';
import PaymentMethodsEmptyState from '../components/PaymentMethodsEmptyState';
import AddPaymentModal from '../components/AddPaymentModal';
import PaymentMethodsSkeleton from '../components/PaymentMethodsSkeleton';
import WarningModal from '@/components/modals/WarningModal';
import {
  useGetPaymentMethods,
  useDeletePaymentMethod,
  useSetDefaultPaymentMethod,
} from '../hooks/usePaymentMethods';

export default function PaymentMethods() {
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const { data, isLoading } = useGetPaymentMethods();
  const { mutate: remove, isPending: deleting } = useDeletePaymentMethod();
  const { mutate: setDefault } = useSetDefaultPaymentMethod();

  const items = data?.data?.data ?? [];

  const handleDelete = (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (deleteTarget === null) return;
    remove(deleteTarget, {
      onSettled: () => setDeleteTarget(null),
    });
  };

  const handleSetDefault = (id: string) => {
    setDefault(id);
  };

  if (isLoading) return <PaymentMethodsSkeleton />;

  return (
    <main>
      <p className="text-[13px] text-[#9CA3AF] mb-6">
        Cards, Zelle and ACH used for JompShop checkouts. Details are stored
        securely and only the last 4 digits are visible.
      </p>

      {items.length === 0 ? (
        <PaymentMethodsEmptyState onAdd={() => setOpen(true)} />
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setOpen(true)}
              className="helix-btn-primary text-sm inline-flex items-center gap-1.5"
              data-testid="cs-add-pm"
            >
              <Plus size={13} /> Add method
            </button>
          </div>
          <div className="space-y-3">
            {items.map((pm) => (
              <PaymentMethodCard
                key={pm.id}
                pm={pm}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
              />
            ))}
          </div>
        </>
      )}

      {open && <AddPaymentModal onClose={() => setOpen(false)} />}

      <WarningModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        label="Remove payment method"
        text="Are you sure you want to remove this payment method? This action cannot be undone."
        btnText="Remove"
      />
    </main>
  );
}
