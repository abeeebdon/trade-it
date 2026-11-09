export type OrderDChannel = 'Online Store' | 'Draft Orders' | 'POS';

export type OrderDPaymentStatus = 'Paid' | 'Pending' | 'Refunded';

export type OrderDFulfillmentStatus = 'Unfulfilled' | 'Fulfilled';

export type OrderDDeliveryStatus =
  | ''
  | 'Tracking added'
  | 'Tracking added + 1'
  | 'Delivered';

export type OrderDRecord = {
  id: string;
  orderNumber: string;
  placedAt: string;
  customer: string;
  /** Deadline to fulfil the order (ISO date). Empty when not set. */
  fulfillBy: string;
  channel: OrderDChannel;
  total: number;
  paymentStatus: OrderDPaymentStatus;
  fulfillmentStatus: OrderDFulfillmentStatus;
  items: number;
  deliveryStatus: OrderDDeliveryStatus;
  deliveryMethod: string;
  tags: string[];
  courierName: string;
  trackingNumber: string;
  trackingUrl: string;
};

export type OrderDFulfillmentFilter = '' | 'unfulfilled' | 'fulfilled';
