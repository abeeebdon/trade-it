import { useMutation, useQuery } from '@tanstack/react-query';
import {
  activateUser,
  getAdminUSers,
  resetMFA,
  suspendUser,
} from '../api/adminUsersApi';
import { useGetAdminUsersProps } from '../types/adminuserTypes';
import { invalidateQueries } from '@/lib/react-query';

export const useGetAdminUsers = ({ search }: useGetAdminUsersProps) => {
  return useQuery({
    queryKey: ['admin-users', search],
    queryFn: () => getAdminUSers({ search }),
  });
};
export const useSuspendUser = () => {
  return useMutation({
    mutationFn: suspendUser,
    onSuccess: () => {
      invalidateQueries(['admin-users']);
    },
  });
};
export const useResetUserMFA = () => {
  return useMutation({
    mutationFn: resetMFA,
    onSuccess: () => {
      invalidateQueries(['admin-users']);
    },
  });
};
export const useActivateUser = () => {
  return useMutation({
    mutationFn: activateUser,
    onSuccess: () => {
      invalidateQueries(['admin-users']);
    },
  });
};
