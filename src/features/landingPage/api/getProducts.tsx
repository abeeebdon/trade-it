import api from '@/configs/api-config';
import { LandingPageParams, ProductsResponse } from '../types/home';

export const getLandingPageProducts = async ({
  pageNumber,
  pageSize,
  search,
  category,
}: LandingPageParams): Promise<ProductsResponse> => {
  try {
    const response = await api.get(
      `/Product/get-landing-page-product?PageNumber=${pageNumber}&PageSize=${pageSize}&category=${category}&search=${search}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
