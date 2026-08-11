import api from '@/configs/api-config';
import { toast } from 'sonner';
import {
  AcceptAndPrepayQuotePayload,
  ConsumerOrder,
  CreateConsumerQuoteRequest,
  Quote,
} from '../types/shops';
import { APIENDPOINTSTWO } from '@/configs/api-urls';

export const getConsumerOrders = async (): Promise<ConsumerOrder[]> => {
  try {
    const response = await api.get(APIENDPOINTSTWO.ORDERS);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getConsumerOrderById = async (
  id: string | number,
): Promise<ConsumerOrder> => {
  const response = await api.get(APIENDPOINTSTWO.ORDERS_BY_ID(id));
  return response.data.data;
};

export const getConsumerQuotes = async (): Promise<Quote[]> => {
  try {
    const response = await api.get(APIENDPOINTSTWO.CONSUMER_FULFILLMENT_QUOTE);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const placeConsumerQuote = async (
  payload: CreateConsumerQuoteRequest,
) => {
  try {
    const response = await api.post(
      `${APIENDPOINTSTWO.CONSUMER_QUOTE_REQUESTS}`,
      payload,
    );

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Consumer accepts a seller's quote and prepays the quoted amount into escrow.
 */
export const acceptAndPrepayQuote = async (
  quoteNumber: string,
  payload: AcceptAndPrepayQuotePayload,
) => {
  const response = await api.post(
    APIENDPOINTSTWO.CONSUMER_QUOTE_ACCEPT_PREPAY(quoteNumber),
    payload,
  );
  return response.data;
};

/**
 * Consumer declines a seller's quoted price.
 */
export const declineQuote = async (quoteNumber: string) => {
  const response = await api.post(
    APIENDPOINTSTWO.CONSUMER_QUOTE_DECLINE(quoteNumber),
  );
  return response.data;
};
