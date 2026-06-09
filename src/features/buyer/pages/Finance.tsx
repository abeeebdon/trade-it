'use client';
import { toast } from 'sonner';
import { useState } from 'react';
import BalanceBlock from '../components/BalanceBlock';
import WithdrawModal from '../components/WithdrawalModal';
import { Currency, DashboardData } from '../types/buyers';
import TransactionLedger from '../components/TransactionLedger';

interface WithdrawalAccount {
  id: string;
  currency: Currency;
  label: string;
  bank_name: string;
  account_number_masked: string;
  is_default?: boolean;
}

export default function Finance() {
  const [dash, setDash] = useState<DashboardData>({
    usd_balance: 12450,
    ngn_balance: 1850000,
    virtual_accounts: {
      usd: {
        account_id: 'HLX-USD-9201',
        account_number: 'HLX-USD-9201',
        bank: 'Anchor USD Bank',
      },
      ngn: {
        account_id: 'HLX-USD-9201',
        account_number: '8779683395',
        bank: 'Anchor Sandbox Bank',
      },
    },
  });

  const [accounts, setAccounts] = useState<WithdrawalAccount[]>([]);
  const [open, setOpen] = useState<Currency | null>(null);

  const load = () => {
    console.log('reload finance data');
  };

  const copy = (v: string) => {
    navigator.clipboard.writeText(v);
    toast.success('Copied');
  };

  const ngnAccs = accounts.filter((a) => a.currency.toUpperCase() === 'NGN');
  const usdAccs = accounts.filter((a) => a.currency.toUpperCase() === 'USD');

  return (
    <main>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <BalanceBlock
          currency="USD"
          label="USD Balance"
          balance={dash.usd_balance}
          va={dash.virtual_accounts?.usd}
          onCopy={copy}
          accent
          count={usdAccs.length}
        />

        <BalanceBlock
          currency="NGN"
          label="NGN Balance"
          balance={dash.ngn_balance}
          va={dash.virtual_accounts?.ngn}
          onCopy={copy}
          count={ngnAccs.length}
        />
      </div>
      <TransactionLedger />
      {open && (
        <WithdrawModal
          currency={open}
          accounts={accounts.filter((a) => a.currency === open)}
          balance={
            open.toUpperCase() === 'USD' ? dash.usd_balance : dash.ngn_balance
          }
          onClose={() => {
            setOpen(null);
            load();
          }}
        />
      )}
    </main>
  );
}
