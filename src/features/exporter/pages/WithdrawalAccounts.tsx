'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useHeader } from '@/context/HeaderContext';
import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import type { WithdrawalAccount, NgnBank } from '../types/exporter';
import { mockNgnBanks } from '../components/data';
import AccountSection from '../components/AccountSection';
import AddAccountModal from '../modals/AddAccountModal';
import {
  addWithdrawalAccount,
  setWithdrawalAccounts,
} from '@/store/withdrawalAccounts/withdrawalAccounts.slice';
import BackButton from '@/components/buttons/BackButton';

// WithdrawalAccounts
export default function WithdrawalAccounts() {
  const { setHeader } = useHeader();
  const [open, setOpen] = useState(false);
  const [banks, setBanks] = useState<NgnBank[]>([]);
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.withdrawalAccounts.accounts);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setWithdrawalAccounts(accounts.length ? accounts : []));
      setBanks(mockNgnBanks);
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);
  const handleSaved = (account: WithdrawalAccount) => {
    dispatch(addWithdrawalAccount(account));
  };
  // Dynamic header with CTA button
  useEffect(() => {
    setHeader({
      title: 'Withdrawal Accounts',
      kicker: 'Pre-approved · NGN + USD',
      action: (
        <button
          onClick={() => setOpen(true)}
          className="helix-btn-primary inline-flex items-center gap-2"
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

  return (
    <main className="overflow-auto w-full h-full max-w-2xl">
      <BackButton title="Back to Finance" path="/exporter/finance" />
      <p className="text-[13px] text-muted my-4 leading-relaxed">
        Save your destination bank accounts once.{' '}
      </p>

      {/* NGN accounts */}
      <AccountSection />

      {/* Back link */}

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
    </main>
  );
}
