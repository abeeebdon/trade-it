import api from '@/configs/api-config';
import {
  CreateProductPayload,
  ProductListParams,
  ProductListResponse,
  ProductCategory,
  ProductCategoryListParams,
  ProductCategoryListResponse,
  ProductCountryListResponse,
} from '../types/exporter';
import { getUserId } from '@/lib/helpers/TokenDetails';
import { toast } from 'sonner';
export interface ProductData {
  id: number;
  userId: number;
  user: null;

  productName: string;
  description: string;
  category: string;

  price: number;
  quantity: number;
  unit: number;

  currencyId: number;
  currency: null;

  productStatusId: number;
  productStatus: null;

  thumbnailImage: string;
  productImages: null;

  createdAt: string;
  updatedAt: string;
}
export const getProducts = async ({
  pageNumber,
  pageSize,
}: ProductListParams): Promise<ProductListResponse> => {
  try {
    const response = await api.get(
      `/Product?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: string): Promise<ProductData> => {
  try {
    const response = await api.get(`/Product/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (
  payload: CreateProductPayload,
): Promise<void> => {
  console.log(payload.Images);
  try {
    const form = new FormData();
    const id = getUserId();
    if (!id) {
      toast.error('Please logout and login');
      return;
    }

    form.append('UserId', String(id));
    form.append('Name', payload.Name);
    form.append('Category', payload.Category);
    form.append('Unit', String(payload.Unit));
    form.append('PriceUsd', String(payload.PriceUsd));
    form.append('Moq', String(payload.Moq));
    form.append('Description', payload.Description);
    form.append('CurrencyId', String(payload.CurrencyId));
    form.append('StatusId', String(payload.StatusId));

    if (payload.ThumbnailImage) {
      form.append('ThumbnailImage', payload.ThumbnailImage);
    }

    payload.Images.forEach((img) => {
      form.append('Images', img);
    });

    await api.post('/Product/create', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    throw error;
  }
};

//product category
export const getProductCategories = async ({
  pageNumber,
  pageSize,
}: ProductCategoryListParams): Promise<ProductCategoryListResponse> => {
  try {
    const response = await api.get(
      `/ProductCategory?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getProductCategoryById = async (
  id: number,
): Promise<ProductCategory> => {
  try {
    const response = await api.get(`/ProductCategory/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getProductCountries =
  async (): Promise<ProductCountryListResponse> => {
    try {
      // Fetch all 193 countries in one shot
      const response = await api.get(
        `/Product/countries?PageNumber=1&PageSize=250`,
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
