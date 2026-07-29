import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';

export const getMarketDetailsById = async ({ id }: { id: string }) => {
  try {
    const response = await api.get(
      APIENDPOINTSTWO.PRODUCT_MARKET_PLACE_BY_ID(id),
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
