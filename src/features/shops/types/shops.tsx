import { LucideIcon } from 'lucide-react';

type QuoteStatus = 'pending' | 'quoted' | 'accepted' | 'declined';

export interface Quote {
  id: string;
  quote_number: string;
  listing_id: string;
  listing_title: string;
  quantity: number;
  message?: string;
  status: QuoteStatus;

  quoted_unit_price_usd?: number;
  quoted_total_usd?: number;
  quote_valid_until?: string;
  quote_note?: string;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered';

export type EscrowStatus = 'held' | 'released';

export type Order = {
  id: string;
  order_number: string;
  listing_title: string;
  quantity: number;
  unit_price_usd: number;
  total_usd: number;

  checkout_mode: 'quote_prepay' | 'instant';

  delivery_partner_of_record?: string;
  tracking_number?: string;

  status: OrderStatus;
  escrow_status: EscrowStatus;
  escrow_held_by?: string;

  created_at: string;

  shipping_name: string;
  shipping_address: string;
};
export type FilterButton = {
  label: string;
  onClick: () => void;
  active: boolean;
  icon?: LucideIcon;
};
export type HomePageFilterProps = {
  mode: string;
  category: string;
  clearCategory: () => void;
  clearMode: () => void;
  setMode: (mode: string) => void;
};

export type OrderType = 'prepay' | 'quote';

export interface CreateOrderPayload {
  productId: string | number;
  quantity: number;
  deliveryDate?: string;
  shipTo: string;
  shippingAddress: string;
  email: string;
  phone: string;
  description?: string;
  orderType: OrderType;
}
