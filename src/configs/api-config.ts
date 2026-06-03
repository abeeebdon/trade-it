import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  __isRetryRequest?: boolean;
  useTempToken?: boolean;
}

// logout function
// const handleLogout = () => {
//   store.dispatch(logout());
//   cookiesStorage.clearAll(); // Clear all cookies
//   window.location.href = '/welcome';
// };

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// api.interceptors.request.use(
//   (config) => {
//     // const token = cookiesStorage.getItem('token');
//     const useTempToken = (config as CustomAxiosRequestConfig).useTempToken;
//     const token = useTempToken
//       ? cookiesStorage.getItem('tempToken')
//       : cookiesStorage.getItem('token');

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {},
// );

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && config && !config.__isRetryRequest) {
      try {
        // mark the request as a retry attempt
        config.__isRetryRequest = true;

        // request new accesstoken using refreshtoken
        // const accessToken = await refreshAccessToken();
        // cookiesStorage.setItem('token', accessToken);

        // error.config!.headers.Authorization = `Bearer ${accessToken}`;

        // retry original request with new accesstoken
        return api(error.config!);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     const message = error.response?.data?.message || 'Something went wrong';

//     switch (status) {
//       case 400:
//         toast.error(message || 'Bad request');
//         break;

//       case 401:
//         toast.error('Unauthorized. Please login again.');
//         // optional redirect
//         // window.location.href = '/login';
//         break;

//       case 403:
//         toast.error('You do not have permission.');
//         break;

//       case 404:
//         toast.error('Resource not found.');
//         break;

//       case 409:
//         toast.error(message || 'Conflict occurred.');
//         break;

//       case 422:
//         toast.error(message || 'Validation failed.');
//         break;

//       case 500:
//         toast.error('Server error. Please try again later.');
//         break;

//       default:
//         toast.error(message);
//     }

//     return Promise.reject(error);
//   },
// );
