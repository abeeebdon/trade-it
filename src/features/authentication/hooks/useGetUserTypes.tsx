import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchUserTypes,
  forgotPasswordApi,
  resetPasswordApi,
} from '../api/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const useGetUserTypes = () => {
  return useQuery({
    queryKey: ['user-types'],
    queryFn: fetchUserTypes,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordApi,

    onSuccess: (data) => {
      toast.success(data.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed please try again');
    },
  });
};
export const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: resetPasswordApi,

    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/login');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed please try again');
    },
  });
};

export default useGetUserTypes;
