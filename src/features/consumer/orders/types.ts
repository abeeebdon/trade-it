import type { JourneyStep } from '../dashboard/types';

export type { JourneyStep };

export type OrderStatusCategory =
  | 'all'
  | 'in_transit'
  | 'delivered'
  | 'processing';

export interface Order {
  id: number;
  orderNumber: string;
  orderType: string;
  role: string;
  productId: number;
  productName: string;
  category: string;
  quantity: number;
  amount: number;
  deliveryDate: string;
  status: string;
  paymentStatus: string;
  shipTo: string;
  shippingAddress: string;
  email: string;
  phone: string;
  description?: string;
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

export interface FilterOption {
  v: OrderStatusCategory;
  l: string;
}
