import {
  Coffee,
  Cuboid,
  House,
  PackageIcon,
  ShoppingBag,
  Sparkle,
} from 'lucide-react';
import { Quote } from '../types/shops';

export const CATS = [
  {
    value: 'fashion',
    label: 'Fashion & Textiles',
    icon: <ShoppingBag color="#f39c12" />,
    hint: 'Adire · Ankara · Kente · Aso-Oke',
  },
  {
    value: 'agriculture',
    label: 'Agriculture',
    icon: <Coffee color="#f39c12" />,
    hint: 'Cocoa · Sesame · Cashew · Palm Oil',
  },
  {
    value: 'staple-foods',
    label: 'Staple Foods',
    icon: <PackageIcon color="#f39c12" />,
    hint: 'Ofada Rice · Garri · Suya Spice',
  },
  {
    value: 'beauty',
    label: 'Beauty & Cosmetics',
    icon: <Sparkle color="#f39c12" />,
    hint: 'Black Soap · Shea Butter · Marula Oil',
  },
  {
    value: 'home-decor',
    label: 'Home & Decor',
    icon: <House color="#f39c12" />,
    hint: 'Bolga Baskets · Masks · Mudcloth',
  },
  {
    value: 'accessories',
    label: 'Accessories',
    icon: <Cuboid color="#f39c12" />,
    hint: 'Leather · Maasai Beads · Raffia',
  },
  {
    value: 'beverages',
    label: 'Beverages',
    icon: <Coffee color="#f39c12" />,
    hint: 'Hibiscus · Baobab · Rooibos',
  },
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
