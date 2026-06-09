export interface VerificationResp {
  id: number | string;
  userId: number;
  businessName: string;
  businessType: string;
  country: string;
  sector: string;
  anchorCustomerId: string;
  cacNumber: string;
  bvn: string;
  tin: string;
  ein: string;
  directorName: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
  kybStatus: 'pending' | 'approved' | 'rejected';
  status: 'pending' | 'approved' | 'rejected';
  adminNote: string;
  submittedAt: string;
  reviewedAt: string | null;
  provisionedAt: string | null;
}
export type ApproveVerificationPayload = {
  id: string | number;
  data: { note: string };
};
export interface VerificationCardPRops {
  b: VerificationResp;
}
