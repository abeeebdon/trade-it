import { APIENDPOINTS } from '@/configs/api-urls';
import type { PaymentMethod } from '../types';
import axios from 'axios';
import api from '@/configs/api-config';

const ENDPOINT = '/PaymentMethod';

export interface PaymentMethodsApiResponse {
  data: {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    data: PaymentMethod[];
  };
}

export const getPaymentMethods = async (
  pageNumber = 1,
  pageSize = 10,
): Promise<PaymentMethodsApiResponse> => {
  const response = await api.get(APIENDPOINTS.CONSUMER_PAYMENT);
  return response.data;
};

export const addPaymentMethod = async (
  payload: Omit<PaymentMethod, 'id'>,
): Promise<PaymentMethod> => {
  const response = await api.post(APIENDPOINTS.CONSUMER_PAYMENT);
  return response.data.data;
};

export const deletePaymentMethod = async (id: string): Promise<void> => {
  await api.delete(APIENDPOINTS.CONSUMER_PAYMENT);
};

export const updatePaymentMethod = async (
  id: string,
  payload: Partial<PaymentMethod>,
): Promise<PaymentMethod> => {
  const response = await api.patch(APIENDPOINTS.CONSUMER_PAYMENT);
  return response.data.data;
};

export const setDefaultPaymentMethod = async (
  id: string,
): Promise<PaymentMethod> => {
  const response = await axios.patch(APIENDPOINTS.CONSUMER_PAYMENT);
  return response.data.data;
};
