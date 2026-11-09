export type SellerOrdersParams = {
  pageNumber: number;
  pageSize: number;
};

export type UpdateOrderFulfillmentPayload = {
  fulfillmentStatus: string;
  courierName: string;
  trackingNumber: string;
  trackingUrl: string;
};
export interface SellerOrder {
  id: number;
  productId: number;
  orderNumber: string;
  productName: string;
  category: string;
  description: string;
  quantity: number;
  amount: number;
  orderType: string;
  paymentStatus: string;
  status: string;
  role: string;
  email: string;
  phone: string;
  shipTo: string;
  shippingAddress: string;
  deliveryDate: string;

  /* ---- Extra fields returned by GET /v1/Orders/{id} ---- */
  subtotalAmount?: number;
  shippingAmount?: number;
  totalAmount?: number;
  currency?: string;
  paymentProvider?: string | null;
  stripePaymentIntentId?: string | null;
  stripePaymentStatus?: string | null;
  paidAt?: string | null;
  fulfillmentStatus?: string | null;
  courierName?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  shippedAt?: string | null;
  deliveredAt?: string | null;
  shopifyOrderId?: string | null;
  shopifyFulfillmentId?: string | null;
  shopifyVariantId?: string | null;
  variantTitle?: string | null;
  sku?: string | null;
}

export interface LifecycleStep {
  value: string;
  label: string;
}

export interface LifecycleStepperProps {
  steps: LifecycleStep[];
  currentIdx: number;
}
