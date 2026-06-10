export type AdminUserResponseType = {
  id: number;
  fullName: string;
  email: string;
  isMfaEnabled: boolean;
  isSuspended: boolean;
  suspensionReason: string;
  roles: string[];
  createdAt: string;
};
export interface UserTableCardProps {
  user: AdminUserResponseType;
}
export interface useGetAdminUsersProps {
  search: string;
}
