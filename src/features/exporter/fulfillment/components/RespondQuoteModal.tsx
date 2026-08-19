'use client';

import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { formatUSD } from '@/lib/func';
import type { ApiQuoteRequest } from '../types/fulftillment';
import { useRespondToQuote } from '../hooks/useFulfillment';
import InputField from '@/components/form/InputFIeld';
import Loader from '@/components/buttons/Loader';
import SuccessModal from '@/components/modals/SuccessModal';

const respondQuoteSchema = z.object({
  quoted_unit_price_usd: z.number().int(),
  quote_note: z.string().optional(),
  valid_days: z
    .number()
    .int()
    .min(1, 'Minimum 1 day')
    .max(30, 'Maximum 30 days'),
});

type RespondQuoteFormValues = z.infer<typeof respondQuoteSchema>;

interface RespondQuoteModalProps {
  quote: ApiQuoteRequest;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RespondQuoteModal({
  quote,
  onClose,
  onSuccess,
}: RespondQuoteModalProps) {
  const router = useRouter();
  const respondQuote = useRespondToQuote();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    'Quote sent successfully.',
  );

  const handleSuccessContinue = () => {
    onClose();
  };

  const handleSuccessCancel = () => {
    setShowSuccess(false);
    onClose();
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RespondQuoteFormValues>({
    resolver: zodResolver(respondQuoteSchema),
    defaultValues: {
      quoted_unit_price_usd: quote.quotedUnitPriceUsd
        ? Number(quote.quotedUnitPriceUsd)
        : 0,
      quote_note: '',
      valid_days: 7,
    },
  });

  // Keep defaults in sync if quote changes while modal is open
  useEffect(() => {
    reset();
  }, [quote, reset]);

  const unitPrice = useWatch({ control, name: 'quoted_unit_price_usd' });
  const estimatedTotal =
    unitPrice && Number(unitPrice) > 0
      ? Number(unitPrice) * quote.quantity
      : null;

  const onSubmit = (formData: RespondQuoteFormValues) => {
    respondQuote.mutate(
      {
        quoteNumber: quote.quoteNumber,
        payload: {
          quotedUnitPriceUsd: formData.quoted_unit_price_usd,
          noteToConsumer: formData.quote_note || undefined,
          validForDays: formData.valid_days,
        },
      },
      {
        onSuccess: (data) => {
          setSuccessMessage(data?.message ?? 'Quote sent successfully.');
          setShowSuccess(true);
        },
      },
    );
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur flex items-start justify-center pt-16 pb-10 overflow-y-auto z-50 p-4"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="helix-card p-6 w-full max-w-md"
        >
          <div className="helix-kicker">Respond · {quote.quoteNumber}</div>
          <h3 className="helix-h3 mt-1">{quote.productName}</h3>
          <div className="mt-3 text-[12px] text-[#9CA3AF]">
            Qty requested:{' '}
            <span className="font-mono text-[#F5F5F5]">{quote.quantity}</span>
          </div>
          {quote.message && (
            <div className="mt-2 text-[12px] italic text-[#9CA3AF]">
              &ldquo;{quote.message}&rdquo;
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
            {/* Quoted unit price */}
            <InputField
              label="Quoted unit price (USD)"
              type="number"
              min={1}
              error={errors.quoted_unit_price_usd?.message}
              {...register('quoted_unit_price_usd', { valueAsNumber: true })}
            />
            {estimatedTotal && (
              <div className="text-[11px] text-[#C9922A] font-mono -mt-2">
                Est. total: {formatUSD(estimatedTotal)}
              </div>
            )}

            {/* Note */}
            <div>
              <label className="helix-label">Note to consumer</label>
              <textarea
                className="helix-input h-20"
                placeholder="Optional note about pricing, timeline, etc."
                {...register('quote_note')}
              />
              {errors.quote_note && (
                <p className="text-red-400 text-[11px] mt-1">
                  {errors.quote_note.message}
                </p>
              )}
            </div>

            {/* Valid days */}
            <InputField
              label="Valid for (days)"
              type="number"
              min={1}
              max={30}
              error={errors.valid_days?.message}
              {...register('valid_days', { valueAsNumber: true })}
            />

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="helix-btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={respondQuote.isPending}
                className="helix-btn-primary flex-1"
              >
                {respondQuote.isPending ? <Loader /> : 'Send quote'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <SuccessModal
        open={showSuccess}
        message={successMessage}
        onContinue={handleSuccessContinue}
        onCancel={handleSuccessCancel}
        continueText="Done"
      />
    </>
  );
}
