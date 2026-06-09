import api from '@/configs/api-config';
import { ProductListResponse } from '../types/exporter';

export type CatalogParams = {
  pageNumber: number;
  pageSize: number;
  category?: string;
  country?: string;
};

export const getCatalogProducts = async ({
  pageNumber,
  pageSize,
  category,
  country,
}: CatalogParams): Promise<ProductListResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('pageNumber', String(pageNumber));
    params.append('pageSize', String(pageSize));
    if (category) params.append('Category', category);
    if (country) params.append('Country', country);

    const response = await api.get(
      `/Product/market-place-products?${params.toString()}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
