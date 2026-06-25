import { useQuery } from '@tanstack/react-query';
import { getAdminOrders } from '../api/adminOrders';

export const useGetAdminOrders = () => {
  return useQuery({
    queryKey: ['admin-orders'],
    queryFn: getAdminOrders,
  });
};
