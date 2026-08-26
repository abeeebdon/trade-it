'use client';

import { useQuery } from '@tanstack/react-query';
import { getPaymentProviders } from '../api/paymentApi';

const PAYMENT_PROVIDERS_KEY = ['payment-providers'];

export const useGetPaymentProviders = () => {
  return useQuery({
    queryKey: PAYMENT_PROVIDERS_KEY,
    queryFn: getPaymentProviders,
    staleTime: 60 * 1000,
    retry: 2,
  });
};
