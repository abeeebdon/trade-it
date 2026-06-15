import api from '@/configs/api-config';
import { LoginFormValues } from '../components/validation';
import { RegisterPostData } from '../types/auth';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const forgotPasswordApi = async (data: any) => {
  try {
    const response = await api.post('/authentication/forgot-password', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resetPasswordApi = async (data: any) => {
  try {
    const response = await api.post('/authentication/reset-password', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const registerApi = async (data: RegisterPostData) => {
  try {
    const response = await api.post('/authentication/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
