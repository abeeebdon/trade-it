'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getShoppingLists,
  getShoppingList,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
  addItemToList,
  removeItemFromList,
  addAllToCart,
} from '../api/shoppingListApi';
import type { AddShoppingListItemPayload } from '../types';

const LISTS_KEY = ['consumer-shopping-lists'];

// ── Queries ──────────────────────────────────────────────

export const useGetShoppingLists = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: [...LISTS_KEY, pageNumber, pageSize],
    queryFn: () => getShoppingLists(pageNumber, pageSize),
  });
};

export const useGetShoppingList = (id: string) => {
  return useQuery({
    queryKey: [...LISTS_KEY, id],
    queryFn: () => getShoppingList(id),
    enabled: !!id,
  });
};

// ── Mutations ────────────────────────────────────────────

export const useCreateShoppingList = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string }) => createShoppingList(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTS_KEY });
      toast.success('List created');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to create list.');
    },
  });
};

export const useUpdateShoppingList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateShoppingList(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTS_KEY });
      toast.success('List updated');
    },
    onError: () => {
      toast.error('Failed to update list.');
    },
  });
};

export const useDeleteShoppingList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteShoppingList(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTS_KEY });
      toast.success('List deleted');
    },
    onError: () => {
      toast.error('Failed to delete list.');
    },
  });
};

export const useAddItemToList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      shoppingListId,
      payload,
    }: {
      shoppingListId: string;
      payload: AddShoppingListItemPayload;
    }) => addItemToList(shoppingListId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTS_KEY });
      toast.success('Item added to list');
    },
    onError: () => {
      toast.error('Failed to add item.');
    },
  });
};

export const useRemoveItemFromList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shoppingListItemId: string) =>
      removeItemFromList(shoppingListItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTS_KEY });
      toast.success('Item removed from list');
    },
    onError: () => {
      toast.error('Failed to remove item.');
    },
  });
};

export const useAddAllToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shoppingListId: string) => addAllToCart(shoppingListId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTS_KEY });
      toast.success('All items added to cart');
    },
    onError: () => {
      toast.error('Failed to add items to cart.');
    },
  });
};
