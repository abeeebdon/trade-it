import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import type { ApiQuoteRequest } from '../types/fulftillment';

export interface ExporterQuotesResponse {
  data: ApiQuoteRequest[];
  message: string;
  statusCode: number;
  success: boolean;
}

export const getExporterQuotes = async (): Promise<ExporterQuotesResponse> => {
  const response = await api.get(APIENDPOINTSTWO.EXPORTER_QUOTES);
  return response.data;
};
