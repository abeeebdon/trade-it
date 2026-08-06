import { CreateListingPayload } from '../../types/exporter';

export type EditListingPayload = {
  payload: CreateListingPayload;
  id: string | number;
};
export type QuoteStatus =
  | 'pending'
  | 'quoted'
  | 'accepted'
  | 'rejected'
  | 'expired';

export type EscrowStatus = 'held' | 'released' | 'refunded';

export type FulfillmentOrderStatus =
  | 'paid'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type CheckoutMode = 'quote_prepay' | 'listed';
export type SellerQuote = {
  id: string;
  quote_number: string;
  listing_title: string;
  quantity: number;
  consumer_name: string;
  consumer_email: string;
  message?: string;
  quoted_unit_price_usd?: number;
  quoted_total_usd?: number;
  quote_valid_until?: string;
  status: QuoteStatus;
};

export type FulfillmentOrder = {
  id: string;
  order_number: string;
  listing_title: string;
  quantity: number;
  unit_price_usd: number;
  total_usd: number;
  checkout_mode: CheckoutMode;
  delivery_partner_of_record?: string;
  status: FulfillmentOrderStatus;
  escrow_status: EscrowStatus;
  created_at: string;
  shipping_name: string;
  shipping_address: string;
  shipping_email: string;
  shipping_phone?: string;
  tracking_number?: string;
};

export type RespondForm = {
  quoted_unit_price_usd: string;
  quote_note?: string;
  valid_days: number;
};

// ─── Fulfillment Queue API ────────────────────────────────────────────────────

export interface ApiQuoteRequest {
  id: number;
  quoteNumber: string;
  productName: string;
  quantity: number;
  buyerName: string;
  buyerEmail: string;
  message: string;
  status: string;
  quotedUnitPriceUsd: number | null;
  quotedTotalUsd: number | null;
  sellerNote: string;
  quoteValidUntil: string | null;
  createdAt: string;
}

export interface ApiFulfillmentOrder {
  id: number;
  orderNumber: string;
  productName: string;
  quantity: number;
  unitPriceUsd: number;
  totalUsd: number;
  checkoutMode: string;
  status: string;
  escrowStatus: string;
  createdAt: string;
  deliveryPartnerOfRecord?: string;
  shippingName?: string;
  shippingAddress?: string;
  shippingEmail?: string;
  shippingPhone?: string;
  trackingNumber?: string;
}

export interface FulfillmentQueueResponse {
  title: string;
  subtitle: string;
  badges: string[];
  quoteRequests: ApiQuoteRequest[];
  orders: ApiFulfillmentOrder[];
}

export const mapQuoteToSellerQuote = (q: ApiQuoteRequest): SellerQuote => ({
  id: String(q.id),
  quote_number: q.quoteNumber,
  listing_title: q.productName,
  quantity: q.quantity,
  consumer_name: q.buyerName,
  consumer_email: q.buyerEmail,
  message: q.message,
  quoted_unit_price_usd: q.quotedUnitPriceUsd ?? undefined,
  quoted_total_usd: q.quotedTotalUsd ?? undefined,
  quote_valid_until: q.quoteValidUntil ?? undefined,
  status: q.status as QuoteStatus,
});

export const mapOrderToFulfillmentOrder = (
  o: ApiFulfillmentOrder,
): FulfillmentOrder => ({
  id: String(o.id),
  order_number: o.orderNumber,
  listing_title: o.productName,
  quantity: o.quantity,
  unit_price_usd: o.unitPriceUsd,
  total_usd: o.totalUsd,
  checkout_mode: o.checkoutMode as CheckoutMode,
  delivery_partner_of_record: o.deliveryPartnerOfRecord,
  status: o.status as FulfillmentOrderStatus,
  escrow_status: o.escrowStatus as EscrowStatus,
  created_at: o.createdAt,
  shipping_name: o.shippingName ?? '',
  shipping_address: o.shippingAddress ?? '',
  shipping_email: o.shippingEmail ?? '',
  shipping_phone: o.shippingPhone,
  tracking_number: o.trackingNumber,
});
