export interface WaitlistTypeData {
  id: number;
  fullName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  customerType: string;
  role: string;
  country: string;
  notes: string;
  source: string;
  status: 'pending' | 'active' | 'suspended' | 'inactive';
  invitedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface PaginationType {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}
