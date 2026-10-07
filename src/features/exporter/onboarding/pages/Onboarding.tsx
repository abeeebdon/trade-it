'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useHeader } from '@/context/HeaderContext';
import { useAppSelector } from '@/hooks/store/store';
import {
  selectOnboarding,
  setOnboardingStep,
} from '@/store/onboarding/onboarding.slice';
import type {
  Business,
  BusinessForm,
  KycForm,
  OnboardingStep,
} from '../../types/exporter';
import OnboardingStepper from '../components/OnboardingStepper';
import BusinessProfileForm from '../components/BusinessProfileForm';
import KycKybForm from '../components/KycKybForm';
import BusinessSummaryCard from '../components/BusinessSummaryCard';
import VerificationApprovedCard from '../components/VerificationApprovedCard';
import { useGetExporterOnboardingDetails } from '../../hooks/useGetOnboarding';
import { OnboardingRespType } from '../types/exporterOnboardingtypes';
import { Loading } from '@/components/loading';

// Onboarding

export default function Onboarding() {
  const { setHeader } = useHeader();
  const {
    businessProfile,
    kycProfile,
    currentStep: savedCurrentStep,
  } = useAppSelector(selectOnboarding);
  const [currentStep, setCurrentStep] = useState(savedCurrentStep || 1);
  console.log(savedCurrentStep);

  // const { data, isPending } = useGetExporterOnboardingDetails();
  const onboardingDetails: OnboardingRespType = useMemo(() => {
    const profile = businessProfile ?? {
      businessName: '',
      businessType: 'business',
      sector: 'fashion',
      country: 'Nigeria',
    };

    const isApproved = Boolean(businessProfile);

    return {
      activeStep: String(currentStep),
      anchorAccounts: {
        isActive: isApproved,
        message: isApproved ? 'Account ready for use' : 'Pending setup',
        ngnVirtualAccount: isApproved ? 'NGN-100000123456' : null,
        usdVirtualAccount: isApproved ? 'USD-100000123456' : null,
      },
      badges: isApproved
        ? ['Business Profile', 'Verified']
        : ['Business Profile'],
      businessProfile: {
        verificationId: null,
        businessName: profile.businessName || 'Business Profile',
        businessType: profile.businessType || 'business',
        sector: profile.sector || 'fashion',
        country: profile.country || 'Nigeria',
        contact_phone: profile.contact_phone ?? '',
        contact_email: profile.contact_email ?? '',
        address: profile.address ?? '',
        cacNumber: profile.cacNumber ?? '',
        tin: profile.tin ?? '',
        director_name: profile.director_name ?? '',
        bvn: profile.bvn ?? '',
        nin: profile.nin ?? '',
        ein: profile.ein ?? '',
      },
      steps: ['Business Profile', 'KYC / KYB', 'Anchor Accounts'],
      subtitle: 'Step by step · KYC & KYB',
      title: 'Business Onboarding',
      verification: {
        kycStatus: isApproved ? 'approved' : 'pending',
        kybStatus: isApproved ? 'approved' : 'pending',
        overallStatus: isApproved ? 'approved' : 'pending',
        message: isApproved ? 'Verification approved' : 'Awaiting review',
        reviewedAt: isApproved ? new Date().toISOString() : null,
      },
    } as OnboardingRespType;
  }, [businessProfile, currentStep]);

  const [kycForm, setKycForm] = useState<KycForm>({
    bvn: kycProfile?.bvn ?? '',
    nin: kycProfile?.nin ?? '',
    cac_number: kycProfile?.cac_number ?? '',
    tin: kycProfile?.tin ?? '',
    director_name: kycProfile?.director_name ?? '',
    docs: [],
  });

  useEffect(() => {
    if (!kycProfile) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setKycForm((prev) => ({
      ...prev,
      bvn: kycProfile.bvn ?? '',
      nin: kycProfile.nin ?? '',
      cac_number: kycProfile.cac_number ?? '',
      tin: kycProfile.tin ?? '',
      director_name: kycProfile.director_name ?? '',
      docs: [],
    }));
  }, [kycProfile]);

  // Set static header
  useEffect(() => {
    setHeader({
      title: 'Business Onboarding',
      kicker: 'Step by step · KYC & KYB',
    });
    return () => {
      setHeader(null);
    };
  }, [setHeader]);

  // Submit KYC / KYB documents

  // Derive stepper state
  const isVerified = useMemo(() => {
    return (
      onboardingDetails?.verification?.kycStatus === 'approved' ||
      onboardingDetails?.verification?.kybStatus === 'approved'
    );
  }, [onboardingDetails]);
  const isUnderReview = useMemo(() => {
    return !isVerified && Boolean(businessProfile) && currentStep >= 2;
  }, [isVerified, businessProfile, currentStep]);

  const steps: OnboardingStep[] = [
    {
      n: 1,
      label: 'Business Profile',
      done: !!onboardingDetails.businessProfile,
    },
    {
      n: 2,
      label:
        onboardingDetails?.businessProfile?.businessType === 'individual'
          ? 'KYC Documents'
          : 'KYB Documents',
      done: currentStep > 2,
    },
    {
      n: 3,
      label: 'Anchor Accounts',
      done: currentStep > 3,
    },
  ];
  // const currentStep: number = useMemo(() => {
  //   return onboardingDetails.activeStep
  //     ? (steps.find((d) => d.label === onboardingDetails.activeStep)?.n ?? 1)
  //     : 1;
  // }, [onboardingDetails.activeStep]);

  const submitKyc = () => {
    setCurrentStep(3);
    setOnboardingStep(3);
  };
  // if (isPending) {
  //   return (
  //     <div className="flex justify-center items-center h-[60vh]">
  //       <Loading />
  //     </div>
  //   );
  // }
  //Loading skeleton
  return (
    <div className="max-w-4xl md:flex h-full gap-5">
      {/* Stepper */}
      <OnboardingStepper
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {/* Step 1: Create business profile  */}
      <section className="w-full">
        {currentStep === 1 && (
          <BusinessProfileForm
            setCurrentStep={setCurrentStep}
            biz={onboardingDetails}
          />
        )}

        {/*Step 2+: Business exists */}
        {currentStep === 2 && onboardingDetails && (
          <div className="space-y-6">
            <BusinessSummaryCard biz={onboardingDetails} />

            {isUnderReview ? (
              <div className="helix-card p-5 border-[#C9922A]/30 bg-[#C9922A]/5">
                <div className="text-[13px] text-[#F5F5F5] leading-relaxed">
                  <b>Documents submitted.</b> JompShop and Anchor are reviewing
                  your submission. You will be notified once approved — this
                  typically takes 1–2 business days.
                </div>
              </div>
            ) : (
              <KycKybForm
                biz={onboardingDetails}
                kycForm={kycForm}
                onChange={setKycForm}
                onSubmit={submitKyc}
              />
            )}

            {/* Verification approved */}
          </div>
        )}
        {currentStep === 3 && (
          <VerificationApprovedCard biz={onboardingDetails} />
        )}
      </section>
    </div>
  );
}
