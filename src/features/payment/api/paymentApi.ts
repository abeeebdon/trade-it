import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import type { CreateCheckoutOrderPayload } from '../types/types';

export interface PaymentIntentDetails {
  clientSecret: string;
  publishableKey: string;
  stripePaymentIntentId: string;
  subtotalUsd: number;
  totalUsd: number;
}
export interface PaymentIntentResponse {
  data: PaymentIntentDetails;
  message: string;
}
export const createPaymentIntent = async (
  payload: CreateCheckoutOrderPayload,
): Promise<PaymentIntentResponse> => {
  const response = await api.post(
    APIENDPOINTSTWO.ORDERS_CHECKOUT_PAYMENT_INTENT,
    payload,
  );
  return response.data;
};
