import api from '@/configs/api-config';
import { toast } from 'sonner';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import {
  AddToCartPayload,
  CartResponse,
  UpdateCartItemQuantityPayload,
} from '../types/cart';

export const getCart = async (): Promise<CartResponse> => {
  try {
    const response = await api.get(APIENDPOINTSTWO.CART);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (payload: AddToCartPayload) => {
  try {
    const response = await api.post(APIENDPOINTSTWO.CART_ADD, payload);

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    }
    toast.error(response.data.message);
  } catch (error) {
    throw error;
  }
};

export const updateCartItemQuantity = async (
  payload: UpdateCartItemQuantityPayload,
) => {
  try {
    const response = await api.put(
      APIENDPOINTSTWO.CART_UPDATE_QUANTITY,
      payload,
    );

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    }
    toast.error(response.data.message);
  } catch (error) {
    throw error;
  }
};

export const removeCartItem = async (cartItemId: string | number) => {
  try {
    const response = await api.delete(APIENDPOINTSTWO.CART_REMOVE(cartItemId));

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    }
    toast.error(response.data.message);
  } catch (error) {
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const response = await api.delete(APIENDPOINTSTWO.CART_CLEAR);

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    }
    toast.error(response.data.message);
  } catch (error) {
    throw error;
  }
};
