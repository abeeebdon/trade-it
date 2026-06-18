import { getSavedCookie } from '@/store/auth/cookies';
import axios from 'axios';
import { toast } from 'sonner';

export const getBuyerOrders = async () => {
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
    }
    toast.error(response.data.message);
  } catch (error) {
    throw error;
  }
};
