import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { LoginFormValues } from '../components/validation';
import { RegisterPostData } from '../types/auth';
import { toast } from 'sonner';

export const fetchUserTypes = async () => {
  try {
    const response = await api.get(APIENDPOINTSTWO.AUTH_ROOT);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const loginApi = async (data: LoginFormValues) => {
  try {
    const response = await api.post(APIENDPOINTSTWO.AUTH_LOGIN, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const forgotPasswordApi = async (data: any) => {
  try {
    const response = await api.post(APIENDPOINTSTWO.AUTH_FORGOT_PASSWORD, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resetPasswordApi = async (data: any) => {
  try {
    const response = await api.post(APIENDPOINTSTWO.AUTH_RESET_PASSWORD, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const registerApi = async (data: RegisterPostData) => {
  try {
    const response = await api.post(APIENDPOINTSTWO.AUTH_REGISTER, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
