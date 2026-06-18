import { useQuery } from '@tanstack/react-query';
import { getMarketDetailsById } from '../api/marketDetailsApi';

// Get Direct to customers listing
export const useGetMarketPlaceById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => getMarketDetailsById({ id }),
  });
};
