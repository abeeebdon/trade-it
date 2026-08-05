'use client';

import { useMemo } from 'react';
import { CreditCard, Banknote, Wallet } from 'lucide-react';
import { Loading } from '@/components/loading';
import { useGetPaymentMethods } from '@/features/consumer/payment-methods/hooks/usePaymentMethods';
import {
  resolvePaymentMethod,
  type PaymentMethod,
} from '@/features/consumer/payment-methods/types';

const FALLBACK_PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'bank', label: 'Bank Transfer', icon: Banknote },
  { id: 'wallet', label: 'Digital Wallet', icon: Wallet },
];

const PM_ICON: Record<string, typeof CreditCard> = {
  card: CreditCard,
  zelle: Banknote,
  ach: Wallet,
};

interface PaymentMethodsSectionProps {
  selectedPaymentId: number | null;
  onSelect: (id: number | null) => void;
  onAddClick: () => void;
}

export const PaymentMethodsSection = ({
  selectedPaymentId,
  onSelect,
  onAddClick,
}: PaymentMethodsSectionProps) => {
  const {
    data: pmData,
    isPending: pmLoading,
    isError: pmError,
  } = useGetPaymentMethods(1, 20);

  const apiPaymentMethods: PaymentMethod[] = useMemo(
    () => pmData?.data?.data ?? (pmData as unknown as PaymentMethod[]) ?? [],
    [pmData],
  );

  const resolvedPMs = useMemo(
    () => apiPaymentMethods.map(resolvePaymentMethod),
    [apiPaymentMethods],
  );

  return (
    <article className="helix-card p-6">
      <h2 className="helix-h3 mb-4">Payment Method</h2>

      {pmLoading ? (
        <div className="flex justify-center py-3">
          <Loading />
        </div>
      ) : pmError || resolvedPMs.length === 0 ? (
        <div>
          <div className="space-y-2 mb-4">
            {FALLBACK_PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
              <label
                key={id}
                className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${
                  selectedPaymentId === null && id === 'card'
                    ? 'border-primary bg-primary/8'
                    : 'border-secondary/30 hover:border-secondary/60'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={id}
                  defaultChecked={id === 'card'}
                  onChange={() => onSelect(null)}
                  className="accent-primary"
                />
                <Icon size={18} className="text-muted" />
                <span className="text-sm text-text">{label}</span>
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={onAddClick}
            className="helix-btn-secondary w-full text-sm"
          >
            + Add payment method
          </button>
          <p className="text-[11px] text-muted mt-2 text-center">
            Add a real payment method for faster checkout.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {resolvedPMs.map((pm) => {
            const Icon = PM_ICON[pm.kind] ?? CreditCard;
            return (
              <label
                key={pm.id}
                className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${
                  selectedPaymentId === pm.id
                    ? 'border-primary bg-primary/8'
                    : 'border-secondary/30 hover:border-secondary/60'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={pm.id}
                  checked={selectedPaymentId === pm.id}
                  onChange={() => onSelect(pm.id)}
                  className="accent-primary"
                />
                <Icon size={18} className="text-muted" />
                <div>
                  <span className="text-sm text-text">{pm.label}</span>
                  {pm.isDefault && (
                    <span className="text-[10px] text-primary ml-2 font-medium">
                      Default
                    </span>
                  )}
                </div>
              </label>
            );
          })}
          <button
            type="button"
            onClick={onAddClick}
            className="text-sm text-secondary hover:text-primary transition-colors"
          >
            + Add another
          </button>
        </div>
      )}
    </article>
  );
};
