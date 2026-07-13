import api from '@/configs/api-config';
import { GetAdminsProps } from '../types/adminManagementTypes';

export const getAdmins = async ({ search }: GetAdminsProps) => {
  try {
    const response = await api.get(`/Admin/admins?search=${search}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
