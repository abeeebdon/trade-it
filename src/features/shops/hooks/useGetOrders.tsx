import { useQuery } from '@tanstack/react-query';
import { getConsumerOrders } from '../api/consumerApi';

export const useGetOrders = () => {
  return useQuery({
    queryKey: ['buyer-orders'],
    queryFn: getConsumerOrders,
  });
};
