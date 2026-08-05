import api from '@/configs/api-config';
import type {
  ShoppingList,
  ShoppingListItem,
  AddShoppingListItemPayload,
  ShoppingListApiResponse,
  SingleShoppingListApiResponse,
} from '../types';

const ENDPOINT = '/ShoppingList';

/** GET /api/ShoppingList — fetch all lists */
export const getShoppingLists = async (
  pageNumber = 1,
  pageSize = 10,
): Promise<ShoppingListApiResponse> => {
  const response = await api.get(
    `${ENDPOINT}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
  return response.data;
};

/** GET /api/ShoppingList/{id} — fetch single list */
export const getShoppingList = async (
  id: string,
): Promise<SingleShoppingListApiResponse> => {
  const response = await api.get(`${ENDPOINT}/${id}`, {});
  return response.data;
};

/** POST /api/ShoppingList — create a list */
export const createShoppingList = async (payload: {
  name: string;
}): Promise<ShoppingList> => {
  const response = await api.post(`${ENDPOINT}`, payload, {});
  return response.data.data;
};

/** PUT /api/ShoppingList/{id} — update a list */
export const updateShoppingList = async (
  id: string,
  payload: { name: string },
): Promise<ShoppingList> => {
  const response = await api.put(`${ENDPOINT}/${id}`, payload, {});
  return response.data.data;
};

/** DELETE /api/ShoppingList/{id} — delete a list */
export const deleteShoppingList = async (id: string): Promise<void> => {
  await api.delete(`${ENDPOINT}/${id}`, {});
};

export const addItemToList = async (
  shoppingListId: string,
  payload: AddShoppingListItemPayload,
): Promise<ShoppingListItem> => {
  const response = await api.post(
    `${ENDPOINT}/${shoppingListId}/items`,
    payload,
  );
  return response.data.data;
};

export const removeItemFromList = async (
  shoppingListItemId: string,
): Promise<void> => {
  await api.delete(`${ENDPOINT}/items/${shoppingListItemId}`, {});
};

/** POST /api/ShoppingList/{shoppingListId}/add-all-to-cart */
export const addAllToCart = async (shoppingListId: string): Promise<void> => {
  await api.post(`${ENDPOINT}/${shoppingListId}/add-all-to-cart`, {});
};
