import api from '@/configs/api-config';
import {
  CreateProductPayload,
  ProductListParams,
  ProductListResponse,
} from '../types/exporter';

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

export const createProduct = async (
  payload: CreateProductPayload,
): Promise<void> => {
  try {
    const form = new FormData();

    if (payload.UserId !== undefined) {
      form.append('UserId', String(payload.UserId));
    }

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

    await api.post('/Product/create', form);
  } catch (error) {
    throw error;
  }
};
