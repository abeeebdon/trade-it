/**
 * DTOs for the Cart API (backend contract):
 *   POST   /api/Cart/add
 *   GET    /api/Cart
 *   PUT    /api/Cart/update-quantity
 *   DELETE /api/Cart/remove/{cartItemId}
 *   DELETE /api/Cart/clear
 */

export interface CartItemDto {
  cartItemId: number;
  productId: number;
  productName: string;
  thumbnailImage: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface CartResponse {
  items: CartItemDto[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface AddToCartPayload {
  productId: number;
  quantity: number;
  shipping_name?: string;
  shipping_address?: string;
  shipping_email?: string;
  shipping_phone?: string;
}

export interface UpdateCartItemQuantityPayload {
  cartItemId: number;
  quantity: number;
}
