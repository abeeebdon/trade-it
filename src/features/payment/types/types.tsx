export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface CreateCheckoutOrderPayload {
  items: OrderItem[];
  productId?: number;
  quantity?: number;
  deliveryAddressId: number;
  deliveryDate?: string;
  shipTo?: string;
  shippingAddress?: string;
  email: string;
  phone: string;
  description: string;
  orderType: string;
}
