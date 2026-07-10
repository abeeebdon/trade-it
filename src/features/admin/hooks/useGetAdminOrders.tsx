import { useQuery } from '@tanstack/react-query';
import { getAdminOrders, GetAdminOrdersParams } from '../api/adminOrders';

export const useGetAdminOrders = (params: GetAdminOrdersParams = {}) => {
  return useQuery({
    queryKey: ['admin-orders', params.status],
    queryFn: () => getAdminOrders(params),
  });
};
