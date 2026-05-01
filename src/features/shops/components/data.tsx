import { Order, Quote } from '../types/shops';

export const CATS = [
  { value: '', label: 'All' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'staple-foods', label: 'Staple Foods' },
  { value: 'general-goods', label: 'General' },
];

export type Listing = {
  id: string;
  owner_business_id: string;
  title: string;
  description: string;
  photos: string[];
  category: string;
  retail_price_usd: number;
  stock_qty: number;
  fulfillment_mode: 'riby_dtc' | 'buyer_local' | string;
  source_product_id: string;
  country_of_origin: string;
  ships_from: string;
  delivery_partner_of_record: string;
  status: 'active' | 'inactive' | string;
  created_at: string;
  seller_name: string;
  seller_country: string;
};
export const goodslistings: Listing[] = [
  {
    id: 'd8c6e108-d538-48b3-be6f-7c10a3bf1fd2',
    owner_business_id: '19e8e37e-a736-42d0-a2ee-f4c07108ea5f',
    title: 'Handwoven Adire Scarf — Lagos Artisan Edition',
    description:
      'Hand-dyed Adire indigo scarf (180×50cm) from Abeokuta artisans.',
    photos: ['https://images.unsplash.com/photo-1528459105426-b9548367069b'],
    category: 'fashion',
    retail_price_usd: 89.0,
    stock_qty: 41,
    fulfillment_mode: 'riby_dtc',
    source_product_id: '3bdd0f9d-6bf4-44e3-91f7-0d4e62a154a2',
    country_of_origin: 'Nigeria',
    ships_from: 'Lagos → Riby US fulfillment',
    delivery_partner_of_record: 'Riby Inc',
    status: 'active',
    created_at: '2026-04-22T04:43:07.710505+00:00',
    seller_name: 'Lagos Heritage Textiles Ltd',
    seller_country: 'Nigeria',
  },

  {
    id: 'a1b2c3d4-e111-2222-3333-444455556666',
    owner_business_id: 'biz-001',
    title: 'Shea Butter Body Cream — Raw Organic',
    description:
      'Unrefined shea butter whipped into a rich moisturizing cream.',
    photos: ['https://images.unsplash.com/photo-1600180758890-6c8c0f2f76f4'],
    category: 'beauty',
    retail_price_usd: 24.5,
    stock_qty: 120,
    fulfillment_mode: 'riby_dtc',
    source_product_id: 'src-001',
    country_of_origin: 'Ghana',
    ships_from: 'Accra → Riby US fulfillment',
    delivery_partner_of_record: 'Riby Inc',
    status: 'active',
    created_at: '2026-04-20T10:20:00Z',
    seller_name: 'Golden Shea Co.',
    seller_country: 'Ghana',
  },

  {
    id: 'b2c3d4e5-f777-8888-9999-000011112222',
    owner_business_id: 'biz-002',
    title: 'Premium Ethiopian Coffee Beans — 1kg',
    description:
      'Single-origin Arabica beans sourced from Ethiopian highlands.',
    photos: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93'],
    category: 'food',
    retail_price_usd: 32.0,
    stock_qty: 15,
    fulfillment_mode: 'buyer_local',
    source_product_id: 'src-002',
    country_of_origin: 'Ethiopia',
    ships_from: 'New Jersey Warehouse',
    delivery_partner_of_record: 'Local Distributor',
    status: 'active',
    created_at: '2026-04-18T08:15:00Z',
    seller_name: 'Addis Coffee Export',
    seller_country: 'Ethiopia',
  },

  {
    id: 'c3d4e5f6-aaaa-bbbb-cccc-ddddeeeeffff',
    owner_business_id: 'biz-003',
    title: 'Ankara Print Fabric — Vibrant Patterns',
    description:
      'High-quality Ankara fabric sold per yard with bold African prints.',
    photos: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'],
    category: 'fashion',
    retail_price_usd: 12.0,
    stock_qty: 200,
    fulfillment_mode: 'riby_dtc',
    source_product_id: 'src-003',
    country_of_origin: 'Nigeria',
    ships_from: 'Lagos → Riby US fulfillment',
    delivery_partner_of_record: 'Riby Inc',
    status: 'active',
    created_at: '2026-04-19T14:00:00Z',
    seller_name: 'Ankara Hub',
    seller_country: 'Nigeria',
  },

  {
    id: 'd4e5f6g7-1111-2222-3333-4444aaaa5555',
    owner_business_id: 'biz-004',
    title: 'Moroccan Argan Oil — 100% Pure',
    description: 'Cold-pressed argan oil ideal for skin and hair care.',
    photos: ['https://images.unsplash.com/photo-1596464716127-f2a82984de30'],
    category: 'beauty',
    retail_price_usd: 45.0,
    stock_qty: 8,
    fulfillment_mode: 'buyer_local',
    source_product_id: 'src-004',
    country_of_origin: 'Morocco',
    ships_from: 'California Warehouse',
    delivery_partner_of_record: 'Local Distributor',
    status: 'active',
    created_at: '2026-04-21T12:30:00Z',
    seller_name: 'Atlas Naturals',
    seller_country: 'Morocco',
  },
];
export const testOrders: Order[] = [
  {
    id: 'o-001',
    order_number: 'ORD-2026-1001',
    listing_title: 'Handwoven Adire Scarf — Lagos Artisan Edition',
    quantity: 5,
    unit_price_usd: 89,
    total_usd: 445,

    checkout_mode: 'instant',

    delivery_partner_of_record: 'Riby Inc',
    tracking_number: 'RB123456789US',

    status: 'shipped',
    escrow_status: 'held',
    escrow_held_by: 'Riby Inc',

    created_at: '2026-04-25T10:00:00Z',

    shipping_name: 'Abeeb Maroof',
    shipping_address: 'Ibadan, Oyo State, Nigeria',
  },

  {
    id: 'o-002',
    order_number: 'ORD-2026-1002',
    listing_title: 'Shea Butter Body Cream — Raw Organic',
    quantity: 10,
    unit_price_usd: 24.5,
    total_usd: 245,

    checkout_mode: 'quote_prepay',

    delivery_partner_of_record: 'Riby Inc',

    status: 'delivered',
    escrow_status: 'held',

    created_at: '2026-04-20T14:30:00Z',

    shipping_name: 'Abeeb Maroof',
    shipping_address: 'Ibadan, Oyo State, Nigeria',
  },

  {
    id: 'o-003',
    order_number: 'ORD-2026-1003',
    listing_title: 'Premium Ethiopian Coffee Beans — 1kg',
    quantity: 2,
    unit_price_usd: 32,
    total_usd: 64,

    checkout_mode: 'instant',

    status: 'pending',
    escrow_status: 'held',

    created_at: '2026-04-28T09:15:00Z',

    shipping_name: 'Abeeb Maroof',
    shipping_address: 'Ibadan, Oyo State, Nigeria',
  },

  {
    id: 'o-004',
    order_number: 'ORD-2026-1004',
    listing_title: 'Moroccan Argan Oil — 100% Pure',
    quantity: 1,
    unit_price_usd: 45,
    total_usd: 45,

    checkout_mode: 'instant',

    delivery_partner_of_record: 'Local Distributor',
    tracking_number: 'US-TRACK-998877',

    status: 'delivered',
    escrow_status: 'released',

    created_at: '2026-04-18T12:00:00Z',

    shipping_name: 'Abeeb Maroof',
    shipping_address: 'Ibadan, Oyo State, Nigeria',
  },
];
export const testQuotes: Quote[] = [
  {
    id: 'q-001',
    quote_number: 'QT-2026-0001',
    listing_id: 'd8c6e108-d538-48b3-be6f-7c10a3bf1fd2',
    listing_title: 'Handwoven Adire Scarf — Lagos Artisan Edition',
    quantity: 20,
    message: 'Looking for bulk discount for retail store',
    status: 'quoted',

    quoted_unit_price_usd: 72,
    quoted_total_usd: 1440,
    quote_valid_until: '2026-05-10',
    quote_note: 'Discount applied for 20+ units',
  },

  {
    id: 'q-002',
    quote_number: 'QT-2026-0002',
    listing_id: 'a1b2c3d4-e111-2222-3333-444455556666',
    listing_title: 'Shea Butter Body Cream — Raw Organic',
    quantity: 50,
    status: 'pending',
    message: 'Need wholesale pricing',
  },

  {
    id: 'q-003',
    quote_number: 'QT-2026-0003',
    listing_id: 'b2c3d4e5-f777-8888-9999-000011112222',
    listing_title: 'Premium Ethiopian Coffee Beans — 1kg',
    quantity: 10,
    status: 'declined',
    message: 'Too expensive compared to alternatives',
  },
];
