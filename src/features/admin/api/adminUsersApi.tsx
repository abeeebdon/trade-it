import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { useGetAdminUsersProps } from '../types/adminuserTypes';
import { toast } from 'sonner';

export const getAdminUSers = async ({ search }: useGetAdminUsersProps) => {
  try {
    const response = await api.get(
      `${APIENDPOINTSTWO.ADMIN_USERS}?search=${search}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const activateUser = async (id: number) => {
  try {
    const response = await api.patch(APIENDPOINTSTWO.ADMIN_USERS_ACTIVATE(id));

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
    const response = await api.patch(APIENDPOINTSTWO.ADMIN_USERS_SUSPEND(id), {
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
    const response = await api.post(APIENDPOINTSTWO.ADMIN_USERS_RESET_MFA(id));

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
