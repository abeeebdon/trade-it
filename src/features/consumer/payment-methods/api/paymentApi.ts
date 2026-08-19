import { APIENDPOINTSTWO } from '@/configs/api-urls';
import type { PaymentMethod } from '../types';
import type { AddCardPayload } from '../hooks/usePaymentMethods';
import axios from 'axios';
import api from '@/configs/api-config';
import { AchFormValues, ZelleFormValues } from '../components/validation';

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
  const response = await api.get(APIENDPOINTSTWO.PAYMENT_METHOD);
  return response.data;
};

export const addCardPaymentMethod = async (
  payload: AddCardPayload,
): Promise<PaymentMethod> => {
  const response = await api.post(APIENDPOINTSTWO.PAYMENT_METHOD_CARD, payload);
  return response.data.data;
};

export const addZellePaymentMethod = async (payload: ZelleFormValues) => {
  const response = await api.post(
    APIENDPOINTSTWO.PAYMENT_METHOD_ZELLE,
    payload,
  );
  return response.data;
};

export const addAchPaymentMethod = async (
  payload: AchFormValues,
): Promise<PaymentMethod> => {
  const response = await api.post(APIENDPOINTSTWO.PAYMENT_METHOD_ACH, payload);
  return response.data.data;
};

export const deletePaymentMethod = async (id: string): Promise<void> => {
  await api.delete(`${APIENDPOINTSTWO.PAYMENT_METHOD}/${id}`);
};

export const updatePaymentMethod = async (
  id: string,
  payload: Partial<PaymentMethod>,
): Promise<PaymentMethod> => {
  const response = await api.patch(APIENDPOINTSTWO.PAYMENT_METHOD);
  return response.data.data;
};

export const setDefaultPaymentMethod = async (
  id: string,
): Promise<PaymentMethod> => {
  const response = await axios.patch(APIENDPOINTSTWO.PAYMENT_METHOD);
  return response.data.data;
};
