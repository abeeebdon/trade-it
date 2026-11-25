import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import {
  AdminProductsResponse,
  GetAdminProductsParams,
} from '../types/product';

export const getAdminProducts = async ({
  pageNumber = 1,
  pageSize = 10,
  search,
}: GetAdminProductsParams): Promise<AdminProductsResponse> => {
  const response = await api.get(APIENDPOINTSTWO.ADMIN_PRODUCTS, {
    params: {
      pageNumber,
      pageSize,
      search: search || undefined,
    },
  });

  return response.data;
};
