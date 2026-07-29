import { toast } from 'sonner';
import { QuoteRequestType } from '../types/orders';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import api from '@/configs/api-config';
export const getBuyerQuoteRequest = async () => {
  try {
    const response = await api.get(APIENDPOINTSTWO.BUYER_FULFILLMENT_QUEUE);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      toast.error(response.data.message);

      return response.data.data;
    }
  } catch (error) {
    throw error;
  }
};

export const placeQuote = async (payload: QuoteRequestType) => {
  try {
    const response = await api.post(
      APIENDPOINTSTWO.BUYER_QUOTE_REQUESTS,
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
