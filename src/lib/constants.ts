export const PER_PAGE = 15;

export const TRANSACTION_TYPES = ['credit', 'debit', 'transfer', 'fee'];

export const UNITS = [
  { id: 1, label: 'Piece' },
  { id: 2, label: 'Kg' },
  { id: 3, label: 'Bag' },
  { id: 4, label: 'Roll' },
  { id: 5, label: 'Set' },
  { id: 6, label: 'Litre' },
  { id: 7, label: 'Carton' },
];

export const STATUSES = [
  { id: 1, label: 'Draft', value: 'draft' },
  { id: 2, label: 'Active (published)', value: 'active' },
  { id: 3, label: 'Archived', value: 'archived' },
];

export const DEFAULT_CURRENCY_ID = 1;

export const CATS = [
  { value: 'fashion', label: 'Fashion' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'staple-foods', label: 'Staple Foods' },
  { value: 'general-goods', label: 'General Goods' },
];

export const LIFECYCLE = [
  'draft',
  'confirmed',
  'in_production',
  'ready_to_ship',
  'shipped',
  'delivered',
];
