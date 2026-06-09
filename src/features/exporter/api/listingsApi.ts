import api from '@/configs/api-config';
import { Listing, CreateListingPayload } from '../types/exporter';

export type ListingsParams = {
  pageNumber: number;
  pageSize: number;
};

export type ListingsPageData = {
  title: string;
  sectionTitle: string;
  deliveryPartnerOfRecord: string;
  notice: string;
  totalListings: number;
  activeListings: number;
  outOfStockListings: number;
  listings: {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    data: Listing[];
  };
};

export const getListings = async ({
  pageNumber,
  pageSize,
}: ListingsParams): Promise<ListingsPageData> => {
  try {
    const response = await api.get(
      `/Direct-to-Consumer?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Create new listing

export const createListing = async (payload: CreateListingPayload) => {
  const formData = new FormData();

  formData.append('UserId', String(payload.UserId));
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
    formData.append('Photos[]', photo);
  });

  const response = await api.post('/Direct-to-Consumer/listings', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
