export interface Receipt {
  id: string;
  order_number: string;
  product_name?: string;
  status: string;
  total_usd: number;
  subtotal_usd?: number;
  unit_price_usd?: number;
  shipping_usd?: number;
  platform_fee_usd?: number;
  quantity?: number;
  created_at: string;
  listing_photos?: string[];
  ships_from?: string;
  shipping_name?: string;
  shipping_address?: string;
  escrow_held_by?: string;
}
