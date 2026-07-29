import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { useGetWaitlistType } from '../hooks/useGetAdminDashboard';

export const getAdminDdashboard = async () => {
  try {
    const response = await api.get(APIENDPOINTSTWO.ADMIN_DASHBOARD);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const getWaitlist = async ({
  pageNumber,
  pageSize,
  filter,
}: useGetWaitlistType) => {
  try {
    const response = await api.get(
      `${APIENDPOINTSTWO.WAITLIST}?pageNumber=${pageNumber}&pageSize=${pageSize}&customerType=${filter}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const getWaitlistCommand = async () => {
  try {
    const response = await api.get(APIENDPOINTSTWO.ADMIN_WAITLIST_COMMAND);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getWaitlistCSV = async ({ filter }: { filter: string }) => {
  try {
    const response = await api.get(APIENDPOINTSTWO.ADMIN_WAITLIST_CSV(filter));
    return response.data;
  } catch (error) {
    throw error;
  }
};
