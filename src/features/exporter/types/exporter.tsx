import { Icon } from '@phosphor-icons/react';
import { ReactNode } from 'react';

export interface StatProps {
  label: string;
  value: string | number;
  icon: Icon;
  accent?: boolean;
}
// types.ts

export type CurrencyCode = 'USD' | 'NGN' | 'EUR' | string;

export type SectorStat = {
  volume_usd: number;
  count: number;
};

export type OverviewType = {
  business_count: number;
  order_count: number;
  transaction_count: number;
  fees_collected_usd: number;

  total_volume_by_currency: Record<CurrencyCode, number>;
  by_sector: Record<string, SectorStat>;
};

export type VerificationStatus = 'pending' | 'approved' | 'rejected';
export type Verification = {
  id: string;
  business_name: string;
  country: string;
  sector: string;
  kyc_status: VerificationStatus;
  kyb_status: VerificationStatus;
  updated_at: string;
};

export interface VerificationItem {
  id: string;
  business_name: string;
  registration_type: string;
  country: string;
  sector: string;

  anchor_customer_id?: string;

  cac_number?: string;
  bvn?: string;
  tin?: string;
  ein?: string;

  director_name?: string;

  kyc_status: VerificationStatus;
  kyb_status: VerificationStatus;
}
type CreditStatus =
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'offered';

export interface CreditApplication {
  id: string;
  application_number: string;
  business_name: string;
  business_country: string;
  amount_usd: number;
  indicative_apr: number;
  term_months: number;
  risk_score: number;
  status: CreditStatus;
  created_at: string;
  snapshot_sales?: {
    total_volume_usd: number;
  };
}

export interface OfferState {
  offered_amount_usd: string;
  offered_apr: string;
  offered_term_months: string;
  decision_note: string;
}
export type DisputeStatus = 'open' | 'resolved' | 'rejected' | 'under_review';

export interface Dispute {
  id: string;
  reason: string;
  order_id: string;
  description: string;
  status: DisputeStatus;
  created_at: string;
}
export interface DisputeCardPRops {
  d: Dispute;
}
export type ProductStatus = 'active' | 'inactive' | 'draft';

export interface Product {
  id: string;
  business_id: string;
  name: string;
  category: string;
  description: string;
  photos: string[];
  price_ngn: number;
  price_usd: number;
  min_order_qty: number;
  unit: string;
  export_readiness_score: number;
  compliance_badges: string[];
  status: ProductStatus;
  created_at: string;
  country?: string;
}

export interface ProductCardPRops {
  p: Product;
}

//supplier
export type Supplier = {
  business_name: string;
  country: string;
  address: string;
  compliance_score: number;
  kyb_status: string;
  kyc_status: string;
  anchor_customer_id: string | null;
};

export type ProductData = {
  product: Product;
  supplier: Supplier;
};
export type FieldProps = {
  label: string;
  full?: boolean;
  children?: ReactNode;
};
