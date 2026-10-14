import type { KycForm } from '../../types/exporter';
import type { OnboardingRespType } from '../types/exporterOnboardingtypes';
import type { BusinessFormValues } from '../types/validation';

export type OnboardingStatus = 'pending' | 'under_review' | 'approved';

/** How long the mock keeps a submission `under_review` before approving it. */
export const APPROVAL_DELAY_MS = 5 * 60 * 1000;

type MockOnboardingInput = {
  businessProfile: Partial<BusinessFormValues> | null;
  kycProfile: Omit<KycForm, 'docs'> | null;
  currentStep: number;
  /** Epoch ms when the KYC/KYB documents were submitted. */
  submittedAt: number | null;
};

const NGN_VIRTUAL_ACCOUNT = 'NGN-100000123456';
const USD_VIRTUAL_ACCOUNT = 'USD-100000123456';

const STATUS_MESSAGES: Record<OnboardingStatus, string> = {
  pending: 'Awaiting review',
  under_review: 'Documents under review',
  approved: 'Verification approved',
};

/**
 * TEMP: stands in for `getExporterOnboardingStatus` until the endpoint returns
 * the real payload. Returns the exact `OnboardingRespType` the API is expected
 * to send (no casts), so swapping the hook over is the only change needed.
 */
export function buildMockOnboardingDetails({
  businessProfile,
  kycProfile,
  currentStep,
  submittedAt,
}: MockOnboardingInput): OnboardingRespType {
  const businessType = businessProfile?.businessType ?? 'business';
  const docsLabel =
    businessType === 'individual' ? 'KYC Documents' : 'KYB Documents';
  const submitted = Boolean(kycProfile) || currentStep >= 3;

  // The review clock starts at submission: `under_review` for the first
  // APPROVAL_DELAY_MS, then auto-approved.
  const approvedAt =
    submittedAt != null ? submittedAt + APPROVAL_DELAY_MS : null;
  const isApproved = Boolean(
    businessProfile && submitted && approvedAt && Date.now() >= approvedAt,
  );
  const status: OnboardingStatus =
    businessProfile && submitted
      ? isApproved
        ? 'approved'
        : 'under_review'
      : 'pending';

  return {
    activeStep: String(currentStep),
    title: 'Exporter onboarding',
    subtitle: 'Complete verification to activate your Anchor accounts',
    steps: ['Business Profile', docsLabel, 'Accounts Details'],
    badges: isApproved
      ? ['Business Profile', 'Verified']
      : ['Business Profile'],
    anchorAccounts: {
      isActive: isApproved,
      message: isApproved ? 'Account ready for use' : 'Pending setup',
      ngnVirtualAccount: isApproved ? NGN_VIRTUAL_ACCOUNT : null,
      usdVirtualAccount: isApproved ? USD_VIRTUAL_ACCOUNT : null,
    },
    businessProfile: {
      verificationId: null,
      businessName: businessProfile?.businessName ?? '',
      businessType,
      sector: businessProfile?.sector ?? 'fashion',
      country: businessProfile?.country ?? 'Nigeria',
      contact_phone: businessProfile?.contact_phone ?? '',
      contact_email: businessProfile?.contact_email ?? '',
      address: businessProfile?.address ?? '',
      cacNumber: businessProfile?.cacNumber ?? '',
      tin: businessProfile?.tin ?? '',
      director_name: businessProfile?.director_name ?? '',
      bvn: businessProfile?.bvn ?? '',
      nin: businessProfile?.nin ?? '',
      ein: businessProfile?.ein ?? '',
    },
    verification: {
      kycStatus: status,
      kybStatus: status,
      overallStatus: status,
      message: STATUS_MESSAGES[status],
      reviewedAt:
        isApproved && approvedAt ? new Date(approvedAt).toISOString() : null,
    },
  };
}
