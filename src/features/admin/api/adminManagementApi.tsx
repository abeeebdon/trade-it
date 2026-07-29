import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { GetAdminsProps } from '../types/adminManagementTypes';

export const getAdmins = async ({ search }: GetAdminsProps) => {
  try {
    const response = await api.get(
      `${APIENDPOINTSTWO.ADMIN_ADMINS}?search=${search}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
