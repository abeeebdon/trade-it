import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSellerOrders, getOrderById, createOrder } from '../api/ordersApi';
import { SellerOrdersParams } from '../orders/types/exporterOrdersType';
import { CreateOrderPayload } from '@/features/shops/types/shops';
import { toast } from 'sonner';

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
export const useCreateOrder = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exporter-products'] });
      toast.success('Product created successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to save product. Please try again.');
    },
  });
};
