import type { ShoppingList } from './types';

export const MOCK_LISTS: ShoppingList[] = [
  {
    id: 'list_001',
    name: 'Monthly Groceries',
    item_count: 8,
    preview: [
      { id: 'p1', photos: ['https://picsum.photos/seed/grocery1/100/100'] },
      { id: 'p2', photos: ['https://picsum.photos/seed/grocery2/100/100'] },
      { id: 'p3', photos: ['https://picsum.photos/seed/grocery3/100/100'] },
    ],
  },
  {
    id: 'list_002',
    name: 'Care Package for Mum',
    item_count: 12,
    preview: [
      { id: 'p4', photos: ['https://picsum.photos/seed/care1/100/100'] },
      { id: 'p5', photos: ['https://picsum.photos/seed/care2/100/100'] },
      { id: 'p6', photos: ['https://picsum.photos/seed/care3/100/100'] },
    ],
  },
  {
    id: 'list_003',
    name: 'Restaurant Supplies',
    item_count: 5,
    preview: [
      { id: 'p7', photos: ['https://picsum.photos/seed/supply1/100/100'] },
      { id: 'p8', photos: ['https://picsum.photos/seed/supply2/100/100'] },
    ],
  },
  {
    id: 'list_004',
    name: 'Wedding Prep',
    item_count: 0,
  },
  {
    id: 'list_005',
    name: 'Office Snacks',
    item_count: 3,
    preview: [
      { id: 'p9', photos: ['https://picsum.photos/seed/snack1/100/100'] },
    ],
  },
  {
    id: 'list_006',
    name: 'Gift Ideas',
    item_count: 7,
    preview: [
      { id: 'p10', photos: ['https://picsum.photos/seed/gift1/100/100'] },
      { id: 'p11', photos: ['https://picsum.photos/seed/gift2/100/100'] },
      { id: 'p12', photos: ['https://picsum.photos/seed/gift3/100/100'] },
    ],
  },
];
