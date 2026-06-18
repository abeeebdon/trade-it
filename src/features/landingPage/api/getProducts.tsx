import api from '@/configs/api-config';
import { ListingsParams } from '@/features/exporter/sell/types/sellType';
import { ProductsResponse } from '../types/home';

export const getLandingPageProducts = async ({
  pageNumber,
  pageSize,
}: ListingsParams): Promise<ProductsResponse> => {
  try {
    const response = await api.get(
      `/Product/get-landing-page-product?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
