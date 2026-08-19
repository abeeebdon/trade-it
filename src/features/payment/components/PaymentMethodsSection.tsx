'use client';

import { useMemo } from 'react';
import { CreditCard, Banknote, Wallet } from 'lucide-react';
import { Loading } from '@/components/loading';
import { useGetPaymentMethods } from '@/features/consumer/payment-methods/hooks/usePaymentMethods';
import {
  resolvePaymentMethod,
  type PaymentMethod,
} from '@/features/consumer/payment-methods/types';
import PressableBtn from '@/components/buttons/PressableBtn';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../stripe/CheckoutStripe';
import { loadStripe } from '@stripe/stripe-js';

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
  const handlePayWithStripeCheckout = () => {};

  return (
    <>
      <article className="helix-card p-6">
        <h2 className="helix-h3 mb-4">Payment Method</h2>

        {pmLoading ? (
          <div className="flex justify-center py-3">
            <Loading />
          </div>
        ) : pmError || resolvedPMs.length === 0 ? (
          <article>
            <h3 className="text-md my-4 text-muted">
              You have not added any payment method
            </h3>

            <div className="flex lg:flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onAddClick}
                className="helix-btn-secondary w-full text-sm"
              >
                + Add payment method
              </button>
              <button
                type="button"
                className="w-full text-sm"
                onClick={handlePayWithStripeCheckout}
              >
                Fast Checkout with Stripe
              </button>
            </div>
          </article>
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
      {/* {paymentData && (
        <Elements
          stripe={loadStripe(paymentData.publishableKey)}
          options={{
            clientSecret: paymentData.clientSecret,
          }}
        >
          <CheckoutForm paymentData={paymentData} />
        </Elements>
      )} */}
    </>
  );
};
