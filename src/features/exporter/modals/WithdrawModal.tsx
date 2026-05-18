'use client';

import { useState } from 'react';
import Link from 'next/link';

import Modal from '../components/Modal';

import { formatNGN, formatUSD } from '@/lib/func';

import { toast } from 'sonner';

import { Plus } from 'lucide-react';

import { WithdrawalAccount } from '../types/finance';

interface Props {
  currency: 'USD' | 'NGN';

  accounts: WithdrawalAccount[];

  balance: number;

  onClose: () => void;
}

export default function WithdrawModal({
  currency,
  accounts,
  balance,
  onClose,
}: Props) {
  const [busy, setBusy] = useState(false);

  const [amount, setAmount] = useState('');

  const [accId, setAccId] = useState(
    accounts.find((a) => a.is_default)?.id || accounts[0]?.id || '',
  );

  const fmt = currency === 'USD' ? formatUSD : formatNGN;

  const submit = async () => {
    setBusy(true);

    try {
      await new Promise((res) => setTimeout(res, 1000));

      toast.success(`${currency} withdrawal initiated`);

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
        <div className="text-sm text-[#9CA3AF]">
          Available:{' '}
          <span className="text-[#C9922A] font-semibold">{fmt(balance)}</span>
        </div>

        {accounts.length === 0 ? (
          <div className="border border-dashed border-[#C9922A]/30 rounded-xl p-6 text-center">
            <p className="text-sm text-[#9CA3AF]">No approved accounts yet</p>

            <Link
              href="/finance/accounts"
              className="helix-btn-primary inline-flex items-center gap-2 mt-4"
            >
              <Plus size={14} />
              Add account
            </Link>
          </div>
        ) : (
          <>
            <select
              className="helix-input"
              value={accId}
              onChange={(e) => setAccId(e.target.value)}
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="helix-input"
              placeholder={`Amount (${currency})`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="flex gap-3">
              <button onClick={onClose} className="helix-btn-secondary flex-1">
                Cancel
              </button>

              <button
                onClick={submit}
                disabled={busy}
                className="helix-btn-primary flex-1"
              >
                {busy ? 'Processing...' : 'Withdraw'}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
