import { LucideIcon } from 'lucide-react';
import type { OrdersState } from '@/store/orders/orders.slice';
import type { OnboardingState } from '@/store/onboarding/onboarding.slice';
export type UserRole =
  | 'exporter'
  | 'retailer'
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
  id: string | number;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface InitialAuthStateType {
  isAuth: boolean;
  user: UserType | null;
  authRole: authRoleType | null;
  userRole: AuthRole | null;
  mfaEnabled: boolean;
}
export interface RootReducerType {
  auth: InitialAuthStateType;
  orders: OrdersState;
  onboarding: OnboardingState;
}

export interface NavItems {
  to: string;
  label: string;
  icon: LucideIcon;
}
