export const APIENDPOINTS = {
  // Consumer
  CONSUMER_QUOTE_REQ: 'ConsumerFulfillment/quote-requests',
  CONSUMER_QUOTE: 'ConsumerFulfillment/queue',
  CONSUMER_PAYMENT: '/PaymentMethod',

  //admin
  ADMIN_ORDERS: '/Admin/orders',
  ADMIN_LISTINGS: '/Admin/listings',
  ADMIN_LISTINGS_MODERATE: (listingId: number) =>
    `/Admin/listings/${listingId}/moderate`,

  // buyer
  BUYER_QUOTE_REQ: '/BuyerFulfillment/quote-requests',
  BUYER_FULFILLMENTQUEUE: '/BuyerFulfillment/queue',
  LOCAL_LISTINGS: '/local-listings',
};
