import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import type { CreateCheckoutOrderPayload } from '../types/types';

export const createPaymentIntent = async (
  payload: CreateCheckoutOrderPayload,
): Promise<unknown> => {
  const response = await api.post(
    APIENDPOINTSTWO.ORDERS_CHECKOUT_PAYMENT_INTENT,
    payload,
  );
  return response.data;
};
