import { APIENDPOINTSTWO } from '@/configs/api-urls';
import api from '@/configs/api-config';
import type { Receipt } from '../types';

export interface ReceiptsApiResponse {
  data: {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    data: Receipt[];
  };
}

/** GET /api/Receipt — fetch all receipts */
export const getReceipts = async (
  pageNumber = 1,
  pageSize = 10,
): Promise<ReceiptsApiResponse> => {
  const response = await api.get(APIENDPOINTSTWO.RECEIPT, {
    params: { pageNumber, pageSize },
  });
  return response.data;
};

/** GET /api/Receipt/{orderId} — fetch a single receipt */
export const getReceiptByOrderId = async (
  orderId: string | number,
): Promise<Receipt> => {
  const response = await api.get(APIENDPOINTSTWO.RECEIPT_BY_ORDER(orderId));
  return response.data.data ?? response.data;
};

/** GET /api/Receipt/{orderId}/download — download receipt as blob */
export const downloadReceipt = async (
  orderId: string | number,
): Promise<Blob> => {
  const response = await api.get(APIENDPOINTSTWO.RECEIPT_DOWNLOAD(orderId), {
    responseType: 'blob',
  });
  return response.data;
};
