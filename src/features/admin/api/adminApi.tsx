import api from '@/configs/api-config';
import { useGetWaitlistType } from '../hooks/useGetAdminDashboard';

export const getAdminDdashboard = async () => {
  try {
    const response = await api.get('/Admin/dashboard');
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
      `/Waitlist?pageNumber=${pageNumber}&pageSize=${pageSize}&customerType=${filter}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
// export const loginApi = async (data: LoginFormValues) => {
//     try {
//         const response = await api.post('/authentication/login', data);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };
