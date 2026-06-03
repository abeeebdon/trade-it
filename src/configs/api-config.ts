import { getSavedCookie, saveCookie } from '@/store/auth/cookies';
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { refreshAccessToken } from './refresh';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  __isRetryRequest?: boolean;
  useTempToken?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// prevents multiple refresh requests
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });

  failedQueue = [];
};

// logout function
const handleLogout = () => {
  saveCookie('token', '');

  window.location.href = '/login';
};

api.interceptors.request.use(
  (config) => {
    const token = getSavedCookie('token');

    // optional temp token logic

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const config = error.config as CustomAxiosRequestConfig;

    // network error
    if (!error.response) {
      return Promise.reject(
        new Error('Network error. Please check your internet connection.'),
      );
    }

    // unauthorized + retry
    if (error.response.status === 401 && config && !config.__isRetryRequest) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              config.headers = config.headers ?? {};
              config.headers.Authorization = `Bearer ${token}`;

              resolve(api(config));
            },
            reject,
          });
        });
      }

      config.__isRetryRequest = true;
      isRefreshing = true;

      try {
        const accessToken = await refreshAccessToken();

        saveCookie('token', accessToken);

        processQueue(null, accessToken);

        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;

        return api(config);
      } catch (refreshError) {
        processQueue(refreshError, null);

        handleLogout();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // optional central status handling
    switch (error.response.status) {
      case 403:
        console.error('Forbidden');
        break;

      case 404:
        console.error('Not found');
        break;

      case 500:
        console.error('Server error');
        break;
    }

    return Promise.reject(error);
  },
);

export default api;
