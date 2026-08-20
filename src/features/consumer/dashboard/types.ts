// Types for the consumer dashboard

export interface JourneyStep {
  label: string;
  completed: boolean;
  date?: string;
}

export interface DashboardOrder {
  orderId: string | number;
  orderNumber: string;
  productName?: string;
  status: string;
  totalAmount: number;
  orderDate: string;
  thumbnailImage?: string;
  journey: JourneyStep[];
}

export interface Listing {
  id: string;
  title: string;
  retail_price_usd: number;
  photos?: string[];
}

export interface DashboardStats {
  totalOrders: number;
  inTransit: number;
  favourites: number;
  totalSpent: number;
}

export interface DashboardData {
  greeting_name: string;
  activeOrders: DashboardOrder[];
  buyAgain: Listing[];
  stats: DashboardStats;
}

// ── API response types (GET /api/ConsumerDashboard) ────────

export interface ConsumerDashboardStats {
  totalOrders: number;
  inTransit: number;
  favourites: number;
  totalSpent: number;
}

export interface ConsumerDashboardActiveOrder {
  orderId: number;
  orderNumber: string;
  productName: string;
  thumbnailImage: string;
  totalAmount: number;
  currency: string;
  quantity: number;
  orderDate: string;
  deliveryDate: string;
  status: string;
}

export interface ConsumerDashboardBuyAgainItem {
  id?: string | number;
  listingId?: string | number;
  productId?: string | number;
  title?: string;
  productName?: string;
  price?: number;
  retail_price_usd?: number;
  photos?: string[];
  thumbnailImage?: string;
}

export interface ConsumerDashboardResponse {
  success: boolean;
  message: string;
  data: {
    stats: ConsumerDashboardStats;
    activeOrders: ConsumerDashboardActiveOrder[];
    buyAgain: ConsumerDashboardBuyAgainItem[];
  };
  statusCode: number;
}
