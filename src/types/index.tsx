import { LucideIcon } from 'lucide-react';
export type UserRole =
  | 'exporter'
  | 'reseller'
  | 'consumer'
  | 'super_admin'
  | 'admin';
export type authRoleType = UserRole;
export interface AuthRole {
  id: number;
  name: string;
  description: string;
  value: string;
}
export interface UserType {
  fullName: string;
  email: string;
  role: UserRole;
}

export interface InitialAuthStateType {
  isAuth: boolean;
  user: UserType | null;
  authRole: authRoleType | null;
  userRole: AuthRole | null;
}
export interface RootReducerType {
  auth: InitialAuthStateType;
}

export interface NavItems {
  to: string;
  label: string;
  icon: LucideIcon;
}
