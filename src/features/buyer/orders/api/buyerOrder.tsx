import { ConsumerOrder } from '@/features/shops/types/shops';
import { getSavedCookie } from '@/store/auth/cookies';
import axios from 'axios';
import { toast } from 'sonner';

export const getBuyerOrders = async (): Promise<ConsumerOrder[]> => {
  const token = getSavedCookie('token');
  try {
    const response = await axios.get(
      'https://jompshop.jompstart.com/api/buyer-orders',
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

      return response.data.data;
    }
  } catch (error) {
    throw error;
  }
};
