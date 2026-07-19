'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getAddresses,
  addAddress,
  deleteAddress,
  setDefaultAddress,
} from '../api/addressApi';
import type { DeliveryAddress } from '../types';

const ADDRESSES_KEY = ['consumer-addresses'];

export const useGetAddresses = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: [...ADDRESSES_KEY, pageNumber, pageSize],
    queryFn: () => getAddresses(pageNumber, pageSize),
  });
};

export const useAddAddress = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Omit<DeliveryAddress, 'id'>) => addAddress(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY });
      toast.success('Address added');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to add address. Please try again.');
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY });
      toast.success('Address removed');
    },
    onError: () => {
      toast.error('Failed to remove address.');
    },
  });
};

export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => setDefaultAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY });
      toast.success('Default address updated');
    },
    onError: () => {
      toast.error('Failed to update default address.');
    },
  });
};
