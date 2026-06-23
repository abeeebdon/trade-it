import { useQuery } from '@tanstack/react-query';
import { getBuyerOrders } from '../api/buyerOrder';

export const useGetBuyerOrders = () => {
  return useQuery({
    queryKey: ['buyer-orders'],
    queryFn: getBuyerOrders,
  });
};
