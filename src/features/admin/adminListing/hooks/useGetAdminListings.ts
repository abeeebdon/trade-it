import { useQuery } from '@tanstack/react-query';
import { getAdminListings, GetAdminListingsParams } from '../api/adminListings';

export const useGetAdminListings = (params: GetAdminListingsParams = {}) => {
  return useQuery({
    queryKey: ['admin-listings', params.status],
    queryFn: () => getAdminListings(params),
  });
};
