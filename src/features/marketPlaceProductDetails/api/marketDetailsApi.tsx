import api from '@/configs/api-config';

export const getMarketDetailsById = async ({ id }: { id: string }) => {
  try {
    const response = await api.get(`/Product/market-place-products/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
