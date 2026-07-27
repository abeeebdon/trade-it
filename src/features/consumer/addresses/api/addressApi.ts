import type { DeliveryAddress, AddressApiResponse } from '../types';
import { getSavedCookie } from '@/store/auth/cookies';
import axios from 'axios';

const ENDPOINT = '/DeliveryAddress';
const baseUrl = 'https://jompshop.jompstart.com/api';

const authHeaders = () => {
  const token = getSavedCookie('token');
  console.log(token);
  return { Authorization: `Bearer ${token}` };
};

export const getAddresses = async (
  pageNumber = 1,
  pageSize = 10,
): Promise<AddressApiResponse> => {
  const response = await axios.get(
    `${baseUrl}${ENDPOINT}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    { headers: authHeaders() },
  );
  return response.data;
};

export const addAddress = async (
  payload: Omit<DeliveryAddress, 'id'>,
): Promise<DeliveryAddress> => {
  const response = await axios.post(`${baseUrl}${ENDPOINT}`, payload, {
    headers: authHeaders(),
  });
  return response.data.data;
};

export const deleteAddress = async (id: number): Promise<void> => {
  await axios.delete(`${baseUrl}${ENDPOINT}/${id}`, {
    headers: authHeaders(),
  });
};

export const updateAddress = async (
  id: number,
  payload: Partial<DeliveryAddress>,
): Promise<DeliveryAddress> => {
  const response = await axios.put(`${baseUrl}${ENDPOINT}/${id}`, payload, {
    headers: authHeaders(),
  });
  return response.data.data;
};

export const setDefaultAddress = async (
  id: number,
): Promise<DeliveryAddress> => {
  const token = getSavedCookie('token');

  const response = await axios.patch(
    `${baseUrl}${ENDPOINT}/${id}/set-default`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data.data;
};
