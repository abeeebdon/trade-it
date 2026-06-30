import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getAdminDdashboard,
  getWaitlist,
  getWaitlistCommand,
  getWaitlistCSV,
} from '../api/adminApi';
export interface useGetWaitlistType {
  filter?: string;
  pageNumber?: number;
  pageSize?: number;
}
export const useGetAdminOverview = () => {
  return useQuery({
    queryKey: ['admin-overview'],
    queryFn: getAdminDdashboard,
  });
};

export const useGetWaitlist = ({
  filter,
  pageSize,
  pageNumber,
}: useGetWaitlistType) => {
  return useQuery({
    queryKey: ['admin-waittlist', filter, pageSize, pageNumber],
    queryFn: () => getWaitlist({ filter, pageSize, pageNumber }),
  });
};
export const useGetWaitlistCommand = () => {
  return useQuery({
    queryKey: ['admin-waitlist-command'],
    queryFn: getWaitlistCommand,
  });
};
export const useGetWaitlistCSV = () => {
  return useMutation({
    mutationFn: (filter: string) => getWaitlistCSV({ filter }),
  });
};
