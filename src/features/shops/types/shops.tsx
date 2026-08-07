import { LucideIcon } from 'lucide-react';

type QuoteStatus = 'pending' | 'quoted' | 'accepted' | 'declined';

export interface Quote {
  id: number;
  quoteNumber: string;
  productName: string;
  quantity: number;
  message: string;
  status: QuoteStatus;

  consumerEmail: string;
  consumerId: number;
  consumerName: string;
  sellerId: number;
  sellerNote: string;
  createdAt: string;

  quotedUnitPriceUsd: number | null;
  quotedTotalUsd: number | null;
  quoteValidUntil: string | null;
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
export interface CreateConsumerQuoteRequest {
  sellerId: number;
  productName: string;
  quantity: number;
  consumerName: string;
  consumerEmail: string;
  message: string;
}

/**
 * Payload sent when a consumer accepts a seller's quote and prepays
 * into escrow. The quoted amounts are fixed by the seller, so the
 * consumer only supplies contact / delivery details.
 */
export interface AcceptAndPrepayQuotePayload {
  consumerPhone: string;
  shippingAddress: string;
  deliveryPartner: string;
}
