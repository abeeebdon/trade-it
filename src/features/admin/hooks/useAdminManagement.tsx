import { useMutation, useQuery } from '@tanstack/react-query';
import { getAdmins } from '../api/adminManagementApi';
import { GetAdminsProps } from '../types/adminManagementTypes';
import { invalidateQueries } from '@/lib/react-query';
import { registerApi } from '@/features/authentication/api/auth';
import { toast } from 'sonner';

export const useGetAdmins = ({ search }: GetAdminsProps) => {
  return useQuery({
    queryKey: ['admins', search],
    queryFn: () => getAdmins({ search }),
  });
};

export const useCreateAdmin = () => {
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      invalidateQueries(['admins']);
      toast.success(
        data.message ??
          'Admin created successfully, please send admin details to login ',
      );
    },
  });
};
