import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { LandingPageParams, ProductsResponse } from '../types/home';

export const getLandingPageProducts = async ({
  pageNumber,
  pageSize,
  search,
  category,
}: LandingPageParams): Promise<ProductsResponse> => {
  try {
    const response = await api.get(APIENDPOINTSTWO.PRODUCT_LANDING_PAGE, {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize,
        category,
        search,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
