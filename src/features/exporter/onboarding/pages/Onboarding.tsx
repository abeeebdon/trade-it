'use client';

import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import {
  selectOnboarding,
  setOnboardingStep,
} from '@/store/onboarding/onboarding.slice';
import type { KycForm, OnboardingStep } from '../../types/exporter';
import { useGetExporterOnboardingDetails } from '../../hooks/useGetOnboarding';
import { Loading } from '@/components/loading';
import OnboardingStepper from '../components/OnboardingStepper';
import BusinessProfileForm from '../components/BusinessProfileForm';
import KycKybForm from '../components/KycKybForm';
import BusinessSummaryCard from '../components/BusinessSummaryCard';
import VerificationApprovedCard from '../components/VerificationApprovedCard';

function NoticeCard({ children }: { children: React.ReactNode }) {
  return (
    <article className="helix-card p-5 border-[#C9922A]/30 bg-[#C9922A]/5">
      <div className="text-[13px] text-muted leading-relaxed">{children}</div>
    </article>
  );
}

function UnderReviewCard() {
  return (
    <NoticeCard>
      <b>Documents submitted.</b> JompShop and Anchor are reviewing your
      submission. You will be notified once approved. This typically takes 1–2
      business days.
    </NoticeCard>
  );
}

function AwaitingKycCard() {
  return (
    <NoticeCard>
      <b>Kindly complete your KYC/KYB documents.</b> JompShop will then review
      your submission. You will be notified once approved, this typically takes
      1–2 business days.
    </NoticeCard>
  );
}

export default function Onboarding() {
  const dispatch = useAppDispatch();
  const {
    businessProfile,
    kycProfile,
    currentStep: savedStep,
  } = useAppSelector(selectOnboarding);
  const { data, isPending } = useGetExporterOnboardingDetails();

  // One status drives every branch below.
  const status = data?.verification?.overallStatus;
  const isUnderReview = status === 'under_review';
  const isApproved = status === 'approved';
  const hasSubmittedKyc = isUnderReview || isApproved;

  // 1 → no business profile, 2 → awaiting KYC/KYB, 3 → submitted.
  const maxStep = hasSubmittedKyc ? 3 : businessProfile ? 2 : 1;
  // A persisted step can outlive the data it was based on, so clamp it.
  const currentStep = Math.min(savedStep, maxStep);

  const goToStep = (n: number) => dispatch(setOnboardingStep(n));

  const handleStepClick = (n: number) => {
    if (n > maxStep) return;
    goToStep(n);
  };

  const kycInitialValues = useMemo<KycForm>(
    () => ({
      bvn: kycProfile?.bvn ?? '',
      nin: kycProfile?.nin ?? '',
      cac_number: kycProfile?.cac_number ?? '',
      tin: kycProfile?.tin ?? '',
      director_name: kycProfile?.director_name ?? '',
      docs: [],
    }),
    [kycProfile],
  );

  const steps: OnboardingStep[] = [
    {
      n: 1,
      label: 'Business Profile',
      done: Boolean(businessProfile),
    },
    {
      n: 2,
      label:
        data?.businessProfile?.businessType === 'individual'
          ? 'KYC Documents'
          : 'KYB Documents',
      done: hasSubmittedKyc,
    },
    {
      n: 3,
      label: 'Accounts Details',
      done: isApproved,
    },
  ];

  return (
    <div className="max-w-4xl md:flex h-full gap-5">
      <OnboardingStepper
        steps={steps}
        currentStep={currentStep}
        maxStep={maxStep}
        setCurrentStep={handleStepClick}
      />

      <section className="w-full space-y-6">
        {isPending || !data ? (
          <article className="helix-card p-5 min-h-60 flex items-center justify-center">
            <Loading size="md" />
          </article>
        ) : (
          <>
            {currentStep === 1 && (
              <BusinessProfileForm setCurrentStep={goToStep} biz={data} />
            )}

            {currentStep === 2 && (
              <>
                <BusinessSummaryCard biz={data} />
                {/* Approved submissions need no further KYC action here — the
                    summary pills already show the approved status. */}
                {!isApproved &&
                  (isUnderReview ? (
                    <UnderReviewCard />
                  ) : (
                    <KycKybForm
                      biz={data}
                      initialValues={kycInitialValues}
                      onSubmit={() => goToStep(3)}
                    />
                  ))}
              </>
            )}

            {currentStep === 3 &&
              (isApproved ? (
                <VerificationApprovedCard biz={data} />
              ) : isUnderReview ? (
                <UnderReviewCard />
              ) : (
                <AwaitingKycCard />
              ))}
          </>
        )}
      </section>
    </div>
  );
}
