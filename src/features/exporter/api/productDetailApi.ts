import api from '@/configs/api-config';
import { ProductData } from '../types/exporter';

export const getProductById = async (id: string): Promise<ProductData> => {
  try {
    const response = await api.get(`/Product/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
