import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { AdminOrder } from '../types/orders';

export interface GetAdminOrdersParams {
  status?: string;
}

export const getAdminOrders = async ({
  status,
}: GetAdminOrdersParams = {}): Promise<AdminOrder[]> => {
  try {
    const response = await api.get(APIENDPOINTSTWO.ADMIN_ORDERS, {
      params: { status },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
