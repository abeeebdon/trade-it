import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getExporterQuotes,
  respondToQuote,
  RespondQuotePayload,
} from '../api/fulfillmentApi';
import { toast } from 'sonner';

export const useExporterQuotes = () => {
  return useQuery({
    queryKey: ['exporter-quotes'],
    queryFn: getExporterQuotes,
  });
};

export const useRespondToQuote = (onSuccess?: (data?: unknown) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      quoteNumber,
      payload,
    }: {
      quoteNumber: string;
      payload: RespondQuotePayload;
    }) => respondToQuote(quoteNumber, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['exporter-quotes'] });
      onSuccess?.(data);
    },
    onError: () => {
      toast.error('Failed to send quote');
    },
  });
};
