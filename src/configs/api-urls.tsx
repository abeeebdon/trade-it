export const APIENDPOINTS = {
  BUYER_QUOTE_REQ: '/BuyerFulfillment/quote-requests',
  CONSUMER_QUOTE_REQ: 'ConsumerFulfillment/quote-requests',
  CONSUMER_QUOTE: 'ConsumerFulfillment/queue',
  BUYER_FULFILLMENTQUEUE: '/BuyerFulfillment/queue',

  //admin
  ADMIN_ORDERS: '/Admin/orders',
  ADMIN_LISTINGS: '/Admin/listings',
  ADMIN_LISTINGS_MODERATE: (listingId: number) =>
    `/Admin/listings/${listingId}/moderate`,

  // buyer
  LOCAL_LISTINGS: '/local-listings',
};
