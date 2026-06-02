import { authRoleType } from '@/types';
import { Globe, ShoppingBag, Store } from 'lucide-react';
import { ROLES } from './data';

const icons = [Store, ShoppingBag, Globe];

export const getIcon = (id: number) => {
  const Icon = icons[id];

  if (!Icon) return null;

  return <Icon />;
};

export const ROLE_BLURBS: string[] = ROLES.map((role) => role.blurb);
export const ROLE_PILL: string[] = ROLES.map((role) => role.pill);

export const ROLE_VALUES = ROLES.map((role) => role.value) as authRoleType[];
export const getRoleBlurb = (id: number) => {
  return ROLE_BLURBS[id - 1] || '';
};
export const getRolePill = (id: number) => {
  return ROLE_PILL[id - 1] || '';
};
