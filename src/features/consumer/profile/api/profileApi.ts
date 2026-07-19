import type {
  ProfileApiResponse,
  ProfileData,
  ProfileUpdatePayload,
} from '../types';
import { getSavedCookie } from '@/store/auth/cookies';
import axios from 'axios';

const ENDPOINT = '/Profile';
const baseUrl = 'https://jompshop.jompstart.com/api';

const authHeaders = () => {
  const token = getSavedCookie('token');
  return { Authorization: `Bearer ${token}` };
};

export const getProfile = async (): Promise<ProfileApiResponse> => {
  const response = await axios.get(`${baseUrl}${ENDPOINT}`, {
    headers: authHeaders(),
  });
  return response.data;
};

export const updateProfile = async (
  payload: ProfileUpdatePayload,
): Promise<ProfileData> => {
  const response = await axios.patch(`${baseUrl}${ENDPOINT}`, payload, {
    headers: authHeaders(),
  });
  return response.data.data;
};
