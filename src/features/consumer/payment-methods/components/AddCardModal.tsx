'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAddCardPaymentMethod } from '../hooks/usePaymentMethods';

// ── Schema ──────────────────────────────────────────────

const cardSchema = z.object({
  isDefault: z.boolean().optional(),
  cardNumber: z.string().min(13, 'Enter a valid card number'),
  expiryMonth: z
    .string()
    .regex(/^(0[1-9]|1[0-2])$/, 'Enter a valid month (01-12)'),
  expiryYear: z.string().regex(/^\d{4}$/, 'Enter a valid year (e.g. 2029)'),
});

type CardFormValues = z.infer<typeof cardSchema>;

// ── Props ───────────────────────────────────────────────

interface AddCardModalProps {
  onClose: () => void;
}

// ── Component ───────────────────────────────────────────

export default function AddCardModal({ onClose }: AddCardModalProps) {
  const { mutate: submit, isPending: busy } = useAddCardPaymentMethod(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: { isDefault: false },
  });

  const onSubmit = (values: CardFormValues) => {
    submit({
      cardNumber: values.cardNumber,
      expiryMonth: values.expiryMonth,
      expiryYear: values.expiryYear,
      isDefault: values.isDefault,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-6">
      <h3 className="helix-h3 mb-4">Add Credit / Debit Card</h3>

      <div className="space-y-3">
        <div>
          <label className="helix-label">Card number</label>
          <input
            className="helix-input"
            placeholder="4242 4242 4242 4242"
            {...register('cardNumber')}
            data-testid="pm-card-number"
          />
          {errors.cardNumber && (
            <p className="text-[#E74C3C] text-[11px] mt-1">
              {errors.cardNumber.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="helix-label">Exp month</label>
            <input
              className="helix-input"
              placeholder="12"
              {...register('expiryMonth')}
              data-testid="pm-exp-month"
            />
            {errors.expiryMonth && (
              <p className="text-[#E74C3C] text-[11px] mt-1">
                {errors.expiryMonth.message}
              </p>
            )}
          </div>
          <div>
            <label className="helix-label">Exp year</label>
            <input
              className="helix-input"
              placeholder="2029"
              {...register('expiryYear')}
              data-testid="pm-exp-year"
            />
            {errors.expiryYear && (
              <p className="text-[#E74C3C] text-[11px] mt-1">
                {errors.expiryYear.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Default checkbox */}
      <label className="flex items-center gap-2 mt-4 text-[12px] text-[#9CA3AF]">
        <input
          type="checkbox"
          {...register('isDefault')}
          data-testid="pm-default"
        />{' '}
        Set as default
      </label>

      {/* Actions */}
      <div className="flex gap-2 mt-5">
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
          data-testid="pm-save"
        >
          {busy ? 'Saving…' : 'Save Card'}
        </button>
      </div>
    </form>
  );
}
