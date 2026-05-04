import { LucideIcon } from 'lucide-react';
export type UserRole = 'exporter' | 'buyer' | 'super_admin' | 'admin';
export interface UserType {
  name: string;
  email: string;
  role: UserRole;
}

export interface InitialAuthStateType {
  isAuth: boolean;
  user: UserType | null;
}
export interface RootReducerType {
  auth: InitialAuthStateType;
}

export interface NavItems {
  to: string;
  label: string;
  icon: LucideIcon;
}
