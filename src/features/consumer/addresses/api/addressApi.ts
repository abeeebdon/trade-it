import api from '@/configs/api-config';
import type { DeliveryAddress, AddressApiResponse } from '../types';

const ENDPOINT = '/DeliveryAddress';

export const getAddresses = async (
  pageNumber = 1,
  pageSize = 10,
): Promise<AddressApiResponse> => {
  const response = await api.get(
    `${ENDPOINT}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
  return response.data;
};

export const addAddress = async (
  payload: Omit<DeliveryAddress, 'id'>,
): Promise<DeliveryAddress> => {
  const response = await api.post(`${ENDPOINT}`, payload, {});
  return response.data.data;
};

export const deleteAddress = async (id: number): Promise<void> => {
  await api.delete(`${ENDPOINT}/${id}`, {});
};

export const updateAddress = async (
  id: number,
  payload: Partial<DeliveryAddress>,
): Promise<DeliveryAddress> => {
  const response = await api.put(`${ENDPOINT}/${id}`, payload);
  return response.data.data;
};

export const setDefaultAddress = async (
  id: number,
): Promise<DeliveryAddress> => {
  const response = await api.patch(`${ENDPOINT}/${id}/set-default`, {});
  return response.data.data;
};
