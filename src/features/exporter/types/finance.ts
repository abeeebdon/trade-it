export interface FinanceDashboard {
  usd_balance: number;
  ngn_balance: number;

  virtual_accounts?: {
    usd?: {
      bank: string;
      account_number: string;
    };

    ngn?: {
      bank: string;
      account_number: string;
    };
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
