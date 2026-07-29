'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import PaymentMethodCard from '../components/PaymentMethodCard';
import PaymentMethodsEmptyState from '../components/PaymentMethodsEmptyState';
import PaymentMethodsSkeleton from '../components/PaymentMethodsSkeleton';
import {
  useGetPaymentMethods,
  useSetDefaultPaymentMethod,
} from '../hooks/usePaymentMethods';
import AddPaymentModal from '../components/AddPaymentModal';

export default function PaymentMethods() {
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading } = useGetPaymentMethods();

  const items = data?.data?.data ?? [];

  if (isLoading) return <PaymentMethodsSkeleton />;

  return (
    <main>
      <p className="text-[13px] text-[#9CA3AF] mb-6">
        Cards, Zelle and ACH used for JompShop checkouts. Details are stored
        securely and only the last 4 digits are visible.
      </p>

      {items.length === 0 ? (
        <PaymentMethodsEmptyState onAdd={() => setShowModal(true)} />
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowModal(true)}
              className="helix-btn-primary text-sm inline-flex items-center gap-1.5"
            >
              <Plus size={13} /> Add method
            </button>
          </div>
          <div className="space-y-3">
            {items.map((pm) => (
              <PaymentMethodCard key={pm.id} pm={pm} />
            ))}
          </div>
        </>
      )}

      {showModal && <AddPaymentModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
