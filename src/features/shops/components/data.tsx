import { Lock, MessageCircle } from 'lucide-react';

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

export const orderModes = [
  {
    label: 'Order & Prepay',
    value: 'prepay',
    icon: Lock,
  },
  {
    label: 'Request Quote',
    value: 'quote',
    icon: MessageCircle,
  },
];
