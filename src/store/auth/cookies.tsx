import Cookies from 'js-cookie';

export const handleLogoutFn = () => {
  // implement logout by remove token from cookie
  Cookies.remove('token');
  Cookies.remove('refreshToken');
};

export const saveCookie = (key: string, value: string) => {
  if (typeof value === 'string') {
    Cookies.set(key, value);
  }

  if (typeof value !== 'string') {
    const newValue = JSON.stringify(value);
    Cookies.set(key, newValue);
  }
};

export const getSavedCookie = (key: string) => {
  return Cookies.get(key);
};
