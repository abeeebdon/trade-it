'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getPaymentMethods,
  addPaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
} from '../api/paymentApi';
import type { PaymentMethod } from '../types';

const PM_KEY = ['consumer-payment-methods'];

export const useGetPaymentMethods = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: [...PM_KEY, pageNumber, pageSize],
    queryFn: () => getPaymentMethods(pageNumber, pageSize),
  });
};

export const useAddPaymentMethod = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: Omit<PaymentMethod, 'id' | 'label'> & { label?: string },
    ) => addPaymentMethod(payload as Omit<PaymentMethod, 'id'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PM_KEY });
      toast.success('Payment method added');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to add payment method. Please try again.');
    },
  });
};

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PM_KEY });
      toast.success('Payment method removed');
    },
    onError: () => {
      toast.error('Failed to remove payment method.');
    },
  });
};

export const useSetDefaultPaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => setDefaultPaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PM_KEY });
      toast.success('Default payment method updated');
    },
    onError: () => {
      toast.error('Failed to update default payment method.');
    },
  });
};
