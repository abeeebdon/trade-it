import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getAdminOrderById,
  getAdminOrders,
  GetAdminOrdersParams,
  updateAdminOrderFulfillment,
  UpdateAdminOrderFulfillmentPayload,
} from '../api/adminOrders';
import { queryClient } from '@/lib/react-query';

export const useGetAdminOrders = (params: GetAdminOrdersParams = {}) => {
  return useQuery({
    queryKey: ['admin-orders', params.status],
    queryFn: () => getAdminOrders(params),
    staleTime: 60 * 1000,
  });
};

export const useGetAdminOrderById = (id?: string | null) => {
  return useQuery({
    queryKey: ['admin-order', id],
    queryFn: () => getAdminOrderById(id as string),
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
};

export const useUpdateAdminOrderFulfillment = (
  id: string | number,
  onSuccess?: () => void,
) => {
  return useMutation({
    mutationFn: (payload: UpdateAdminOrderFulfillmentPayload) =>
      updateAdminOrderFulfillment(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-order'] });
      toast.success(data?.message ?? 'Order status updated successfully');
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? 'Failed to update order status. Please try again.';
      toast.error(message);
    },
  });
};
