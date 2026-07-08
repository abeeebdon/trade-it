import type { DashboardData } from './types';

export const MOCK_DASHBOARD: DashboardData = {
  greeting_name: 'Chioma',
  stats: {
    total_orders: 12,
    in_transit: 3,
    favourites: 8,
    total_spent_usd: 2456.5,
  },
  active_orders: [
    {
      id: 'ord_001',
      order_number: 'JMP-2026-0781',
      product_name: 'Handwoven Aso Oke Fabric Bundle',
      status: 'at_customs',
      total_usd: 189.99,
      created_at: '2026-06-20T10:30:00Z',
      listing_photos: ['https://picsum.photos/seed/aso-oke/200/200'],
      journey: [
        { label: 'Order placed', completed: true, date: 'Jun 20' },
        { label: 'Packed', completed: true, date: 'Jun 22' },
        { label: 'Shipped', completed: true, date: 'Jun 25' },
        { label: 'At customs', completed: true, date: 'Jul 2' },
        { label: 'Out for delivery', completed: false },
      ],
    },
    {
      id: 'ord_002',
      order_number: 'JMP-2026-0829',
      product_name: 'Premium Shea Butter Gift Set (3-Pack)',
      status: 'shipped',
      total_usd: 74.5,
      created_at: '2026-06-28T14:15:00Z',
      listing_photos: ['https://picsum.photos/seed/shea-butter/200/200'],
      journey: [
        { label: 'Order placed', completed: true, date: 'Jun 28' },
        { label: 'Packed', completed: true, date: 'Jun 29' },
        { label: 'Shipped', completed: true, date: 'Jul 1' },
        { label: 'At customs', completed: false },
        { label: 'Out for delivery', completed: false },
      ],
    },
    {
      id: 'ord_003',
      order_number: 'JMP-2026-0912',
      product_name: 'Leather Laptop Sleeve – Brown',
      status: 'confirmed',
      total_usd: 129.0,
      created_at: '2026-07-03T08:45:00Z',
      listing_photos: ['https://picsum.photos/seed/leather-sleeve/200/200'],
      journey: [
        { label: 'Order placed', completed: true, date: 'Jul 3' },
        { label: 'Packed', completed: false },
        { label: 'Shipped', completed: false },
        { label: 'At customs', completed: false },
        { label: 'Out for delivery', completed: false },
      ],
    },
  ],
  buy_again: [
    {
      id: 'lst_101',
      title: 'Hand-dyed Ankara Print Fabric (6 Yards)',
      retail_price_usd: 45.0,
      photos: ['https://picsum.photos/seed/ankara/200/200'],
    },
    {
      id: 'lst_102',
      title: 'Organic Hibiscus Dried Flowers – 200g',
      retail_price_usd: 18.99,
      photos: ['https://picsum.photos/seed/hibiscus/200/200'],
    },
    {
      id: 'lst_103',
      title: 'Beaded Leather Sandals – Size 9',
      retail_price_usd: 62.0,
      photos: ['https://picsum.photos/seed/sandals/200/200'],
    },
    {
      id: 'lst_104',
      title: 'Hand-Carved Ebony Wood Serving Bowl',
      retail_price_usd: 89.5,
      photos: ['https://picsum.photos/seed/ebony-bowl/200/200'],
    },
    {
      id: 'lst_105',
      title: 'Nigerian Spice Rub Collection (4 Jars)',
      retail_price_usd: 34.99,
      photos: ['https://picsum.photos/seed/spice-rub/200/200'],
    },
    {
      id: 'lst_106',
      title: 'Cotton Kaftan – Navy Blue, XL',
      retail_price_usd: 55.0,
      photos: ['https://picsum.photos/seed/kaftan/200/200'],
    },
  ],
};
