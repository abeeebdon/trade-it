// mock.ts

import { OverviewType, Verification, VerificationItem } from '../types/admin';

export const mockOverview: OverviewType = {
  business_count: 128,
  order_count: 542,
  transaction_count: 789,
  fees_collected_usd: 12450,

  total_volume_by_currency: {
    USD: 95000,
    NGN: 42000000,
    EUR: 12000,
  },

  by_sector: {
    fashion: { volume_usd: 32000, count: 120 },
    beauty: { volume_usd: 18000, count: 90 },
    food: { volume_usd: 45000, count: 210 },
    electronics: { volume_usd: 12000, count: 60 },
  },
};

export const mockVerifications: Verification[] = [
  {
    id: 'v1',
    business_name: 'Lagos Textiles Ltd',
    country: 'Nigeria',
    sector: 'fashion',
    kyc_status: 'approved',
    kyb_status: 'pending',
    updated_at: '2026-04-28T10:00:00Z',
  },
  {
    id: 'v2',
    business_name: 'Accra Shea Co.',
    country: 'Ghana',
    sector: 'beauty',
    kyc_status: 'pending',
    kyb_status: 'pending',
    updated_at: '2026-04-29T14:20:00Z',
  },
  {
    id: 'v3',
    business_name: 'Addis Coffee Export',
    country: 'Ethiopia',
    sector: 'food',
    kyc_status: 'approved',
    kyb_status: 'approved',
    updated_at: '2026-04-27T08:15:00Z',
  },
];
export const sampleVerifications: VerificationItem[] = [
  {
    id: 'verif-001',
    business_name: 'Lagos Agro Exports Ltd',
    registration_type: 'LLC',
    country: 'Nigeria',
    sector: 'agriculture',
    anchor_customer_id: 'anchor-88921',
    cac_number: 'RC-1293847',
    bvn: '22345678901',
    tin: 'TIN-99887766',
    director_name: 'Adebayo Ogunleye',
    kyc_status: 'pending',
    kyb_status: 'pending',
  },
  {
    id: 'verif-002',
    business_name: 'Accra Shea Butter Co.',
    registration_type: 'Partnership',
    country: 'Ghana',
    sector: 'beauty',
    bvn: '33445566778',
    director_name: 'Ama Mensah',
    kyc_status: 'approved',
    kyb_status: 'pending',
  },
  {
    id: 'verif-003',
    business_name: 'Nairobi Coffee Exporters',
    registration_type: 'Corporation',
    country: 'Kenya',
    sector: 'food',
    ein: 'EIN-55443322',
    director_name: 'David Mwangi',
    kyc_status: 'approved',
    kyb_status: 'approved',
  },
  {
    id: 'verif-004',
    business_name: 'Cape Textiles Studio',
    registration_type: 'Sole Proprietorship',
    country: 'South Africa',
    sector: 'fashion',
    tin: 'TIN-11223344',
    director_name: 'Thandi Nkosi',
    kyc_status: 'rejected',
    kyb_status: 'rejected',
  },
];
