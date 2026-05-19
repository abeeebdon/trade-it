'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useHeader } from '@/context/HeaderContext';
import BalanceBlock from '../components/BalanceBlock';
import FinanceHeaderActions from '../components/FinanceHeaderActions';
import WithdrawModal from '../modals/WithdrawModal';

import {
  FinanceDashboard,
  Transaction,
  WithdrawalAccount,
} from '../types/finance';

import { formatDateTime, formatNGN, formatUSD } from '@/lib/func';

import { StatusPill } from '@/features/shops/components/StatusPill';

export default function Finance() {
  const { setHeader } = useHeader();

  const [open, setOpen] = useState<'USD' | 'NGN' | null>(null);

  const [dashboard] = useState<FinanceDashboard | null>(
    () =>
      ({
        usd_balance: 12540,
        ngn_balance: 4850000,

        virtual_accounts: {
          usd: {
            bank: 'Anchor',
            account_number: '1039485721',
          },

          ngn: {
            bank: 'Providus Bank',
            account_number: '9023847561',
          },
        },
      }) as FinanceDashboard,
  );

  const [transactions] = useState<Transaction[]>(
    () =>
      [
        {
          id: 'tx-1',
          timestamp: new Date().toISOString(),
          type: 'credit',
          currency: 'USD',
          amount: 2400,
          description: 'Export payout settlement',
          anchor_transaction_ref: 'ANCH-20932',
          status: 'completed',
        },

        {
          id: 'tx-2',
          timestamp: new Date().toISOString(),
          type: 'debit',
          currency: 'NGN',
          amount: 150000,
          description: 'Local supplier transfer',
          anchor_transaction_ref: 'ANCH-77441',
          status: 'processing',
        },
      ] as Transaction[],
  );

  const [accounts, setAccounts] = useState<WithdrawalAccount[]>(
    () =>
      [
        {
          id: '1',
          currency: 'USD',
          bank_name: 'Bank of America',
          account_number_masked: '****9087',
          label: 'Primary USD',
          is_default: true,
        },

        {
          id: '2',
          currency: 'NGN',
          bank_name: 'GTBank',
          account_number_masked: '****2211',
          label: 'Main NGN',
          is_default: true,
        },
      ] as WithdrawalAccount[],
  );

  const [currencyFilter, setCurrencyFilter] = useState('');

  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    setHeader({
      title: 'Financial Command',

      kicker: 'NGN · USD · Anchor',

      action: (
        <FinanceHeaderActions
          onWithdrawNGN={() => setOpen('NGN')}
          onWithdrawUSD={() => setOpen('USD')}
        />
      ),
    });

    return () => setHeader(null);
  }, [setHeader]);

  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value);

    toast.success('Copied');
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const currencyMatch = !currencyFilter || tx.currency === currencyFilter;

      const typeMatch = !typeFilter || tx.type === typeFilter;

      return currencyMatch && typeMatch;
    });
  }, [transactions, currencyFilter, typeFilter]);

  return (
    <>
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BalanceBlock
          label="USD Balance"
          currency="USD"
          balance={dashboard?.usd_balance || 0}
          va={dashboard?.virtual_accounts?.usd}
          count={accounts.filter((a) => a.currency === 'USD').length}
          accent
          onCopy={copy}
        />

        <BalanceBlock
          label="NGN Balance"
          currency="NGN"
          balance={dashboard?.ngn_balance || 0}
          va={dashboard?.virtual_accounts?.ngn}
          count={accounts.filter((a) => a.currency === 'NGN').length}
          onCopy={copy}
        />
      </div>

      {/* Transaction Ledger */}
      <div className="helix-card mt-6">
        {/* Header */}
        <div className="px-4 sm:px-5 py-4 border-b border-[#1A7A6E]/20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="helix-label">Transaction Ledger</div>

            <div className="helix-h3 mt-1">
              {filteredTransactions.length} transaction(s)
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              className="helix-input w-full sm:w-36"
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
            >
              <option value="">All ccy</option>

              <option value="USD">USD</option>

              <option value="NGN">NGN</option>
            </select>

            <select
              className="helix-input w-full sm:w-40"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All types</option>

              <option value="credit">Credit</option>

              <option value="debit">Debit</option>

              <option value="transfer">Transfer</option>
            </select>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="block lg:hidden p-4 space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-10 text-[#9CA3AF]">
              No transactions found.
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="rounded-2xl border border-[#1A7A6E]/15 p-4 bg-[#0F172A]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{tx.description}</p>

                    <p className="text-xs text-[#9CA3AF] mt-1 font-mono">
                      {formatDateTime(tx.timestamp)}
                    </p>
                  </div>

                  <StatusPill status={tx.status} />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF]">
                      {tx.type}
                    </p>

                    <p className="font-mono text-xs text-[#1A7A6E] mt-1">
                      {tx.anchor_transaction_ref}
                    </p>
                  </div>

                  <div
                    className={`font-mono text-sm font-semibold ${
                      tx.type === 'credit' ? 'text-[#C9922A]' : 'text-[#F5F5F5]'
                    }`}
                  >
                    {tx.type === 'credit' ? '+' : '-'}

                    {tx.currency === 'USD'
                      ? formatUSD(tx.amount)
                      : formatNGN(tx.amount)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="helix-table min-w-full">
            <thead>
              <tr>
                <th>When</th>
                <th>Type</th>
                <th>Description</th>
                <th>Reference</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-[#9CA3AF]">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="font-mono text-[12px] text-[#9CA3AF]">
                      {formatDateTime(tx.timestamp)}
                    </td>

                    <td className="uppercase text-[11px] font-mono tracking-wider">
                      {tx.type}
                    </td>

                    <td className="max-w-sm truncate">{tx.description}</td>

                    <td className="font-mono text-[11px] text-[#1A7A6E]">
                      {tx.anchor_transaction_ref}
                    </td>

                    <td>
                      <StatusPill status={tx.status} />
                    </td>

                    <td
                      className={`font-mono text-right ${
                        tx.type === 'credit'
                          ? 'text-[#C9922A]'
                          : 'text-[#F5F5F5]'
                      }`}
                    >
                      {tx.type === 'credit' ? '+' : '-'}

                      {tx.currency === 'USD'
                        ? formatUSD(tx.amount)
                        : formatNGN(tx.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw Modal */}
      {open && (
        <WithdrawModal
          currency={open}
          balance={
            open === 'USD'
              ? dashboard?.usd_balance || 0
              : dashboard?.ngn_balance || 0
          }
          accounts={accounts.filter((a) => a.currency === open)}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
