import type {
  ShoppingList,
  ShoppingListItem,
  AddShoppingListItemPayload,
  ShoppingListApiResponse,
  SingleShoppingListApiResponse,
} from '../types';
import { getSavedCookie } from '@/store/auth/cookies';
import axios from 'axios';

const ENDPOINT = '/ShoppingList';
const baseUrl = 'https://jompshop.jompstart.com/api';

const authHeaders = () => {
  const token = getSavedCookie('token');
  return { Authorization: `Bearer ${token}` };
};

/** GET /api/ShoppingList — fetch all lists */
export const getShoppingLists = async (
  pageNumber = 1,
  pageSize = 10,
): Promise<ShoppingListApiResponse> => {
  const response = await axios.get(
    `${baseUrl}${ENDPOINT}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    { headers: authHeaders() },
  );
  return response.data;
};

/** GET /api/ShoppingList/{id} — fetch single list */
export const getShoppingList = async (
  id: string,
): Promise<SingleShoppingListApiResponse> => {
  const response = await axios.get(`${baseUrl}${ENDPOINT}/${id}`, {
    headers: authHeaders(),
  });
  return response.data;
};

/** POST /api/ShoppingList — create a list */
export const createShoppingList = async (payload: {
  name: string;
}): Promise<ShoppingList> => {
  const response = await axios.post(`${baseUrl}${ENDPOINT}`, payload, {
    headers: authHeaders(),
  });
  return response.data.data;
};

/** PUT /api/ShoppingList/{id} — update a list */
export const updateShoppingList = async (
  id: string,
  payload: { name: string },
): Promise<ShoppingList> => {
  const response = await axios.put(`${baseUrl}${ENDPOINT}/${id}`, payload, {
    headers: authHeaders(),
  });
  return response.data.data;
};

/** DELETE /api/ShoppingList/{id} — delete a list */
export const deleteShoppingList = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}${ENDPOINT}/${id}`, {
    headers: authHeaders(),
  });
};

/** POST /api/ShoppingList/{shoppingListId}/items — add item to list */
export const addItemToList = async (
  shoppingListId: string,
  payload: AddShoppingListItemPayload,
): Promise<ShoppingListItem> => {
  const response = await axios.post(
    `${baseUrl}${ENDPOINT}/${shoppingListId}/items`,
    payload,
    { headers: authHeaders() },
  );
  return response.data.data;
};

/** DELETE /api/ShoppingList/items/{shoppingListItemId} — remove item from list */
export const removeItemFromList = async (
  shoppingListItemId: string,
): Promise<void> => {
  await axios.delete(`${baseUrl}${ENDPOINT}/items/${shoppingListItemId}`, {
    headers: authHeaders(),
  });
};

/** POST /api/ShoppingList/{shoppingListId}/add-all-to-cart */
export const addAllToCart = async (shoppingListId: string): Promise<void> => {
  await axios.post(
    `${baseUrl}${ENDPOINT}/${shoppingListId}/add-all-to-cart`,
    {},
    { headers: authHeaders() },
  );
};
