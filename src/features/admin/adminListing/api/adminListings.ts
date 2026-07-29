import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { AdminListing, ModerateListingPayload } from '../types/listings';

export interface GetAdminListingsParams {
  status?: string;
}

export const getAdminListings = async ({
  status,
}: GetAdminListingsParams): Promise<AdminListing[]> => {
  try {
    const response = await api.get(APIENDPOINTSTWO.ADMIN_LISTINGS, {
      params: { status },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const moderateListing = async ({
  listingId,
  payload,
}: {
  listingId: number;
  payload: ModerateListingPayload;
}) => {
  try {
    const response = await api.patch(
      APIENDPOINTSTWO.ADMIN_LISTINGS_MODERATE(listingId),
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
