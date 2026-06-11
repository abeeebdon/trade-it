'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useHeader } from '@/context/HeaderContext';
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
import {
  BusinessProfile,
  OnboardingRespType,
} from '../types/exporterOnboardingtypes';
import Image from 'next/image';
import { Loading } from '@/components/loading';

// Onboarding

export default function Onboarding() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { setHeader } = useHeader();

  const { data, isPending } = useGetExporterOnboardingDetails();
  const onboardingDetails: OnboardingRespType = useMemo(() => {
    return data ? data : ({} as OnboardingRespType);
  }, [data]);

  const [form, setForm] = useState<BusinessForm>({
    business_name: '',
    registration_type: 'business',
    country: 'Nigeria',
    sector: 'fashion',
    role: user?.role ?? 'exporter',
    cac_number: '',
    tin: '',
    bvn: '',
    nin: '',
    ein: '',
    director_name: '',
    contact_phone: '',
    contact_email: user?.email ?? '',
    address: '',
  });

  const [kycForm, setKycForm] = useState<KycForm>({
    bvn: '',
    nin: '',
    cac_number: '',
    tin: '',
    director_name: '',
    docs: [],
  });

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
      onboardingDetails?.verification?.kybStatus === 'approved' ||
      onboardingDetails?.verification?.kycStatus === 'approved'
    );
  }, [onboardingDetails]);
  const isUnderReview = useMemo(() => {
    return (
      onboardingDetails?.verification?.kyc_status === 'under_review' ||
      onboardingDetails?.verification?.kyb_status === 'under_review'
    );
  }, [onboardingDetails]);

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
      done: isUnderReview || isVerified,
    },
    {
      n: 3,
      label: 'Anchor Accounts',
      done: !!onboardingDetails?.anchorAccounts?.ngnVirtualAccount,
    },
  ];
  const currentStep: number = useMemo(() => {
    return onboardingDetails.activeStep
      ? (steps.find((d) => d.label === onboardingDetails.activeStep)?.n ?? 1)
      : 1;
  }, [onboardingDetails.activeStep]);

  const submitKyc = () => {};
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }
  //Loading skeleton
  return (
    <div className="max-w-4xl">
      {/* Stepper */}
      <OnboardingStepper steps={steps} currentStep={currentStep} />

      {/* Step 1: Create business profile  */}
      {currentStep === 1 && <BusinessProfileForm />}

      {/*Step 2+: Business exists */}
      {currentStep >= 2 && onboardingDetails && (
        <div className="space-y-6">
          <BusinessSummaryCard biz={onboardingDetails} />

          {/* KYC / KYB form — only if not yet approved */}
          {!isVerified && (
            <KycKybForm
              biz={onboardingDetails}
              kycForm={kycForm}
              onChange={setKycForm}
              onSubmit={submitKyc}
            />
          )}

          {/* Under review notice */}
          {isUnderReview && !isVerified && (
            <div className="helix-card p-5 border-[#C9922A]/30 bg-[#C9922A]/5">
              <div className="text-[13px] text-[#F5F5F5] leading-relaxed">
                <b>Documents submitted.</b> JompStart and Anchor are reviewing
                your submission. You will be notified once approved — this
                typically takes 1–2 business days.
              </div>
            </div>
          )}

          {/* Verification approved */}
          {isVerified && <VerificationApprovedCard biz={onboardingDetails} />}
        </div>
      )}
    </div>
  );
}
