import { getSavedCookie, saveCookie } from '@/store/auth/cookies';
import api from './api-config';

export const refreshAccessToken = async () => {
  const token = getSavedCookie('token');
  const refreshToken = getSavedCookie('refreshToken');
  const data = {
    token,
    refreshToken,
  };
  try {
    const resp = await api.post('/authentication/refresh-token', data);
    if (resp.data.success) {
      const token = resp.data.token;
      const refreshAccessToken = resp.data.refreshAccessToken;
      saveCookie('token', token);
      saveCookie('refreshToken', refreshAccessToken);
      return token;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
