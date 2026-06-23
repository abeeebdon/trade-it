import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBuyerQuoteRequest, placeQuote } from '../api/buyerQuotes';
import { invalidateQueries } from '@/lib/react-query';
import { QuoteRequestType } from '../types/orders';
import { toast } from 'sonner';

export const useGetBuyerOrders = () => {
  return useQuery({
    queryKey: ['buyer-quotes'],
    queryFn: getBuyerQuoteRequest,
  });
};

export const useGetQuoteOrder = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: QuoteRequestType) => placeQuote(payload),
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
