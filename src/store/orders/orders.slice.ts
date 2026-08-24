// store/orders/orders.slice.ts
// Global order-management & delivery store. Holds every order and its
// lifecycle status so the consumer (pays), exporter (accepts/declines,
// packs, makes ready) and admin (ships → out for delivery → delivered)
// all read and write the SAME order state.
//
// Demo mode: orders are seeded from DUMMY_ORDERS. When the real
// endpoints land, replace the initial state with an async fetch and
// dispatch `seedOrders` / `setOrders` instead.

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ConsumerOrder } from '@/features/shops/types/shops';
import { DUMMY_ORDERS } from '@/features/orderManagement/data/dummyOrders';
import { OrderStatus } from '@/features/orderManagement/lib/orderStatus';

export interface OrdersState {
  orders: ConsumerOrder[];
}

const initialState: OrdersState = {
  orders: DUMMY_ORDERS.map((o) => ({ ...o })),
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    /** Replace the whole order list (e.g. from an API response). */
    setOrders(state, action: PayloadAction<ConsumerOrder[]>) {
      state.orders = action.payload;
    },
    /** Move an order to a new lifecycle status. */
    setOrderStatus(
      state,
      action: PayloadAction<{ id: number | string; status: OrderStatus }>,
    ) {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => String(o.id) === String(id));
      if (order) {
        order.status = status;
      }
    },
    /** Reset the demo store back to the seeded orders. */
    resetOrders(state) {
      state.orders = DUMMY_ORDERS.map((o) => ({ ...o }));
    },
  },
});

export const { setOrders, setOrderStatus, resetOrders } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;

// ---- Selectors -----------------------------------------------------------

export const selectOrders = (state: { orders: OrdersState }) =>
  state.orders.orders;

export const selectOrderById = (
  state: { orders: OrdersState },
  id?: string | number | null,
) => state.orders.orders.find((o) => String(o.id) === String(id ?? '')) ?? null;
