export const APIENDPOINTS = {
  // Auth
  MFA_SETUP: '/authentication/mfa/setup',
  MFA_VERIFY: '/authentication/mfa/verify-login',
  MFA_ENABLE: '/authentication/mfa/enable',
  MFA_DISABLE: '/authentication/mfa/disable',
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

// ── v1‑prefixed endpoints ───────────────────────────────────

export const APIENDPOINTSTWO = {
  AUTH_LOGIN: '/v1/authentication/login',
  AUTH_REGISTER: '/v1/authentication/register',
  AUTH_FORGOT_PASSWORD: '/v1/authentication/forgot-password',
  AUTH_RESET_PASSWORD: '/v1/authentication/reset-password',
  AUTH_REFRESH_TOKEN: '/v1/authentication/refresh-token',
  AUTH_ROOT: '/v1/authentication',

  AUTH_REFRESH: '/v1/auth/refresh',

  MFA_SETUP: '/v1/authentication/mfa/setup',
  MFA_VERIFY: '/v1/authentication/mfa/verify-login',
  MFA_ENABLE: '/v1/authentication/mfa/enable',
  MFA_DISABLE: '/v1/authentication/mfa/disable',

  PRODUCT: '/v1/Product',
  PRODUCT_BY_ID: (id: string | number) => `/v1/Product/${id}`,
  PRODUCT_CREATE: '/v1/Product/create',
  PRODUCT_MARKET_PLACE_BY_ID: (id: string | number) =>
    `/v1/Product/market-place-products/${id}`,
  PRODUCT_MARKET_PLACE: '/v1/Product/market-place-products',
  PRODUCT_LANDING_PAGE: '/v1/Product/get-landing-page-product',
  PRODUCT_COUNTRIES: '/v1/Product/countries',

  PRODUCT_CATEGORY: '/v1/ProductCategory',
  PRODUCT_CATEGORY_BY_ID: (id: number) => `/v1/ProductCategory/${id}`,

  PAYMENT_METHOD: '/PaymentMethod',
  PAYMENT_METHOD_CARD: '/PaymentMethod/card',
  PAYMENT_METHOD_ZELLE: '/PaymentMethod/zelle',
  PAYMENT_METHOD_ACH: '/PaymentMethod/ach',

  CONSUMER_QUOTE_REQUESTS: '/v1/ConsumerFulfillment/quote-requests',
  CONSUMER_FULFILLMENT_QUEUE: '/v1/ConsumerFulfillment/queue',
  CONSUMER_FULFILLMENT_QUOTE: '/v1/ConsumerFulfillment/quote-requests/my',
  CONSUMER_QUOTE_ACCEPT_PREPAY: (quoteNumber: string) =>
    `/v1/ConsumerFulfillment/quote-requests/${quoteNumber}/accept-and-prepay`,
  CONSUMER_QUOTE_DECLINE: (quoteNumber: string) =>
    `/v1/ConsumerFulfillment/quote-requests/${quoteNumber}/decline`,

  BUYER_QUOTE_REQUESTS: '/v1/BuyerFulfillment/quote-requests',
  BUYER_FULFILLMENT_QUEUE: '/v1/BuyerFulfillment/queue',

  ADMIN_ORDERS: '/v1/Admin/orders',
  ADMIN_LISTINGS: '/v1/Admin/listings',
  ADMIN_LISTINGS_MODERATE: (listingId: number) =>
    `/v1/Admin/listings/${listingId}/moderate`,
  ADMIN_DASHBOARD: '/v1/Admin/dashboard',
  ADMIN_ADMINS: '/v1/Admin/admins',
  ADMIN_USERS: '/v1/Admin/users',
  ADMIN_USERS_ACTIVATE: (id: number) => `/v1/Admin/users/${id}/activate`,
  ADMIN_USERS_SUSPEND: (id: number) => `/v1/Admin/users/${id}/suspend`,
  ADMIN_USERS_RESET_MFA: (id: number) => `/v1/Admin/users/${id}/reset-mfa`,

  ADMIN_VERIFICATION_QUEUE: '/v1/AdminVerification/queue',
  ADMIN_VERIFICATION_APPROVE: (id: string | number) =>
    `/v1/AdminVerification/${id}/approve-provision`,
  ADMIN_VERIFICATION_REJECT: (id: string | number) =>
    `/v1/AdminVerification/${id}/reject`,

  ADMIN_DISPUTE_QUEUE: '/v1/AdminDispute/queue',
  ADMIN_DISPUTE_BY_ID: (id: string | number) => `/v1/AdminDispute/${id}`,
  ADMIN_WAITLIST_CSV: (filter: string) =>
    `/v1/Admin/waitlist/export-csv?filter=${filter}`,
  ADMIN_WAITLIST_COMMAND: '/v1/Admin/waitlist-command',

  ADMIN_CREDIT_QUEUE: '/v1/AdminCredit/queue',
  ADMIN_CREDIT_UNDER_REVIEW: (id: string | number) =>
    `/v1/AdminCredit/applications/${id}/under-review`,
  ADMIN_CREDIT_EXTEND_OFFER: (id: string | number) =>
    `/v1/AdminCredit/applications/${id}/extend-offer`,
  ADMIN_CREDIT_REJECT: (id: string | number) =>
    `/v1/AdminCredit/applications/${id}/reject`,

  // ── Local Listings ────────────────────────────────────────
  LOCAL_LISTINGS: '/v1/local-listings',
  LOCAL_LISTINGS_BY_ID: (id: string | number) => `/v1/local-listings/${id}`,

  // ── Shopping List ─────────────────────────────────────────
  SHOPPING_LIST: '/v1/ShoppingList',
  SHOPPING_LIST_BY_ID: (id: string) => `/v1/ShoppingList/${id}`,
  SHOPPING_LIST_ITEMS: (shoppingListId: string) =>
    `/v1/ShoppingList/${shoppingListId}/items`,
  SHOPPING_LIST_ITEM_BY_ID: (shoppingListItemId: string) =>
    `/v1/ShoppingList/items/${shoppingListItemId}`,
  SHOPPING_LIST_ADD_ALL_TO_CART: (shoppingListId: string) =>
    `/v1/ShoppingList/${shoppingListId}/add-all-to-cart`,

  // ── Cart ──────────────────────────────────────────────────
  CART_ADD: '/Cart/add',
  CART: '/Cart',
  CART_UPDATE_QUANTITY: '/Cart/update-quantity',
  CART_REMOVE: (cartItemId: string | number) => `/Cart/remove/${cartItemId}`,
  CART_CLEAR: '/Cart/clear',

  // ── Profile ───────────────────────────────────────────────
  PROFILE: '/v1/Profile',

  // ── Delivery Address ──────────────────────────────────────
  DELIVERY_ADDRESS: '/v1/DeliveryAddress',
  DELIVERY_ADDRESS_BY_ID: (id: string) => `/v1/DeliveryAddress/${id}`,
  DELIVERY_ADDRESS_SET_DEFAULT: (id: string) =>
    `/v1/DeliveryAddress/${id}/set-default`,

  // ── Orders ────────────────────────────────────────────────
  ORDERS: '/v1/Orders',
  ORDERS_SELLER: '/v1/Orders/seller',
  ORDERS_BY_ID: (id: string | number) => `/v1/Orders/${id}`,
  ORDERS_CHECKOUT_PAYMENT_INTENT: '/v1/Orders/checkout/payment-intent',

  // ── Receipts ──────────────────────────────────────────────
  RECEIPT: '/Receipt',
  RECEIPT_BY_ORDER: (orderId: string | number) => `/api/Receipt/${orderId}`,
  RECEIPT_DOWNLOAD: (orderId: string | number) =>
    `/api/Receipt/${orderId}/download`,

  // ── Businesses ────────────────────────────────────────────
  BUSINESSES_ME: '/v1/businesses/me',
  BUSINESSES: '/v1/businesses',
  BUSINESSES_BY_ID: (bizId: string | number, endpoint: string) =>
    `/v1/businesses/${bizId}/${endpoint}`,

  // ── Misc ──────────────────────────────────────────────────
  WAITLIST: '/v1/Waitlist',
  UPLOAD_KYC: '/v1/upload?kind=kyc',
  FINANCE_WITHDRAW: '/v1/finance/withdraw-from-account',
  CREDIT_ADMIN_APPLICATIONS: '/v1/credit/admin/applications',

  // ── Compliance ────────────────────────────────────────────
  COMPLIANCE_VAULT: '/v1/Compliance/vault',
  COMPLIANCE_DOCUMENTS: '/v1/Compliance/documents',

  // ── Wallet ────────────────────────────────────────────────
  WALLET_COMMAND_CENTER: '/v1/Wallet/command-center',

  // ── Direct-to-Consumer ────────────────────────────────────
  DIRECT_TO_CONSUMER: '/v1/Direct-to-Consumer',
  DIRECT_TO_CONSUMER_LISTINGS: '/v1/Direct-to-Consumer/listings',
  DIRECT_TO_CONSUMER_LISTINGS_BY_ID: (id: string | number) =>
    `/v1/Direct-to-Consumer/listings/${id}`,

  // ── Help ──────────────────────────────────────────────────
  HELP: '/Help',
  HELP_BY_ID: (id: number) => `/Help/${id}`,

  // ── Exporter Onboarding ───────────────────────────────────
  EXPORTER_ONBOARDING: '/v1/ExporterOnboarding',
  EXPORTER_ONBOARDING_BUSINESS_PROFILE:
    '/v1/ExporterOnboarding/business-profile',

  // ── Exporter Fulfillment ──────────────────────────────────
  EXPORTER_QUOTES: '/v1/exporter/quotes',
  EXPORTER_QUOTES_RESPOND: (quoteNumber: string) =>
    `/v1/exporter/quotes/${quoteNumber}/respond`,
};
