'use client';

import { useMemo, useState } from 'react';
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
import { useGetPaymentProviders } from '../hooks/usePaymentProviders';
import { paymentProviders, PROVIDER_LOGO } from './constants';
import Image from 'next/image';
import { cn } from '@/lib/cn';

const PM_ICON: Record<string, typeof CreditCard> = {
  card: CreditCard,
  zelle: Banknote,
  ach: Wallet,
};

interface DisplayProvider {
  id: string;
  name: string;
  logo: string | null;
}

interface PaymentMethodsSectionProps {
  selectedPaymentId: string;
  onSelect: (id: string) => void;
  onAddClick: () => void;
}

export const PaymentMethodsSection = ({
  selectedPaymentId,
  onSelect,
  onAddClick,
}: PaymentMethodsSectionProps) => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const {
    data: pmData,
    isPending: pmLoading,
    isError: pmError,
  } = useGetPaymentMethods(1, 20);

  const { data: providersData, isPending: providersLoading } =
    useGetPaymentProviders();

  const apiPaymentMethods: PaymentMethod[] = useMemo(
    () => pmData?.data?.data ?? (pmData as unknown as PaymentMethod[]) ?? [],
    [pmData],
  );

  const resolvedPMs = useMemo(
    () => apiPaymentMethods.map(resolvePaymentMethod),
    [apiPaymentMethods],
  );

  // Providers come from the API (GET /PaymentMethod/providers). Fall back
  // to the bundled constants when the endpoint is empty or unreachable.
  const providers: DisplayProvider[] = useMemo(() => {
    const apiProviders = providersData?.data ?? [];
    if (apiProviders.length === 0) {
      return paymentProviders;
    }
    return apiProviders.map((p) => ({
      id: String(p.id),
      name: p.name,
      logo: PROVIDER_LOGO[p.name.toLowerCase()] ?? null,
    }));
  }, [providersData]);

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
            </div>
          </article>
        ) : (
          // <div className="space-y-2">
          //   {resolvedPMs.map((pm) => {
          //     const Icon = PM_ICON[pm.kind] ?? CreditCard;
          //     return (
          //       <label
          //         key={pm.id}
          //         className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${
          //           selectedPaymentId === pm.id
          //             ? 'border-primary bg-primary/8'
          //             : 'border-secondary/30 hover:border-secondary/60'
          //         }`}
          //       >
          //         <input
          //           type="radio"
          //           name="payment"
          //           value={pm.id}
          //           checked={selectedPaymentId === pm.id}
          //           onChange={() => onSelect(pm.id)}
          //           className="accent-primary"
          //         />
          //         <Icon size={18} className="text-muted" />
          //         <div>
          //           <span className="text-sm text-text">{pm.label}</span>
          //           {pm.isDefault && (
          //             <span className="text-[10px] text-primary ml-2 font-medium">
          //               Default
          //             </span>
          //           )}
          //         </div>
          //       </label>
          //     );
          //   })}
          // </div>
          <></>
        )}
        <article className="flex flex-col gap-3 mt-6">
          {providersLoading ? (
            <div className="flex justify-center py-3">
              <Loading />
            </div>
          ) : (
            providers.map((provider) => {
              return (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => onSelect(provider.name)}
                  className={cn(
                    'flex h-12 items-center justify-center w-full gap-2 border px-4',
                    selectedPaymentId === provider.name
                      ? 'border-black'
                      : 'border-gray-200',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-4 w-4 items-center justify-center rounded-full border',
                      selectedPaymentId === provider.name && 'border-black',
                    )}
                  >
                    {selectedPaymentId === provider.name && (
                      <span className="h-2 w-2 rounded-full bg-black" />
                    )}
                  </span>

                  {provider.logo ? (
                    <Image
                      src={provider.logo}
                      alt={provider.name}
                      className="h-5 w-auto"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <span className="flex items-center gap-2 text-sm text-muted">
                      <Wallet size={16} />
                      {provider.name}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </article>
      </article>
    </>
  );
};
