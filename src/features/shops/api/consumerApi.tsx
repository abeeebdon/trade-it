import api from '@/configs/api-config';
import { toast } from 'sonner';
import { ConsumerOrder, CreateConsumerQuoteRequest } from '../types/shops';
import { getSavedCookie } from '@/store/auth/cookies';
import { APIENDPOINTS } from '@/configs/api-urls';

export const getConsumerOrders = async (): Promise<ConsumerOrder[]> => {
  try {
    const response = await api.get('/Orders');
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
      `${APIENDPOINTS.CONSUMER_QUOTE_REQ}`,
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
