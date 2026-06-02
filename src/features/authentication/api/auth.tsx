import api from '@/configs/api-config';
import { LoginFormValues } from '../components/validation';

export const fetchUserTypes = async () => {
  try {
    const response = await api.get('/authentication');
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const loginApi = async (data: LoginFormValues) => {
  try {
    const response = await api.post('/authentication/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
