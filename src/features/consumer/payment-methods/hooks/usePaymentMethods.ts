'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getPaymentMethods,
  addCardPaymentMethod,
  addZellePaymentMethod,
  addAchPaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
} from '../api/paymentApi';
import { queryClient } from '@/lib/react-query';

const PM_KEY = ['consumer-payment-methods'];

export interface AddCardPayload {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault?: boolean;
}

export const useGetPaymentMethods = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: [...PM_KEY, pageNumber, pageSize],
    queryFn: () => getPaymentMethods(pageNumber, pageSize),
    staleTime: 60 * 1000,
    retry: 4,
  });
};

export const useAddCardPaymentMethod = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (payload: AddCardPayload) => addCardPaymentMethod(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PM_KEY });
      toast.success('Card added');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to add card. Please try again.');
    },
  });
};

export const useAddZellePaymentMethod = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: addZellePaymentMethod,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['consumer-payment-methods'] });
      toast.success(data.message ?? 'Zelle account added');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to add Zelle. Please try again.');
    },
  });
};

export const useAddAchPaymentMethod = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: addAchPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PM_KEY });
      toast.success('ACH bank account added');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to add bank account. Please try again.');
    },
  });
};

export const useDeletePaymentMethod = () => {
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
