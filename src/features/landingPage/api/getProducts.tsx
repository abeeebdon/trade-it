import api from '@/configs/api-config';
import { LandingPageParams, ProductsResponse } from '../types/home';

export const getLandingPageProducts = async ({
  pageNumber,
  pageSize,
  search,
  category,
}: LandingPageParams): Promise<ProductsResponse> => {
  console.log(category, '');
  try {
    const response = await api.get('/Product/get-landing-page-product', {
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
