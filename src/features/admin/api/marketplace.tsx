import api from '@/configs/api-config';
import {
  GetMarketPlaceProductsParams,
  MarketPlaceProducts,
} from '../types/catalog';

export const getMarketPlaceProducts = async ({
  category,
  search,
  pageNumber = 1,
  pageSize = 10,
}: GetMarketPlaceProductsParams): Promise<MarketPlaceProducts> => {
  try {
    const response = await api.get('Product/market-place-products', {
      params: {
        category,
        search,
        pageNumber,
        pageSize,
      },
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
