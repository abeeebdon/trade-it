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
  orderType: string;
}
export type ConsumerOrder = {
  id: number;
  amount: number;
  category: string;
  deliveryDate: string;
  description: string;
  email: string;
  orderNumber: string;
  orderType: string;
  paymentStatus: string;
  phone: string;
  productId: number;
  productName: string;
  quantity: number;
  role: string;
  shipTo: string;
  shippingAddress: string;
  status: string;
};
