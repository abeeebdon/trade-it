import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
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
    const response = await api.get(APIENDPOINTSTWO.PRODUCT_MARKET_PLACE, {
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
