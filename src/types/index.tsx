import { LucideIcon } from 'lucide-react';
export type UserRole =
  | 'exporter'
  | 'buyer'
  | 'super_admin'
  | 'admin'
  | 'consumer';
export type authRoleType = UserRole;
export interface UserType {
  name: string;
  email: string;
  role: UserRole;
  user_id: string;
}

export interface InitialAuthStateType {
  isAuth: boolean;
  user: UserType | null;
  authRole: authRoleType | null;
}
export interface RootReducerType {
  auth: InitialAuthStateType;
}

export interface NavItems {
  to: string;
  label: string;
  icon: LucideIcon;
}
