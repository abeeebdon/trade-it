import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getSellerOrders,
  getOrderById,
  createOrder,
  updateOrderFulfillment,
} from '../api/ordersApi';
import {
  SellerOrdersParams,
  UpdateOrderFulfillmentPayload,
} from '../orders/types/exporterOrdersType';
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

export const useUpdateOrderFulfillment = (
  id: string | number,
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateOrderFulfillmentPayload) =>
      updateOrderFulfillment(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['order-detail', String(id)],
      });
      queryClient.invalidateQueries({ queryKey: ['seller-orders'] });
      toast.success(data?.message ?? 'Fulfillment updated successfully');
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? 'Failed to update fulfillment. Please try again.';
      toast.error(message);
    },
  });
};
export const useCreateOrder = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['exporter-products'] });
      toast.success(data.message ?? 'Order created successfully');
      onSuccess?.();
    },
  });
};
