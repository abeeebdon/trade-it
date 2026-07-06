import type { Address } from './types';

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 'addr_001',
    label: 'Home',
    recipient_name: 'Chioma Okonkwo',
    line1: '451 Maple Ave',
    line2: 'Apt 3B',
    city: 'Houston',
    state: 'TX',
    postal_code: '77002',
    country: 'United States',
    phone: '+1 202 555 0147',
    is_default: true,
  },
  {
    id: 'addr_002',
    label: 'Office',
    recipient_name: 'Chioma Okonkwo',
    line1: '2800 Post Oak Blvd',
    city: 'Houston',
    state: 'TX',
    postal_code: '77056',
    country: 'United States',
  },
  {
    id: 'addr_003',
    label: "Sister's Place",
    recipient_name: 'Nneka Okonkwo',
    line1: '1420 Washington Ave',
    line2: 'Unit 7',
    city: 'Miami',
    state: 'FL',
    postal_code: '33139',
    country: 'United States',
    phone: '+1 305 555 0234',
  },
];
