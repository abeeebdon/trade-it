import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBuyerQuoteRequest, placeQuote } from '../api/buyerQuotes';
import { QuoteRequestType } from '../types/orders';
import { FulfillmentQueueResponse } from '@/features/exporter/types/exporter';
import { toast } from 'sonner';

export const useGetBuyerQuotes = () => {
  return useQuery<FulfillmentQueueResponse>({
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
    onError: (err) => {
      toast.error(err.message ?? 'Failed to save product. Please try again.');
    },
  });
};
