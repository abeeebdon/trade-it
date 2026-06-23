import api from '@/configs/api-config';
import { toast } from 'sonner';
import { ConsumerOrder } from '../types/shops';

export const getConsumerOrders = async (): Promise<ConsumerOrder[]> => {
  try {
    const response = await api.get('/Orders');
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
