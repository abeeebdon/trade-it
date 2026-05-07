import { Dispatch, SetStateAction } from 'react';

type Currency = 'ngn' | 'usd';

type KYCStatus = 'pending' | 'approved' | 'rejected';
type KYBStatus = 'pending' | 'approved' | 'rejected';

export interface VirtualAccount {
  account_number: string;
  account_id: string;
  bank: string;
}

export interface VirtualAccounts {
  ngn: VirtualAccount;
  usd: VirtualAccount;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: Currency;
  type: string;
  created_at: string;
  description?: string;
  timestamp: string;
  anchor_transaction_ref: string;
}

export interface BuyerDashboardData {
  ngn_balance: number;
  usd_balance: number;
  recent_transactions: Transaction[];
  virtual_accounts: VirtualAccounts;
  anchor_customer_id: string;
  kyc_status: KYCStatus;
  kyb_status: KYBStatus;
}

export type FXRate = {
  usd_to_ngn: number;
  fetched_at: number;
  source: string;
};

export type Order = {
  id: string;
  order_number: string;
  product_name: string;
  quantity: number;
  agreed_price_usd: number;
  status: string;
  payment_status: string;
};

export type ComplianceScore = {
  score: number;
  missing: string[];
};

export interface KYCForm {
  cac_number: string;
  tin: string;
  director_name: string;
  bvn: string;
  nin: string;
  docs: File[];
}
export interface Business {
  id: string;
  business_name: string;
  sector: string;
  country: string;
  anchor_customer_id: string;

  kyc_status: 'pending' | 'approved' | 'rejected' | 'under_review';
  kyb_status: 'pending' | 'approved' | 'rejected' | 'under_review';
  anchor_account_ngn: string;
  registration_type: 'business' | 'individual';

  anchor_ngn_virtual_account?: string;
  anchor_usd_virtual_account?: string;
  compliance_score?: number;
}

export interface ProfileStep2Props {
  biz: Business;
  kycForm: KYCForm;
  setKycForm: Dispatch<SetStateAction<KYCForm>>;
}
export interface SteppersProps {
  biz: Business;
  step: number;
}
export interface ProfileStep1Props {
  setStep: Dispatch<SetStateAction<number>>;
  createBiz: (biz: Business) => void;
}
