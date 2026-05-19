'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import type {
  AccountCurrency,
  //   AccountType,
  NgnBank,
  WithdrawalAccount,
  WithdrawalAccountForm,
} from '../types/exporter';

interface AddAccountModalProps {
  banks: NgnBank[];
  onClose: () => void;
  onSaved: (account: WithdrawalAccount) => void;
}

const defaultForm: WithdrawalAccountForm = {
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

export default function AddAccountModal({
  banks,
  onClose,
  onSaved,
}: AddAccountModalProps) {
  const [currency, setCurrency] = useState<AccountCurrency>('USD');
  const [form, setForm] = useState<WithdrawalAccountForm>(defaultForm);
  const [busy, setBusy] = useState(false);

  const upd =
    (k: keyof WithdrawalAccountForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const save = async () => {
    if (!form.account_name.trim()) {
      toast.error('Account holder name is required');
      return;
    }
    if (currency === 'NGN' && form.account_number.length !== 10) {
      toast.error('NGN account number must be 10 digits');
      return;
    }
    if (currency === 'USD' && !form.bank_name.trim()) {
      toast.error('Bank name is required');
      return;
    }

    setBusy(true);
    try {
      await new Promise((res) => setTimeout(res, 600));

      // Build the saved account object
      const bankName =
        currency === 'NGN'
          ? (banks.find((b) => b.code === form.bank_code)?.name ?? '')
          : form.bank_name;

      const saved: WithdrawalAccount = {
        id: `wa-${Date.now()}`,
        label:
          form.label || (currency === 'USD' ? 'USD Account' : 'NGN Account'),
        currency,
        bank_name: bankName,
        account_number_masked: `••••••${form.account_number.slice(-4)}`,
        account_name: form.account_name,
        account_type: currency === 'USD' ? form.account_type : undefined,
        routing_number: currency === 'USD' ? form.routing_number : undefined,
        swift_code:
          currency === 'USD' && form.swift_code ? form.swift_code : undefined,
        is_default: form.is_default,
        approval_status: 'approved',
      };

      onSaved(saved);
      toast.success('Account added & approved');
      onClose();
    } catch {
      toast.error('Failed to add account');
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
        data-testid="add-account-modal"
      >
        <h3 className="helix-h3">Add withdrawal account</h3>

        {/* Currency toggle */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => setCurrency('USD')}
            className={`p-3 border rounded text-[13px] transition ${
              currency === 'USD'
                ? 'border-[#C9922A] bg-[#C9922A]/8 text-[#F5F5F5]'
                : 'border-[#1A7A6E]/30 text-[#9CA3AF]'
            }`}
            data-testid="ccy-USD"
          >
            USD · ACH / Wire
          </button>
          <button
            onClick={() => setCurrency('NGN')}
            className={`p-3 border rounded text-[13px] transition ${
              currency === 'NGN'
                ? 'border-[#C9922A] bg-[#C9922A]/8 text-[#F5F5F5]'
                : 'border-[#1A7A6E]/30 text-[#9CA3AF]'
            }`}
            data-testid="ccy-NGN"
          >
            NGN · NIP
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {/* Nickname */}
          <div>
            <label className="helix-label">Nickname</label>
            <input
              className="helix-input"
              placeholder={
                currency === 'USD' ? 'Chase business · primary' : 'GTBank Lagos'
              }
              value={form.label}
              onChange={upd('label')}
              data-testid="acc-label"
            />
          </div>

          {/* Account holder */}
          <div>
            <label className="helix-label">Account holder name</label>
            <input
              className="helix-input"
              value={form.account_name}
              onChange={upd('account_name')}
              required
              data-testid="acc-name"
            />
          </div>

          {/* NGN fields */}
          {currency === 'NGN' ? (
            <>
              <div>
                <label className="helix-label">Bank</label>
                <select
                  className="helix-input"
                  value={form.bank_code}
                  onChange={upd('bank_code')}
                  data-testid="acc-bank-code"
                >
                  {banks.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="helix-label">
                  Account number (10 digits)
                </label>
                <input
                  className="helix-input"
                  maxLength={10}
                  value={form.account_number}
                  onChange={upd('account_number')}
                  required
                  data-testid="acc-number"
                />
              </div>
            </>
          ) : (
            <>
              {/* USD fields */}
              <div>
                <label className="helix-label">Bank name</label>
                <input
                  className="helix-input"
                  placeholder="Chase, Bank of America, Wells Fargo…"
                  value={form.bank_name}
                  onChange={upd('bank_name')}
                  required
                  data-testid="acc-usd-bank"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="helix-label">
                    Routing # (9 digits ACH)
                  </label>
                  <input
                    className="helix-input"
                    maxLength={9}
                    value={form.routing_number}
                    onChange={upd('routing_number')}
                    data-testid="acc-routing"
                  />
                </div>
                <div>
                  <label className="helix-label">Account type</label>
                  <select
                    className="helix-input"
                    value={form.account_type}
                    onChange={upd('account_type')}
                    data-testid="acc-type"
                  >
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="helix-label">Account number</label>
                <input
                  className="helix-input"
                  value={form.account_number}
                  onChange={upd('account_number')}
                  required
                  data-testid="acc-number"
                />
              </div>
              <div>
                <label className="helix-label">
                  SWIFT (optional, for wires)
                </label>
                <input
                  className="helix-input"
                  maxLength={11}
                  value={form.swift_code}
                  onChange={upd('swift_code')}
                  data-testid="acc-swift"
                />
              </div>
            </>
          )}

          {/* Default checkbox */}
          <label className="flex items-center gap-2 text-[12px] text-[#9CA3AF] cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_default}
              onChange={(e) =>
                setForm({ ...form, is_default: e.target.checked })
              }
            />
            Set as default {currency} destination
          </label>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button onClick={onClose} className="helix-btn-secondary flex-1">
              Cancel
            </button>
            <button
              onClick={save}
              disabled={busy}
              className="helix-btn-primary flex-1"
              data-testid="acc-save"
            >
              {busy ? 'Saving…' : 'Add account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
