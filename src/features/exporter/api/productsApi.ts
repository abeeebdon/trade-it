import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import {
  CreateProductPayload,
  ProductListParams,
  ProductListResponse,
  ProductCategory,
  ProductCategoryListResponse,
  ProductCountryListResponse,
  EditProductPayload,
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
  priceUsd: number;
  quantity: number;
  moq: number;
  unit: number;

  currencyId: number;
  currency: null;

  productStatusId: number;
  statusId: number;
  productStatus: null;

  thumbnailImage: string;
  productImages: null;
  images: { id: string; imageUrl: string }[];

  createdAt: string;
  updatedAt: string;
}
export const getProducts = async ({
  pageNumber,
  pageSize,
}: ProductListParams): Promise<ProductListResponse> => {
  try {
    const response = await api.get(
      `${APIENDPOINTSTWO.PRODUCT}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: string): Promise<ProductData> => {
  try {
    const response = await api.get(APIENDPOINTSTWO.PRODUCT_BY_ID(id));
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (
  payload: CreateProductPayload,
): Promise<void> => {
  try {
    const form = new FormData();
    const id = getUserId();
    if (!id) {
      toast.error('Please logout and login');
      return;
    }
    console.log(form);

    form.append('UserId', String(id));
    form.append('Name', payload.Name);
    form.append('Category', payload.Category);
    form.append('Unit', String(payload.quantity));
    form.append('PriceUsd', String(payload.PriceUsd));
    form.append('Moq', String(payload.Moq));
    form.append('Description', payload.Description);
    form.append('CurrencyId', String(payload.CurrencyId));
    form.append('StatusId', String(payload.StatusId));

    if (payload.ThumbnailImage) {
      form.append('ThumbnailImage', payload.ThumbnailImage);
    }

    payload.Images.forEach((img) => {
      form.append('images', img);
    });

    await api.post(APIENDPOINTSTWO.PRODUCT_CREATE, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    throw error;
  }
};
export const editProduct = async ({ id, payload }: EditProductPayload) => {
  try {
    const form = new FormData();

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
      form.append('images', img);
    });

    await api.put(APIENDPOINTSTWO.PRODUCT_BY_ID(id), form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    throw error;
  }
};

//product category
export const getProductCategories =
  async (): Promise<ProductCategoryListResponse> => {
    try {
      const response = await api.get(APIENDPOINTSTWO.PRODUCT_CATEGORY);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

export const getProductCategoryById = async (
  id: number,
): Promise<ProductCategory> => {
  try {
    const response = await api.get(APIENDPOINTSTWO.PRODUCT_CATEGORY_BY_ID(id));
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createProductCategory = async (payload: {
  name: string;
  description: string;
}): Promise<void> => {
  try {
    await api.post(APIENDPOINTSTWO.PRODUCT_CATEGORY, payload);
  } catch (error) {
    throw error;
  }
};

export const updateProductCategory = async (
  id: number,
  payload: { name: string; description: string },
): Promise<void> => {
  try {
    await api.put(APIENDPOINTSTWO.PRODUCT_CATEGORY_BY_ID(id), payload);
  } catch (error) {
    throw error;
  }
};

export const deleteProductCategory = async (id: number): Promise<void> => {
  try {
    await api.delete(APIENDPOINTSTWO.PRODUCT_CATEGORY_BY_ID(id));
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(APIENDPOINTSTWO.PRODUCT_BY_ID(id));
  } catch (error) {
    throw error;
  }
};

export const getProductCountries =
  async (): Promise<ProductCountryListResponse> => {
    try {
      // Fetch all 193 countries in one shot
      const response = await api.get(
        `${APIENDPOINTSTWO.PRODUCT_COUNTRIES}?PageNumber=1&PageSize=250`,
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
