import { useQuery } from '@tanstack/react-query';
import {
  getSellerOrders,
  SellerOrdersParams,
  getOrderById,
} from '../api/ordersApi';

export const useGetSellerOrders = ({
  pageNumber,
  pageSize,
}: SellerOrdersParams) => {
  return useQuery({
    queryKey: ['seller-orders', pageNumber, pageSize],
    queryFn: () => getSellerOrders({ pageNumber, pageSize }),
  });
};

export const useGetOrderById = (id: string) => {
  return useQuery({
    queryKey: ['order-detail', id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
};
