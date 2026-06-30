import api from '@/configs/api-config';
import { APIENDPOINTS } from '@/configs/api-urls';
import { ListingsParams } from '@/features/exporter/sell/types/sellType';
import {
  CreateLocalListingPayload,
  EditLocalListingPayload,
} from '../types/inventory';

export const getLocalListings = async ({
  pageNumber,
  pageSize,
}: ListingsParams) => {
  try {
    const response = await api.get(
      `${APIENDPOINTS.LOCAL_LISTINGS}?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getLocalListingById = async ({ id }: { id: string }) => {
  try {
    const response = await api.get(`${APIENDPOINTS.LOCAL_LISTINGS}/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Create new listing

export const createLocalListing = async (
  payload: CreateLocalListingPayload,
) => {
  const formData = new FormData();

  formData.append('Title', payload.Title);
  formData.append('Category', payload.Category);
  formData.append('RetailPriceUsd', payload.RetailPriceUsd.toString());
  formData.append('StockQty', payload.StockQty.toString());
  formData.append('ShipsFrom', payload.ShipsFrom);
  formData.append('Description', payload.Description);
  formData.append(
    'LocalListingStatusId',
    payload.LocalListingStatusId.toString(),
  );

  payload.Photos.forEach((photo) => {
    formData.append('Photos', photo);
  });

  const response = await api.post(APIENDPOINTS.LOCAL_LISTINGS, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
export const editLocalListing = async ({
  id,
  payload,
}: EditLocalListingPayload) => {
  const formData = new FormData();

  formData.append('Title', payload.Title);
  formData.append('Category', payload.Category);
  formData.append('RetailPriceUsd', payload.RetailPriceUsd.toString());
  formData.append('StockQty', payload.StockQty.toString());
  formData.append('ShipsFrom', payload.ShipsFrom);
  formData.append('Description', payload.Description);
  formData.append(
    'LocalListingStatusId',
    payload.LocalListingStatusId.toString(),
  );

  payload.Photos.forEach((photo) => {
    formData.append('Photos', photo);
  });

  const response = await api.put(
    `/Direct-to-Consumer/listings/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
