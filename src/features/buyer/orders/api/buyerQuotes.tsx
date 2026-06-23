import { getSavedCookie } from '@/store/auth/cookies';
import axios from 'axios';
import { toast } from 'sonner';
import { QuoteRequestType } from '../types/orders';
const baseUrl = 'https://jompshop.jompstart.com/api';
export const getBuyerQuoteRequest = async () => {
  const token = getSavedCookie('token');
  try {
    const response = await axios.get(`${baseUrl}/buyer-fulfillment/queue`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  const token = getSavedCookie('token');
  try {
    const response = await axios.post(
      `${baseUrl}/buyer-fulfillment/quote-requests`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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
