import { getSavedCookie } from '@/store/auth/cookies';
import { decodeToken } from 'react-jwt';
const token = getSavedCookie('token');
interface TokenType {
  UserId: string | number;
}
const decodedToken = decodeToken<TokenType>(token!);
export const getUserId = () => {
  return decodedToken ? decodedToken.UserId : '';
};
