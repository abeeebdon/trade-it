'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { PAYMENT_KINDS } from '../constants';
import type { PaymentKind } from '../types';

const baseSchema = z.object({
  kind: z.enum(['card', 'zelle', 'ach']),
  is_default: z.boolean().optional(),
  // Card fields
  card_number: z.string().optional(),
  exp_month: z.string().optional(),
  exp_year: z.string().optional(),
  // Zelle fields
  zelle_target: z.string().optional(),
  // ACH fields
  bank_name: z.string().optional(),
  routing_number: z.string().optional(),
  account_number: z.string().optional(),
});

const formSchema = baseSchema.superRefine((data, ctx) => {
  if (data.kind === 'card') {
    if (!data.card_number || data.card_number.trim().length < 13) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid card number',
        path: ['card_number'],
      });
    }
    if (!data.exp_month || !/^(0[1-9]|1[0-2])$/.test(data.exp_month)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid month (01-12)',
        path: ['exp_month'],
      });
    }
    if (!data.exp_year || !/^\d{4}$/.test(data.exp_year)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid year (e.g. 2029)',
        path: ['exp_year'],
      });
    }
  }
  if (data.kind === 'zelle') {
    if (!data.zelle_target || data.zelle_target.trim().length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid email or phone',
        path: ['zelle_target'],
      });
    }
  }
  if (data.kind === 'ach') {
    if (!data.bank_name || data.bank_name.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Bank name is required',
        path: ['bank_name'],
      });
    }
    if (!data.routing_number || !/^\d{9}$/.test(data.routing_number)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid 9-digit routing number',
        path: ['routing_number'],
      });
    }
    if (!data.account_number || data.account_number.trim().length < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Account number is required',
        path: ['account_number'],
      });
    }
  }
});

type FormValues = z.infer<typeof formSchema>;

interface AddPaymentModalProps {
  onClose: () => void;
}

export default function AddPaymentModal({ onClose }: AddPaymentModalProps) {
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { kind: 'card', is_default: false },
  });

  const kind = watch('kind');

  const onSubmit = () => {
    setBusy(true);
    setTimeout(() => {
      toast.success('Payment method added');
      setBusy(false);
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-testid="add-pm-modal"
    >
      <div
        className="absolute inset-0 bg-[#0A1628]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative helix-card p-6 w-full max-w-md mx-4"
      >
        <h3 className="helix-h3 mb-4">Add payment method</h3>

        {/* Kind selector */}
        <div className="flex gap-2 mb-4">
          {PAYMENT_KINDS.map((k) => (
            <button
              key={k.v}
              type="button"
              onClick={() => setValue('kind', k.v)}
              data-testid={`pm-kind-${k.v}`}
              className={`flex-1 px-3 py-2 rounded-md text-[12px] border ${
                kind === k.v
                  ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A] font-semibold'
                  : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'
              }`}
            >
              {k.l}
            </button>
          ))}
        </div>

        {/* Hidden kind field for RHF tracking */}
        <input type="hidden" {...register('kind')} />

        {/* Card fields */}
        {kind === 'card' && (
          <div className="space-y-3">
            <div>
              <label className="helix-label">Card number</label>
              <input
                className="helix-input"
                placeholder="4242 4242 4242 4242"
                {...register('card_number')}
                data-testid="pm-card-number"
              />
              {errors.card_number && (
                <p className="text-[#E74C3C] text-[11px] mt-1">
                  {errors.card_number.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="helix-label">Exp month</label>
                <input
                  className="helix-input"
                  placeholder="12"
                  {...register('exp_month')}
                  data-testid="pm-exp-month"
                />
                {errors.exp_month && (
                  <p className="text-[#E74C3C] text-[11px] mt-1">
                    {errors.exp_month.message}
                  </p>
                )}
              </div>
              <div>
                <label className="helix-label">Exp year</label>
                <input
                  className="helix-input"
                  placeholder="2029"
                  {...register('exp_year')}
                  data-testid="pm-exp-year"
                />
                {errors.exp_year && (
                  <p className="text-[#E74C3C] text-[11px] mt-1">
                    {errors.exp_year.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Zelle fields */}
        {kind === 'zelle' && (
          <div>
            <label className="helix-label">Zelle email or phone</label>
            <input
              className="helix-input"
              placeholder="you@example.com"
              {...register('zelle_target')}
              data-testid="pm-zelle"
            />
            {errors.zelle_target && (
              <p className="text-[#E74C3C] text-[11px] mt-1">
                {errors.zelle_target.message}
              </p>
            )}
          </div>
        )}

        {/* ACH fields */}
        {kind === 'ach' && (
          <div className="space-y-3">
            <div>
              <label className="helix-label">Bank name</label>
              <input
                className="helix-input"
                placeholder="Chase"
                {...register('bank_name')}
                data-testid="pm-bank"
              />
              {errors.bank_name && (
                <p className="text-[#E74C3C] text-[11px] mt-1">
                  {errors.bank_name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="helix-label">Routing number</label>
                <input
                  className="helix-input"
                  placeholder="9 digits"
                  {...register('routing_number')}
                  data-testid="pm-routing"
                />
                {errors.routing_number && (
                  <p className="text-[#E74C3C] text-[11px] mt-1">
                    {errors.routing_number.message}
                  </p>
                )}
              </div>
              <div>
                <label className="helix-label">Account number</label>
                <input
                  className="helix-input"
                  placeholder="Account #"
                  {...register('account_number')}
                  data-testid="pm-account"
                />
                {errors.account_number && (
                  <p className="text-[#E74C3C] text-[11px] mt-1">
                    {errors.account_number.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Default checkbox */}
        <label className="flex items-center gap-2 mt-4 text-[12px] text-[#9CA3AF]">
          <input
            type="checkbox"
            {...register('is_default')}
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
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
