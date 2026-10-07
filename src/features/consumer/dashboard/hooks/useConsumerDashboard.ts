'use client';

import { useQuery } from '@tanstack/react-query';
import { getConsumerDashboard } from '../api/dashboardApi';

export const useConsumerDashboard = () => {
  return useQuery({
    queryKey: ['consumer-dashboard'],
    queryFn: getConsumerDashboard,
    staleTime: 60 * 1000,
    retry: 4,
    refetchOnWindowFocus: true,
  });
};
