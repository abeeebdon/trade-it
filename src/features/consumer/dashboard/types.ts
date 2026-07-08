// Types for the consumer dashboard

export interface JourneyStep {
  label: string;
  completed: boolean;
  date?: string;
}

export interface DashboardOrder {
  id: string;
  order_number: string;
  product_name?: string;
  status: string;
  total_usd: number;
  created_at: string;
  listing_photos?: string[];
  journey: JourneyStep[];
}

export interface Listing {
  id: string;
  title: string;
  retail_price_usd: number;
  photos?: string[];
}

export interface DashboardStats {
  total_orders: number;
  in_transit: number;
  favourites: number;
  total_spent_usd: number;
}

export interface DashboardData {
  greeting_name: string;
  active_orders: DashboardOrder[];
  buy_again: Listing[];
  stats: DashboardStats;
}
