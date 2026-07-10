import api from '@/configs/api-config';
import { APIENDPOINTS } from '@/configs/api-urls';
import { AdminListing } from '../types/listings';

export interface GetAdminListingsParams {
  status?: string;
}

export const getAdminListings = async ({
  status,
}: GetAdminListingsParams): Promise<AdminListing[]> => {
  try {
    const response = await api.get(APIENDPOINTS.ADMIN_LISTINGS, {
      params: { status },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
