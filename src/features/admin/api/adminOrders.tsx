import api from '@/configs/api-config';
import { APIENDPOINTS } from '@/configs/api-urls';
export const getAdminOrders = async () => {
  try {
    const response = await api.get(APIENDPOINTS.ADMIN_ORDERS);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
