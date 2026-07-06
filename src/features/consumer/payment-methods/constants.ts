import type { PaymentMethod, PaymentKind } from './types';

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm_001',
    kind: 'card',
    label: 'Visa ···· 4242',
    exp_month: '08',
    exp_year: '2029',
    is_default: true,
  },
  {
    id: 'pm_002',
    kind: 'card',
    label: 'Mastercard ···· 8881',
    exp_month: '03',
    exp_year: '2028',
  },
  {
    id: 'pm_003',
    kind: 'zelle',
    label: 'chioma@email.com',
    is_default: false,
  },
  {
    id: 'pm_004',
    kind: 'ach',
    label: 'Chase Checking ···· 7732',
  },
];

export const PAYMENT_KINDS: { v: PaymentKind; l: string }[] = [
  { v: 'card', l: 'Credit / Debit Card' },
  { v: 'zelle', l: 'Zelle' },
  { v: 'ach', l: 'ACH Bank Transfer' },
];
