'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import AccountSectionCard from './AccountSectionCard';
import BankAccountSkeleton from './BankActionSkeletonLoader';
import { useState } from 'react';
import {
  removeWithdrawalAccount,
  setDefaultWithdrawalAccount,
} from '@/store/withdrawalAccounts/withdrawalAccounts.slice';
import { toast } from 'sonner';

export default function AccountSection() {
  const accounts = useAppSelector((state) => state.withdrawalAccounts.accounts);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const items = accounts.filter((a) => a.currency === 'NGN');

  const setDefault = (id: string) => {
    dispatch(setDefaultWithdrawalAccount(id));
    toast.success('Set as default');
  };

  // Remove / deactivate
  const remove = (id: string) => {
    dispatch(removeWithdrawalAccount(id));
    toast.success('Account deactivated');
  };

  return (
    <section className="">
      {loading ? (
        <div className="grid md:grid-cols-2 gap-3">
          {[0, 1].map((i) => (
            <BankAccountSkeleton key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-mute text-[13px] py-3">
          No NGN accounts. Add one to withdraw via NIP.
        </div>
      ) : (
        <section className="grid  md:grid-cols-2 gap-3">
          {items.map((a) => (
            <AccountSectionCard
              key={a.id}
              a={a}
              onDefault={setDefault}
              onRemove={remove}
            />
          ))}
        </section>
      )}
    </section>
  );
}
