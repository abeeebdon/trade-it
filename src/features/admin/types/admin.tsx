import { Icon } from '@phosphor-icons/react';

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
