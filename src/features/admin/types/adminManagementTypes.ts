export type AdminType = {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
};

export interface AdminTableRowProps {
  admin: AdminType;
}

export interface GetAdminsProps {
  search: string;
}
