import api from '@/configs/api-config';
import { toast } from 'sonner';
import { ConsumerOrder, CreateConsumerQuoteRequest } from '../types/shops';
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

export const getConsumerQuotes = async (): Promise<ConsumerOrder[]> => {
  try {
    const response = await api.get(APIENDPOINTSTWO.CONSUMER_FULFILLMENT_QUEUE);
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
