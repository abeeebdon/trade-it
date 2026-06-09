import Modal from '@/components/ui/Modal';
import { formatNGN, formatUSD } from '@/lib/func';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { WithdrawModalProps } from '../types/buyers';

function WithdrawModal({
  currency,
  accounts,
  balance,
  onClose,
}: WithdrawModalProps) {
  const [accId, setAccId] = useState(
    accounts.find((a) => a.is_default)?.id || accounts[0]?.id || '',
  );
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState(
    `Jomp Shop ${currency} withdrawal`,
  );
  const [busy, setBusy] = useState(false);
  const fmt = currency.toUpperCase() === 'USD' ? formatUSD : formatNGN;

  //   const submit = async () => {
  //     if (!accId) {
  //       toast.error('Pick a destination account first');
  //       return;
  //     }
  //     setBusy(true);
  //     try {
  //     // //   const { data } = await api.post('/finance/withdraw-from-account', {
  //     // //     withdrawal_account_id: accId,
  //     // //     amount: Number(amount),
  //     // //     narration,
  //     //   });
  //       toast.success(`Withdrawal ${data.transfer.status} via ${data.rail}`);
  //       onClose();
  //     } catch (err) {
  //       toast.error(err.response?.data?.detail || 'Failed');
  //     } finally {
  //       setBusy(false);
  //     }
  //   };
  const submit = () => {};

  return (
    <Modal
      onClose={onClose}
      title={`Withdraw ${currency}`}
      testid="withdraw-modal"
    >
      <div className="text-[12px] text-[#9CA3AF] font-mono">
        Available: <b className="text-[#C9922A]">{fmt(balance)}</b>
      </div>
      {accounts.length === 0 ? (
        <div className="mt-5 border border-dashed border-[#C9922A]/40 rounded p-5 text-center">
          <div className="text-[13px] text-[#9CA3AF]">
            No pre-approved {currency} accounts yet.
          </div>
          <Link
            href="/finance/accounts"
            onClick={onClose}
            className="helix-btn-primary inline-flex items-center gap-1.5 mt-4 text-sm"
            data-testid="add-account-from-withdraw"
          >
            <Plus size={13} /> Add a {currency} account
          </Link>
        </div>
      ) : (
        <div className="space-y-4 mt-5">
          <div>
            <label className="helix-label">Destination ({currency})</label>
            <select
              className="helix-input"
              value={accId}
              onChange={(e) => setAccId(e.target.value)}
              data-testid="w-account-select"
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label} — {a.bank_name} • {a.account_number_masked}
                  {a.is_default ? ' · default' : ''}
                </option>
              ))}
            </select>
            <div className="mt-1.5 text-[11px] text-[#9CA3AF]">
              <Link
                href="/finance/accounts"
                onClick={onClose}
                className="text-[#C9922A] hover:underline"
              >
                + Add another account
              </Link>
            </div>
          </div>
          <div>
            <label className="helix-label">Amount ({currency})</label>
            <input
              type="number"
              min={0}
              max={balance}
              className="helix-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-testid="w-amount"
            />
          </div>
          <div>
            <label className="helix-label">Narration / memo</label>
            <input
              className="helix-input"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              data-testid="w-narration"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={onClose} className="helix-btn-secondary flex-1">
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={busy || !amount || Number(amount) <= 0}
              className="helix-btn-primary flex-1"
              data-testid="w-submit"
            >
              {busy
                ? 'Sending…'
                : `Send ${currency.toUpperCase() === 'NGN' ? 'via NIP' : 'via ACH/Wire'}`}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
export default WithdrawModal;
