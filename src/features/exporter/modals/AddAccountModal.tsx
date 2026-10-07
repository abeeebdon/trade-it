'use client';

import { useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import InputField from '@/components/form/InputFIeld';
import SelectField from '@/components/form/SelectField';
import type { NgnBank, WithdrawalAccount } from '../types/exporter';

const addAccountSchema = z.object({
  label: z.string().optional(),
  account_name: z.string().min(1, 'Account holder name is required'),
  is_default: z.boolean(),
  bank_code: z.string().min(1, 'Select a bank'),
  account_number: z
    .string()
    .regex(/^\d{10}$/, 'Account number must be 10 digits'),
  bank_name: z.string().optional(),
  routing_number: z.string().optional(),
  account_type: z.enum(['checking', 'savings']),
  swift_code: z.string().optional(),
});

type AddAccountFormValues = z.infer<typeof addAccountSchema>;

interface AddAccountModalProps {
  banks: NgnBank[];
  onClose: () => void;
  onSaved: (account: WithdrawalAccount) => void;
}

const defaultValues: AddAccountFormValues = {
  label: '',
  account_name: '',
  is_default: true,
  bank_code: '058',
  account_number: '',
  bank_name: '',
  routing_number: '',
  account_type: 'checking',
  swift_code: '',
};

const makeAccountId = () => `wa-${Math.random().toString(36).slice(2, 10)}`;

export default function AddAccountModal({
  banks,
  onClose,
  onSaved,
}: AddAccountModalProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const verificationTimer = useRef<number | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<AddAccountFormValues>({
    resolver: zodResolver(addAccountSchema),
    defaultValues,
  });

  const clearVerificationTimer = () => {
    if (verificationTimer.current !== null) {
      window.clearTimeout(verificationTimer.current);
      verificationTimer.current = null;
    }
  };

  const verifyAccount = (nextBankCode: string, nextAccountNumber: string) => {
    clearVerificationTimer();

    const normalized = nextAccountNumber.replace(/\D/g, '').slice(0, 10);

    if (!nextBankCode || normalized.length !== 10) {
      setVerificationMessage('');
      setIsVerifying(false);
      setValue('account_name', '', { shouldValidate: true });
      return;
    }

    setIsVerifying(true);
    setVerificationMessage('');

    verificationTimer.current = window.setTimeout(() => {
      const bankIndex = banks.findIndex((bank) => bank.code === nextBankCode);
      const seed =
        nextBankCode
          .split('')
          .reduce((sum, char) => sum + char.charCodeAt(0), 0) +
        normalized.length +
        (bankIndex >= 0 ? bankIndex : 0);

      const verifiedNames = [
        'Jompshop Okafor',
        'Jompstart Adebayo',
        'Jomp Eze',
        'Jompp Adeyemi',
      ];

      const verifiedName =
        verifiedNames[Math.abs(seed) % verifiedNames.length] ?? 'Ade';

      setValue('account_name', verifiedName, { shouldValidate: true });
      setValue(
        'bank_name',
        banks.find((bank) => bank.code === nextBankCode)?.name ?? '',
        { shouldValidate: true },
      );
      setVerificationMessage(`Verified account holder: ${verifiedName}`);
      setIsVerifying(false);
      verificationTimer.current = null;
    }, 1200);
  };

  const handleBankChange = (value: string) => {
    setValue('bank_code', value, { shouldValidate: true });
    verifyAccount(value, getValues('account_number'));
  };

  const handleAccountNumberChange = (value: string) => {
    const nextValue = value.replace(/\D/g, '').slice(0, 10);
    setValue('account_number', nextValue, { shouldValidate: true });
    verifyAccount(getValues('bank_code'), nextValue);
  };

  const onSubmit = async (values: AddAccountFormValues) => {
    if (isVerifying) {
      toast.error('Account is still being verified');
      return;
    }

    const selectedBank = banks.find((bank) => bank.code === values.bank_code);

    const saved: WithdrawalAccount = {
      id: makeAccountId(),
      label: values.label || 'NGN Account',
      currency: 'NGN',
      bank_name: selectedBank?.name ?? values.bank_name ?? 'Bank account',
      account_number_masked: `••••••${values.account_number.slice(-4)}`,
      account_name: values.account_name,
      account_type: values.account_type,
      routing_number: values.routing_number || undefined,
      swift_code: values.swift_code || undefined,
      is_default: values.is_default,
    };

    onSaved(saved);
    toast.success('Account added & approved');
    onClose();
  };

  return (
    <section className="fixed inset-0 bg-bg/80 backdrop-blur flex items-center justify-center pt-16 pb-10 overflow-y-auto z-50 p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="helix-card p-6 w-full max-w-md"
      >
        <h3 className="helix-h3">Add withdrawal account</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
          <Controller
            name="bank_code"
            control={control}
            render={({ field, fieldState }) => (
              <SelectField
                label="Bank"
                name={field.name}
                value={field.value}
                onChange={(event) => {
                  field.onChange(event.target.value);
                  handleBankChange(event.target.value);
                }}
                error={fieldState.error?.message}
              >
                {banks.map((bank) => (
                  <option key={bank.code} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </SelectField>
            )}
          />

          <Controller
            name="account_number"
            control={control}
            render={({ field, fieldState }) => (
              <InputField
                label="Account number (10 digits)"
                name={field.name}
                value={field.value}
                maxLength={10}
                placeholder="Enter 10 digits"
                onChange={(event) => {
                  const nextValue = event.target.value
                    .replace(/\D/g, '')
                    .slice(0, 10);
                  field.onChange(nextValue);
                  handleAccountNumberChange(nextValue);
                }}
                error={fieldState.error?.message}
              />
            )}
          />

          {isVerifying && (
            <div className="flex items-center gap-2 text-[11px] text-muted">
              <Loader2 className="size-4 animate-spin" />
              Verifying account details...
            </div>
          )}

          {!isVerifying && verificationMessage && (
            <div className="text-[11px] text-primary">
              {verificationMessage}
            </div>
          )}

          <div className="flex gap-2 w-full mt-8 justify-between">
            <button
              type="button"
              onClick={onClose}
              className="helix-btn-secondary w-1/2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isVerifying}
              className="helix-btn-primary w-1/2"
            >
              {isSubmitting ? 'Saving…' : 'Add account'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
