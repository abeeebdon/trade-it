import { useQuery } from '@tanstack/react-query';
import { getExporterQuotes } from '../api/fulfillmentApi';

export const useExporterQuotes = () => {
  return useQuery({
    queryKey: ['exporter-quotes'],
    queryFn: getExporterQuotes,
  });
};
