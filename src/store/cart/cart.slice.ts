import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  productId: number;
  productName: string;
  thumbnailImage: string;
  priceUsd: number;
  quantity: number;
  shipping_name: string;
  shipping_address: string;
  shipping_email: string;
  shipping_phone: string;
  description: string;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      // if product already exists, update quantity instead of duplicating
      const existing = state.items.find(
        (item) => item.productId === action.payload.productId,
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },
    updateCartItemQuantity(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId,
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
