'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Plus, Globe, Building2 } from 'lucide-react';
import { useHeader } from '@/context/HeaderContext';
import type { WithdrawalAccount, NgnBank } from '../types/exporter';
import { mockWithdrawalAccounts, mockNgnBanks } from '../components/data';
import AccountSection from '../components/AccountSection';
import AddAccountModal from '../modals/AddAccountModal';

// WithdrawalAccounts
export default function WithdrawalAccounts() {
  const { setHeader } = useHeader();

  const [accounts, setAccounts] = useState<WithdrawalAccount[]>([]);
  const [banks, setBanks] = useState<NgnBank[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAccounts(mockWithdrawalAccounts);
      setBanks(mockNgnBanks);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Dynamic header with CTA button
  useEffect(() => {
    setHeader({
      title: 'Withdrawal Accounts',
      kicker: 'Pre-approved · NGN + USD',
      action: (
        <button
          onClick={() => setOpen(true)}
          className="helix-btn-primary inline-flex items-center gap-2"
          data-testid="add-account-btn"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Add account</span>
          <span className="sm:hidden">Add</span>
        </button>
      ),
    });

    return () => {
      setHeader(null);
    };
  }, [setHeader]);

  // Set as default
  const setDefault = (id: string) => {
    setAccounts((prev) => {
      const target = prev.find((a) => a.id === id);
      if (!target) return prev;
      return prev.map((a) =>
        a.currency === target.currency ? { ...a, is_default: a.id === id } : a,
      );
    });
    toast.success('Set as default');
  };

  // Remove / deactivate
  const remove = (id: string) => {
    const confirmed = window.confirm(
      'Deactivate this account? Existing withdrawals to it stay in your history.',
    );
    if (!confirmed) return;
    setAccounts((prev) => prev.filter((a) => a.id !== id));
    toast.success('Account deactivated');
  };

  // Save new account from modal
  const handleSaved = (account: WithdrawalAccount) => {
    setAccounts((prev) => {
      // If new account is default, unset others in same currency
      if (account.is_default) {
        return [
          ...prev.map((a) =>
            a.currency === account.currency ? { ...a, is_default: false } : a,
          ),
          account,
        ];
      }
      return [...prev, account];
    });
  };

  const usdAccounts = accounts.filter((a) => a.currency === 'USD');
  const ngnAccounts = accounts.filter((a) => a.currency === 'NGN');

  return (
    <>
      {/* Intro text */}
      <p className="text-[13px] text-[#9CA3AF] mb-6 max-w-2xl leading-relaxed">
        Save your destination bank accounts once. Add multiple in NGN and USD,
        mark a default per currency, and then withdraw to them with a single
        click — no need to retype routing numbers each time.
      </p>

      {/* USD accounts */}
      <AccountSection
        title="USD accounts"
        icon={Globe}
        items={usdAccounts}
        loading={loading}
        empty="No USD accounts. Add one to receive USD payouts."
        testid="usd-accounts"
        onDefault={setDefault}
        onRemove={remove}
      />

      {/* NGN accounts */}
      <AccountSection
        title="NGN accounts"
        icon={Building2}
        items={ngnAccounts}
        loading={loading}
        empty="No NGN accounts. Add one to withdraw via NIP."
        testid="ngn-accounts"
        onDefault={setDefault}
        onRemove={remove}
      />

      {/* Back link */}
      <div className="mt-8 flex items-center justify-between">
        <Link
          href="/exporter/finance"
          className="text-[12px] text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors"
        >
          ← Back to Finance
        </Link>
      </div>

      {/* Add account modal */}
      {open && (
        <AddAccountModal
          banks={banks}
          onClose={() => setOpen(false)}
          onSaved={(account) => {
            handleSaved(account);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
