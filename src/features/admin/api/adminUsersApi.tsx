import api from '@/configs/api-config';
import { useGetAdminUsersProps } from '../types/adminuserTypes';
import { toast } from 'sonner';

export const getAdminUSers = async ({ search }: useGetAdminUsersProps) => {
  try {
    const response = await api.get(`/Admin/users?search=${search}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const activateUser = async (id: number) => {
  try {
    const response = await api.patch(`/Admin/Users/${id}/activate`);

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
export type SuspendUserPayload = {
  id: number;
  reason?: string;
};

export const suspendUser = async ({ id, reason }: SuspendUserPayload) => {
  try {
    const response = await api.patch(`/Admin/Users/${id}/suspend`, {
      reason,
    });

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
export const resetMFA = async (id: number) => {
  try {
    const response = await api.post(`/Admin/Users/${id}/reset-mfa`);

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
