import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  acceptAndPrepayQuote,
  declineQuote,
  getConsumerOrders,
  getConsumerQuotes,
  placeConsumerQuote,
} from '../api/consumerApi';
import {
  AcceptAndPrepayQuotePayload,
  CreateConsumerQuoteRequest,
} from '../types/shops';
import { toast } from 'sonner';

export const useGetOrders = () => {
  return useQuery({
    queryKey: ['consumer-orders'],
    queryFn: getConsumerOrders,
    staleTime: 2 * 60_000,
  });
};

export const useGetConsumerQuotes = () => {
  return useQuery({
    queryKey: ['consumer-quotes'],
    queryFn: getConsumerQuotes,
    staleTime: 2 * 60_000,
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

export const useAcceptAndPrepayQuote = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      quoteNumber,
      payload,
    }: {
      quoteNumber: string;
      payload: AcceptAndPrepayQuotePayload;
    }) => acceptAndPrepayQuote(quoteNumber, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['consumer-quotes'] });
      toast.success(data.message ?? 'Quote accepted and prepaid successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to accept quote. Please try again.');
    },
  });
};

export const useDeclineQuote = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quoteNumber: string) => declineQuote(quoteNumber),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['consumer-quotes'] });
      toast.success(data.message ?? 'Quote declined');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to decline quote. Please try again.');
    },
  });
};
