export interface AccountDetails {
  bank: string;
  account_number: string;
}
export interface FinanceDashboard {
  usd_balance: number;
  ngn_balance: number;

  virtual_accounts?: {
    usd?: AccountDetails;
    ngn?: AccountDetails;
  };
}

export interface Transaction {
  id: string;
  timestamp: string;
  type: 'credit' | 'debit' | 'transfer' | 'fee';
  description: string;
  anchor_transaction_ref: string;
  status: string;
  currency: 'USD' | 'NGN';
  amount: number;
}

export interface WithdrawalAccount {
  id: string;
  label: string;
  currency: 'USD' | 'NGN';
  bank_name: string;
  account_number_masked: string;
  is_default: boolean;
}
export interface BalanceBlockProps {
  label: string;
  balance: number;
  currency: 'USD' | 'NGN';
  count: number;
  accent?: boolean;
  va?: AccountDetails;
  onCopy: (value: string) => void;
}

export interface WithdrawalProps {
  currency: 'USD' | 'NGN';
  accounts: WithdrawalAccount[];
  balance: number;
  onClose: () => void;
}
