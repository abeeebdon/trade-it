'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useHeader } from '@/context/HeaderContext';
import type {
  Business,
  BusinessForm,
  KycForm,
  OnboardingStep,
} from '../types/exporter';
import { mockBusiness } from '../components/data';
import OnboardingStepper from '../components/onboarding/OnboardingStepper';
import BusinessProfileForm from '../components/onboarding/BusinessProfileForm';
import KycKybForm from '../components/onboarding/KycKybForm';
import BusinessSummaryCard from '../components/onboarding/BusinessSummaryCard';
import VerificationApprovedCard from '../components/onboarding/VerificationApprovedCard';

// Onboarding

export default function Onboarding() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { setHeader } = useHeader();

  const [biz, setBiz] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

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

  //  Load existing business
  useEffect(() => {
    setTimeout(() => {
      if (mockBusiness) {
        setBiz(mockBusiness);
        setStep(2);
        setKycForm({
          bvn: mockBusiness.bvn ?? '',
          nin: mockBusiness.nin ?? '',
          cac_number: mockBusiness.cac_number ?? '',
          tin: mockBusiness.tin ?? '',
          director_name: mockBusiness.director_name ?? '',
          docs: [],
        });
      }
      setLoading(false);
    }, 800);
  }, []);

  //  Create business profile
  const createBiz = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await new Promise((res) => setTimeout(res, 600));
      // Mock: create business object from form
      const created: Business = {
        id: `biz-${Date.now()}`,
        business_name: form.business_name,
        registration_type: form.registration_type,
        country: form.country,
        sector: form.sector,
        contact_phone: form.contact_phone,
        contact_email: form.contact_email,
        address: form.address,
        anchor_customer_id: `ANC-BIZ-${Math.floor(Math.random() * 90000 + 10000)}`,
        kyc_status: 'pending',
        kyb_status: 'pending',
        cac_number: form.cac_number,
        tin: form.tin,
        bvn: form.bvn,
        nin: form.nin,
        director_name: form.director_name,
      };
      setBiz(created);
      setStep(2);
      toast.success('Business profile created. Anchor customer provisioned.');
    } catch {
      toast.error('Failed to create business');
    }
  };

  // Submit KYC / KYB documents
  const submitKyc = async () => {
    if (!biz) return;
    try {
      await new Promise((res) => setTimeout(res, 600));
      // Mock: update verification status to under_review
      setBiz((prev) =>
        prev
          ? {
              ...prev,
              kyc_status:
                prev.registration_type === 'individual'
                  ? 'under_review'
                  : prev.kyc_status,
              kyb_status:
                prev.registration_type === 'business'
                  ? 'under_review'
                  : prev.kyb_status,
            }
          : prev,
      );
      toast.success('Documents submitted — under review');
    } catch {
      toast.error('Submission failed');
    }
  };

  // Derive stepper state
  const isVerified =
    biz?.kyc_status === 'approved' || biz?.kyb_status === 'approved';
  const isUnderReview =
    biz?.kyc_status === 'under_review' || biz?.kyb_status === 'under_review';

  const steps: OnboardingStep[] = [
    { n: 1, label: 'Business Profile', done: !!biz },
    {
      n: 2,
      label:
        biz?.registration_type === 'individual'
          ? 'KYC Documents'
          : 'KYB Documents',
      done: isUnderReview || isVerified,
    },
    {
      n: 3,
      label: 'Anchor Accounts',
      done: !!biz?.anchor_ngn_virtual_account,
    },
  ];

  //Loading skeleton
  if (loading) {
    return (
      <div className="max-w-4xl space-y-4">
        <div className="flex gap-4 mb-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-8 w-36 rounded-full bg-[#1A7A6E]/10 animate-pulse opacity-40"
            />
          ))}
        </div>
        <div className="helix-card p-6 h-64 animate-pulse opacity-40" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Stepper */}
      <OnboardingStepper steps={steps} currentStep={step} />

      {/* Step 1: Create business profile  */}
      {step === 1 && !biz && (
        <BusinessProfileForm
          form={form}
          onChange={(key, value) => setForm({ ...form, [key]: value })}
          onSubmit={createBiz}
        />
      )}

      {/*Step 2+: Business exists */}
      {step >= 2 && biz && (
        <div className="space-y-6">
          {/* Business summary */}
          <BusinessSummaryCard biz={biz} />

          {/* KYC / KYB form — only if not yet approved */}
          {!isVerified && (
            <KycKybForm
              biz={biz}
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
          {isVerified && <VerificationApprovedCard biz={biz} />}
        </div>
      )}
    </div>
  );
}
