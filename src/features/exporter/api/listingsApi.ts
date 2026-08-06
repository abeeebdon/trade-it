import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { CreateListingPayload } from '../types/exporter';
import { ListingsPageData, ListingsParams } from '../sell/types/sellType';
import { getUserId } from '@/lib/helpers/TokenDetails';
import { toast } from 'sonner';
import { EditListingPayload } from '../fulfillment/types/fulftillment';

export const getListings = async ({
  pageNumber,
  pageSize,
}: ListingsParams): Promise<ListingsPageData> => {
  try {
    const response = await api.get(
      `${APIENDPOINTSTWO.DIRECT_TO_CONSUMER}?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getListingById = async ({ id }: { id?: string }) => {
  try {
    const response = await api.get(
      APIENDPOINTSTWO.DIRECT_TO_CONSUMER_LISTINGS_BY_ID(String(id)),
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Create new listing

export const createListing = async (payload: CreateListingPayload) => {
  const id = getUserId();
  if (!id) {
    toast.error('Please login and logout again');
    return;
  }
  const formData = new FormData();
  formData.append('UserId', String(id));
  formData.append('Title', payload.Title);
  formData.append('Category', payload.Category);
  formData.append('RetailPriceUsd', String(payload.RetailPriceUsd));
  formData.append('StockQty', String(payload.StockQty));
  formData.append('ShipsFrom', payload.ShipsFrom);
  formData.append('Description', payload.Description);
  formData.append('ProductStatusId', String(payload.ProductStatusId));
  formData.append('FulfillmentMode', payload.FulfillmentMode);

  if (payload.ThumbnailImage) {
    formData.append('ThumbnailImage', payload.ThumbnailImage);
  }

  payload.Photos.forEach((photo) => {
    formData.append('Photos', photo);
  });
  const response = await api.post(
    APIENDPOINTSTWO.DIRECT_TO_CONSUMER_LISTINGS,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
export const editListing = async ({ id, payload }: EditListingPayload) => {
  const formData = new FormData();
  formData.append('UserId', '9');
  formData.append('Title', payload.Title);
  formData.append('Category', payload.Category);
  formData.append('RetailPriceUsd', String(payload.RetailPriceUsd));
  formData.append('StockQty', String(payload.StockQty));
  formData.append('ShipsFrom', payload.ShipsFrom);
  formData.append('Description', payload.Description);
  formData.append('ProductStatusId', String(payload.ProductStatusId));
  formData.append('FulfillmentMode', payload.FulfillmentMode);

  if (payload.ThumbnailImage) {
    formData.append('ThumbnailImage', payload.ThumbnailImage);
  }

  payload.Photos.forEach((photo) => {
    formData.append('Photos', photo);
  });
  const response = await api.put(
    APIENDPOINTSTWO.DIRECT_TO_CONSUMER_LISTINGS_BY_ID(id),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export const deleteListing = async (id: string) => {
  try {
    const response = await api.delete(
      APIENDPOINTSTWO.DIRECT_TO_CONSUMER_LISTINGS_BY_ID(id),
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
