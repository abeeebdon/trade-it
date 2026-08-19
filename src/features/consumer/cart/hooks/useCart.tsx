import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from '../api/cartApi';
import { AddToCartPayload, UpdateCartItemQuantityPayload } from '../types/cart';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: 2 * 60_000,
  });
};

export const useAddToCart = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddToCartPayload) => addToCart(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to add item to cart. Please try again.');
    },
  });
};

export const useUpdateCartItemQuantity = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCartItemQuantityPayload) =>
      updateCartItemQuantity(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to update item quantity. Please try again.');
    },
  });
};

export const useRemoveFromCart = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: string | number) => removeCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to remove item from cart. Please try again.');
    },
  });
};

export const useClearCart = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to clear cart. Please try again.');
    },
  });
};
