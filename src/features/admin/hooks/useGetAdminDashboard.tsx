import { useQuery } from '@tanstack/react-query';
import { getAdminDdashboard, getWaitlist } from '../api/adminApi';
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
