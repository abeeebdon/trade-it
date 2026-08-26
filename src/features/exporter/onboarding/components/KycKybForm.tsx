'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import InputField from '@/components/form/InputFIeld';
import { setKycDetails } from '@/store/onboarding/onboarding.slice';
import type { KycForm } from '../../types/exporter';
import { OnboardingRespType } from '../types/exporterOnboardingtypes';

interface KycKybFormProps {
  biz: OnboardingRespType;
  kycForm: KycForm;
  onChange: (form: KycForm) => void;
  onSubmit: () => void;
}

export default function KycKybForm({
  biz,
  kycForm,
  onChange,
  onSubmit,
}: KycKybFormProps) {
  const dispatch = useDispatch();
  const isBusiness = biz.businessProfile.businessType === 'business';

  const schema = z.object({
    bvn: z.string(),
    nin: z.string(),
    cac_number: z.string(),
    tin: z.string(),
    director_name: z.string(),
    docs: z.array(z.string()),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<KycForm>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: kycForm,
  });

  useEffect(() => {
    reset(kycForm);
  }, [kycForm, reset]);

  const uploadDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const nextDocs = [
      ...(watch('docs') ?? []),
      ...files.map((f) => `uploads/kyc/${Date.now()}-${f.name}`),
    ];
    setValue('docs', nextDocs, { shouldValidate: true, shouldDirty: true });
    onChange({ ...watch(), docs: nextDocs });

    files.forEach((f) => {
      toast.success(`Uploaded ${f.name}`);
    });
  };

  const onFormSubmit = (values: KycForm) => {
    const { docs: _docs, ...savedValues } = values;
    dispatch(setKycDetails(savedValues));
    onChange(values);
    onSubmit();
  };

  return (
    <form
      className="helix-card p-6 space-y-5"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <h2 className="helix-h3">
        {isBusiness ? 'KYB Documents' : 'KYC Documents'}
      </h2>
      <p className="text-[#9CA3AF] text-sm leading-relaxed">
        Upload scans of{' '}
        {isBusiness
          ? 'CAC certificate, TIN, director ID and proof of address'
          : 'government ID, BVN slip, proof of address'}
        . Jompshop will forward to Anchor for verification.
      </p>

      {/* Form fields */}
      <div className="grid md:grid-cols-2 gap-4">
        {isBusiness ? (
          <>
            <InputField
              label="CAC Number"
              {...register('cac_number')}
              error={errors.cac_number?.message}
            />
            <InputField
              label="TIN"
              {...register('tin')}
              error={errors.tin?.message}
            />
            <InputField
              label="Director Name"
              {...register('director_name')}
              error={errors.director_name?.message}
            />
          </>
        ) : (
          <>
            <InputField
              label="BVN (11 digits)"
              maxLength={11}
              {...register('bvn')}
              error={errors.bvn?.message}
            />
            <InputField
              label="NIN"
              {...register('nin')}
              error={errors.nin?.message}
            />
          </>
        )}
      </div>

      {/* File upload */}
      <div>
        <label className="helix-label">Upload documents (PDF, image)</label>
        <input
          type="file"
          multiple
          accept=".pdf,image/*"
          onChange={uploadDoc}
          className="helix-input file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[#C9922A]/20 file:text-[#C9922A] file:font-medium"
        />
        <div className="mt-2 text-[12px] text-[#9CA3AF]">
          {(watch('docs') ?? []).length} file(s) staged.
        </div>
        {errors.docs && (
          <p className="text-red-500 text-xs mt-1">{errors.docs.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={(watch('docs') ?? []).length === 0}
        className="helix-btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit for review <ArrowRight size={14} />
      </button>
    </form>
  );
}
