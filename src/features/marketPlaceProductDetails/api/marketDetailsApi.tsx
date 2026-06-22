import api from '@/configs/api-config';

export const getMarketDetailsById = async ({ id }: { id: string }) => {
  try {
    const response = await api.get(`/Product/market-place-products/${id}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
