'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, X } from 'lucide-react';
import PressableBtn from '@/components/buttons/PressableBtn';
import InputField from '@/components/form/InputFIeld';
import SelectField from '@/components/form/SelectField';
import Loader from '@/components/buttons/Loader';
import { formatDateTime, formatUSD } from '@/lib/func';
import { AcceptAndPrepayQuotePayload, Quote } from '../types/shops';

// ── Zod schema ───────────────────────────────────────────────
const acceptPrepaySchema = z.object({
  consumerPhone: z
    .string()
    .min(9, 'Phone number should not be less than 9 digits'),
  shippingAddress: z.string().min(5, 'Shipping address is too short'),
  deliveryPartner: z.string().min(1, 'Please select a delivery partner'),
});

type AcceptPrepayFormValues = z.infer<typeof acceptPrepaySchema>;

interface AcceptPrepayModalProps {
  quote: Quote;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (payload: AcceptAndPrepayQuotePayload) => void;
}

const AcceptPrepayModal = ({
  quote,
  loading = false,
  onClose,
  onConfirm,
}: AcceptPrepayModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcceptPrepayFormValues>({
    resolver: zodResolver(acceptPrepaySchema),
    defaultValues: {
      consumerPhone: '',
      shippingAddress: '',
      deliveryPartner: 'Escrow',
    },
  });

  const onSubmit = (data: AcceptPrepayFormValues) => {
    onConfirm({
      consumerPhone: data.consumerPhone,
      shippingAddress: data.shippingAddress,
      deliveryPartner: data.deliveryPartner,
    });
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <article
        className="w-[90%] max-w-md border border-border rounded bg-bg z-9999 p-6"
        role="dialog"
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className="text-muted hover:text-text cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="helix-h2">Accept & prepay (escrow)</h2>

        {/* Quoted summary */}
        <div className="mt-3 rounded border border-[#1A7A6E]/20 p-4 space-y-1">
          <p className="text-sm">
            {quote.productName} · Qty {quote.quantity}
          </p>
          <p className="font-mono text-[#C9922A] text-lg">
            {formatUSD(quote.quotedTotalUsd ?? 0)}
          </p>
          <p className="text-[11px] text-[#9CA3AF]">
            Valid until {formatDateTime(quote.quoteValidUntil ?? '')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
          <InputField
            label="Consumer Phone"
            type="tel"
            placeholder="Phone number"
            className="helix-input"
            error={errors.consumerPhone?.message}
            {...register('consumerPhone')}
          />
          <InputField
            label="Shipping Address"
            placeholder="Street, city, state, zip"
            className="helix-input"
            error={errors.shippingAddress?.message}
            {...register('shippingAddress')}
          />
          <SelectField
            label="Delivery Partner"
            error={errors.deliveryPartner?.message}
            {...register('deliveryPartner')}
          >
            <option value="Escrow">Escrow</option>
            <option value="Self Pickup">Self Pickup</option>
            <option value="Courier">Courier</option>
          </SelectField>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-2">
            <PressableBtn
              title="Cancel"
              handleClick={onClose}
              className="helix-btn-secondary flex-1"
            />
            <button
              type="submit"
              disabled={loading}
              className="helix-btn-primary flex-1 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Lock size={14} />
                  Prepay {formatUSD(quote.quotedTotalUsd ?? 0)} into escrow
                </>
              )}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default AcceptPrepayModal;
