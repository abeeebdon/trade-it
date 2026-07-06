import type { JourneyStep } from '../dashboard/types';

export type { JourneyStep };

export type OrderStatusCategory =
  'all' | 'in_transit' | 'delivered' | 'processing';

export interface Order {
  id: string;
  order_number: string;
  product_name?: string;
  listing_title?: string;
  status: string;
  total_usd: number;
  subtotal_usd?: number;
  unit_price_usd?: number;
  shipping_usd?: number;
  platform_fee_usd?: number;
  quantity?: number;
  created_at: string;
  delivered_at?: string;
  tracking_number?: string;
  delivery_partner_of_record?: string;
  listing_photos?: string[];
  journey: JourneyStep[];
}

export interface OrderCounts {
  all: number;
  in_transit: number;
  delivered: number;
  processing: number;
}

export interface OrderTotals {
  all: number;
  in_transit: number;
  delivered: number;
  processing: number;
}

export interface OrdersData {
  orders: Order[];
  counts: OrderCounts;
  totals: OrderTotals;
}

export interface FilterOption {
  v: OrderStatusCategory;
  l: string;
}
