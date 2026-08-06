'use client';

import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { formatUSD } from '@/lib/func';
import type { ApiQuoteRequest } from '../types/fulftillment';
import { respondToQuote } from '../api/fulfillmentApi';
import Loader from '@/components/buttons/Loader';

// ── Zod schema ────────────────────────────────────────────────────────────────

const respondQuoteSchema = z.object({
  quoted_unit_price_usd: z
    .string()
    .min(1, 'Unit price is required')
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
      message: 'Must be a positive number',
    }),
  quote_note: z.string().optional(),
  valid_days: z
    .number()
    .int()
    .min(1, 'Minimum 1 day')
    .max(30, 'Maximum 30 days'),
});

type RespondQuoteFormValues = z.infer<typeof respondQuoteSchema>;

// ── Props ─────────────────────────────────────────────────────────────────────

interface RespondQuoteModalProps {
  quote: ApiQuoteRequest;
  onClose: () => void;
  onSuccess?: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function RespondQuoteModal({
  quote,
  onClose,
  onSuccess,
}: RespondQuoteModalProps) {
  const [busy, setBusy] = useState(false);

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
        ? String(quote.quotedUnitPriceUsd)
        : '',
      quote_note: '',
      valid_days: 7,
    },
  });

  // Keep defaults in sync if quote changes while modal is open
  useEffect(() => {
    reset({
      quoted_unit_price_usd: quote.quotedUnitPriceUsd
        ? String(quote.quotedUnitPriceUsd)
        : '',
      quote_note: '',
      valid_days: 7,
    });
  }, [quote, reset]);

  const unitPrice = useWatch({ control, name: 'quoted_unit_price_usd' });
  const estimatedTotal =
    unitPrice && Number(unitPrice) > 0
      ? Number(unitPrice) * quote.quantity
      : null;

  const onSubmit = async (data: RespondQuoteFormValues) => {
    setBusy(true);
    try {
      await respondToQuote(quote.quoteNumber, {
        quotedUnitPriceUsd: Number(data.quoted_unit_price_usd),
        noteToConsumer: data.quote_note || undefined,
        validForDays: data.valid_days,
      });
      toast.success('Quote sent to consumer');
      onSuccess?.();
      onClose();
    } catch {
      toast.error('Failed to send quote');
    } finally {
      setBusy(false);
    }
  };

  return (
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
          <div>
            <label className="helix-label">Quoted unit price (USD)</label>
            <input
              type="number"
              step="0.01"
              min={0}
              className="helix-input"
              {...register('quoted_unit_price_usd')}
              data-testid="q-unit"
            />
            {errors.quoted_unit_price_usd && (
              <p className="text-red-400 text-[11px] mt-1">
                {errors.quoted_unit_price_usd.message}
              </p>
            )}
            {estimatedTotal && (
              <div className="text-[11px] text-[#C9922A] font-mono mt-1">
                Est. total: {formatUSD(estimatedTotal)}
              </div>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="helix-label">Note to consumer</label>
            <textarea
              className="helix-input h-20"
              placeholder="Optional note about pricing, timeline, etc."
              {...register('quote_note')}
              data-testid="q-note"
            />
            {errors.quote_note && (
              <p className="text-red-400 text-[11px] mt-1">
                {errors.quote_note.message}
              </p>
            )}
          </div>

          {/* Valid days */}
          <div>
            <label className="helix-label">Valid for (days)</label>
            <input
              type="number"
              min={1}
              max={30}
              className="helix-input"
              {...register('valid_days', { valueAsNumber: true })}
            />
            {errors.valid_days && (
              <p className="text-red-400 text-[11px] mt-1">
                {errors.valid_days.message}
              </p>
            )}
          </div>

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
              disabled={busy}
              className="helix-btn-primary flex-1"
              data-testid="q-send"
            >
              {busy ? <Loader /> : 'Send quote'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
