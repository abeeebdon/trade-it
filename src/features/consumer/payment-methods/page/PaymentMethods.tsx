'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { MOCK_PAYMENT_METHODS } from '../constants';
import PaymentMethodCard from '../components/PaymentMethodCard';
import PaymentMethodsEmptyState from '../components/PaymentMethodsEmptyState';
import AddPaymentModal from '../components/AddPaymentModal';
import PaymentMethodsSkeleton from '../components/PaymentMethodsSkeleton';
import type { PaymentMethod } from '../types';

const SIMULATED_DELAY_MS = 700;

export default function PaymentMethods() {
  const [items, setItems] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setItems(MOCK_PAYMENT_METHODS);
      setLoading(false);
    }, SIMULATED_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const remove = (id: string) => {
    if (!window.confirm('Remove this payment method?')) return;
    setItems((prev) => prev.filter((pm) => pm.id !== id));
    toast.success('Removed');
  };

  if (loading) return <PaymentMethodsSkeleton />;

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
              <PaymentMethodCard key={pm.id} pm={pm} onDelete={remove} />
            ))}
          </div>
        </>
      )}

      {open && <AddPaymentModal onClose={() => setOpen(false)} />}
    </main>
  );
}
