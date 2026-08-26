'use client';

import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/form/InputFIeld';
import CustomSelectField from '@/components/form/CustomSelectField';
import { useGetProductCategories } from '../../hooks/useProducts';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  setOnboardingDetails,
  setOnboardingStep,
} from '@/store/onboarding/onboarding.slice';
import { useSubmitOnboardingDetails } from '../../hooks/useGetOnboarding';
import { BusinessFormValues, businessSchema } from '../types/validation';
import { countries } from './constants';
import { OnboardingRespType } from '../types/exporterOnboardingtypes';
interface BusinessProfileFormProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  biz: OnboardingRespType;
}

export default function BusinessProfileForm({
  setCurrentStep,
  biz,
}: BusinessProfileFormProps) {
  const defaultValues: BusinessFormValues = {
    businessName: biz?.businessProfile?.businessName ?? '',
    businessType: (biz?.businessProfile?.businessType === 'individual'
      ? 'individual'
      : 'business') as 'business' | 'individual',
    country: biz?.businessProfile?.country ?? 'Nigeria',
    sector: biz?.businessProfile?.sector ?? 'fashion',
    contact_phone: biz?.businessProfile?.contact_phone ?? '',
    contact_email: biz?.businessProfile?.contact_email ?? '',
    address: biz?.businessProfile?.address ?? '',
    cacNumber: biz?.businessProfile?.cacNumber ?? '',
    tin: biz?.businessProfile?.tin ?? '',
    director_name: biz?.businessProfile?.director_name ?? '',
    bvn: biz?.businessProfile?.bvn ?? '',
    nin: biz?.businessProfile?.nin ?? '',
    ein: biz?.businessProfile?.ein ?? '',
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<BusinessFormValues>({
    resolver: zodResolver(businessSchema),
    defaultValues,
  });
  const dispatch = useDispatch();
  const { data } = useGetProductCategories();
  const SECTORS = useMemo(() => {
    return data
      ? data.data.map((d) => ({
          label: d.name,
          value: d.name,
        }))
      : [];
  }, [data]);
  const country = watch('country');
  const businessType = watch('businessType');

  const isNigeriaBusiness =
    country === 'Nigeria' && businessType === 'business';

  const isNigeriaIndividual =
    country === 'Nigeria' && businessType === 'individual';

  const isUS = country === 'United States';
  const { mutate } = useSubmitOnboardingDetails();
  const onSubmit = (data: BusinessFormValues) => {
    dispatch(setOnboardingDetails(data));
    dispatch(setOnboardingStep(2));
    setCurrentStep(2);
    // mutate({
    //   data: data,
    // });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="helix-card p-6 space-y-5 fade-up"
    >
      <h2 className="helix-h3">Create your business profile</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          label="Business name"
          {...register('businessName')}
          error={errors.businessName?.message}
        />

        <CustomSelectField
          label="Registration type"
          name="businessType"
          control={control}
          error={errors.businessType?.message}
          options={[
            { label: 'Business Entity', value: 'business' },
            { label: 'Individual', value: 'individual' },
          ]}
        />

        <CustomSelectField
          label="Country"
          name="country"
          control={control}
          error={errors.country?.message}
          options={countries}
        />

        <CustomSelectField
          label="Sector"
          name="sector"
          control={control}
          error={errors.sector?.message}
          options={SECTORS}
        />

        <InputField
          label="Contact phone"
          placeholder="+234 801 234 5678"
          {...register('contact_phone')}
          error={errors.contact_phone?.message}
        />

        <InputField
          label="Contact email"
          type="email"
          {...register('contact_email')}
          error={errors.contact_email?.message}
        />

        <div className="md:col-span-2">
          <InputField
            label="Address"
            placeholder="Street, City, State"
            {...register('address')}
            error={errors.address?.message}
          />
        </div>

        {isNigeriaBusiness && (
          <>
            <InputField
              label="CAC Number"
              placeholder="RC-XXXXXXX"
              {...register('cacNumber')}
              error={errors.cacNumber?.message}
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
        )}

        {isNigeriaIndividual && (
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

        {isUS && (
          <InputField
            label="EIN (9 digits)"
            placeholder="XX-XXXXXXX"
            {...register('ein')}
            error={errors.ein?.message}
          />
        )}
      </div>

      <button
        type="submit"
        className="helix-btn-primary inline-flex items-center gap-2"
      >
        Continue <ArrowRight size={14} />
      </button>
    </form>
  );
}
