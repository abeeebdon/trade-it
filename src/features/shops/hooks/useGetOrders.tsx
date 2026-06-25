import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getConsumerOrders, placeConsumerQuote } from '../api/consumerApi';
import { CreateConsumerQuoteRequest } from '../types/shops';
import { toast } from 'sonner';

export const useGetOrders = () => {
  return useQuery({
    queryKey: ['buyer-orders'],
    queryFn: getConsumerOrders,
  });
};
export const useGetConsumerQuoteOrder = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateConsumerQuoteRequest) =>
      placeConsumerQuote(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['buyer-quotes'] });
      toast.success(data.message ?? 'Order created successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to save product. Please try again.');
    },
  });
};
