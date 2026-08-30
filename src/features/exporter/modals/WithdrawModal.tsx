'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import Modal from '../components/Modal';
import { WithdrawalProps } from '../types/finance';
import PressableBtn from '@/components/buttons/PressableBtn';
import InputField from '@/components/form/InputFIeld';
import { formatNGN, formatUSD } from '@/lib/func';

interface WithdrawalFormValues {
  accountId: string;
  amount: string;
}

export default function WithdrawModal({
  currency,
  accounts,
  balance,
  onClose,
}: WithdrawalProps) {
  const [busy, setBusy] = useState(false);

  const defaultAccountId =
    accounts.find((a) => a.is_default)?.id || accounts[0]?.id || '';

  const form = useForm<WithdrawalFormValues>({
    defaultValues: {
      accountId: defaultAccountId,
      amount: '',
    },
  });

  const amountValue = Number(form.watch('amount') || 0);
  const feeRate = currency === 'USD' ? 1.5 : 1.8;

  const charges = useMemo(() => {
    if (!amountValue || amountValue <= 0) return 0;
    return Number((amountValue * (feeRate / 100)).toFixed(2));
  }, [amountValue, feeRate]);

  const fmt = currency === 'USD' ? formatUSD : formatNGN;

  const submit = async (values: WithdrawalFormValues) => {
    setBusy(true);

    try {
      await new Promise((res) => setTimeout(res, 1000));

      toast.success(
        `${currency} withdrawal of ${fmt(Number(values.amount))} initiated`,
      );

      onClose();
    } catch {
      toast.error('Failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal onClose={onClose} title={`Withdraw ${currency}`}>
      <div className="space-y-4">
        <div className="text-sm text-muted">
          Available:{' '}
          <span className="text-primary font-semibold">{fmt(balance)}</span>
        </div>

        {accounts.length === 0 ? (
          <div className="border border-dashed border-primary/30 rounded-xl p-6 text-center">
            <p className="text-sm text-muted">No approved accounts yet</p>

            <Link
              href="/exporter/account/withdrawal-accounts"
              className="helix-btn-primary inline-flex items-center gap-2 mt-4"
            >
              <Plus size={14} />
              Add account
            </Link>
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(submit)}
            className="space-y-4"
            noValidate
          >
            <div>
              <label className="helix-label">Account</label>
              <div className="rounded-lg border border-border bg-bg p-2">
                <select
                  className="w-full bg-bg text-text border-0 outline-none focus:ring-0"
                  value={form.watch('accountId') || accounts[0]?.id || ''}
                  onChange={(e) => form.setValue('accountId', e.target.value)}
                >
                  {accounts.map((account) => (
                    <option
                      key={account.id}
                      value={account.id}
                      className="bg-bg text-text"
                    >
                      {account.label} · {account.bank_name} ·{' '}
                      {account.account_number_masked}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <InputField
                label="Amount"
                type="number"
                min="0"
                step="0.01"
                placeholder={`Amount (${currency})`}
                className="bg-bg border-border text-text placeholder:text-muted focus:border-primary"
                {...form.register('amount', { valueAsNumber: false })}
              />

              <p className="mt-2 text-xs text-muted">
                Charges: {fmt(charges)} ({feeRate}% fee)
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose} className="helix-btn-secondary flex-1">
                Cancel
              </button>

              <PressableBtn
                title={busy ? 'Processing...' : 'Withdraw'}
                handleClick={() => form.handleSubmit(submit)()}
                className="helix-btn-primary text-center flex-1 justify-center"
                loading={busy}
              />
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
