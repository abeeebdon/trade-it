import { authRoleType } from '@/types';
import { Globe, ShoppingBag, Store } from 'lucide-react';
import { ROLES } from './data';
import { handleLogoutFn } from '@/store/auth/cookies';

const icons = [Store, ShoppingBag, Globe];

export const getIcon = (id: number) => {
  const Icon = icons[id];

  if (!Icon) return null;

  return <Icon />;
};

export const ROLE_VALUES = ROLES.map((role) => role.value) as authRoleType[];
export const getRoleBlurb = (id: string) => {
  return ROLES.find((r) => r.value == id);
};
export const logoutAction = async () => {
  handleLogoutFn();
};
