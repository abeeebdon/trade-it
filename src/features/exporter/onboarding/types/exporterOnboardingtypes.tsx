type AnchorAccounts = {
  isActive: boolean;
  message: string;
  ngnVirtualAccount: string | null;
  usdVirtualAccount: string | null;
};

export type BusinessProfile = {
  verificationId: string | null;
  businessName: string;
  businessType: string;
  sector: string;
  country: string;
};

type Verification = {
  kycStatus: string;
  kybStatus: string;
  overallStatus: string;
  message: string;
  reviewedAt: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export interface OnboardingRespType {
  activeStep: string;
  anchorAccounts: AnchorAccounts;
  badges: string[];
  businessProfile: BusinessProfile;
  steps: string[];
  subtitle: string;
  title: string;
  verification: Verification;
}
export interface BusinessProfilePayload {
  businessName: string;
  businessType: string;
  country: string;
  sector: string;
  cacNumber: string;
  bvn: string;
  tin: string;
  ein: string;
  directorName: string;
}
