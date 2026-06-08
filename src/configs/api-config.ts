import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  getSavedCookie,
  handleLogoutFn,
  saveCookie,
} from '@/store/auth/cookies';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  __isRetryRequest?: boolean;
}

// Main API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Separate instance for refresh requests
const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Prevent multiple refresh requests
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

// Logout function
const handleLogout = () => {
  handleLogoutFn();

  if (typeof window !== 'undefined') {
    window.location.replace('/login');
  }
};

// Refresh access token
const refreshAccessToken = async () => {
  const refreshToken = getSavedCookie('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  const response = await refreshApi.post('/auth/refresh', {
    refreshToken,
  });

  return response.data.accessToken;
};

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getSavedCookie('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const config = error.config as CustomAxiosRequestConfig;

    // Network error
    if (!error.response) {
      return Promise.reject(
        new Error('Network error. Please check your internet connection.'),
      );
    }

    // Refresh endpoint failed → logout immediately
    if (config?.url?.includes('/auth/refresh')) {
      handleLogout();
      return Promise.reject(error);
    }

    // Unauthorized
    if (error.response.status === 401 && config && !config.__isRetryRequest) {
      // Queue requests while refreshing
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

        // Save new token
        saveCookie('token', accessToken);

        // Retry queued requests
        processQueue(null, accessToken);

        // Retry original request
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

    // Optional central error handling
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
