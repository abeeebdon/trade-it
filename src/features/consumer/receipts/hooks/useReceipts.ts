'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getReceipts,
  getReceiptByOrderId,
  downloadReceipt,
} from '../api/receiptApi';

const RECEIPT_KEY = ['consumer-receipts'];

// ── Get all receipts ──────────────────────────────────────

export const useGetReceipts = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: [...RECEIPT_KEY, pageNumber, pageSize],
    queryFn: () => getReceipts(pageNumber, pageSize),
    staleTime: 60 * 1000,
    retry: 3,
  });
};

// ── Get single receipt ────────────────────────────────────

export const useGetReceipt = (orderId: string | number | null) => {
  return useQuery({
    queryKey: [...RECEIPT_KEY, 'detail', orderId],
    queryFn: () => getReceiptByOrderId(orderId!),
    enabled: !!orderId,
    staleTime: 30 * 1000,
  });
};

// ── Download receipt ──────────────────────────────────────

export const useDownloadReceipt = () => {
  return useMutation({
    mutationFn: (orderId: string | number) => downloadReceipt(orderId),
    onSuccess: (blob, orderId) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Receipt downloaded');
    },
    onError: () => {
      toast.error('Failed to download receipt.');
    },
  });
};
