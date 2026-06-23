'use client';

import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/form/InputFIeld';
import { useGetProductCategories } from '../../hooks/useProducts';
import { useMemo } from 'react';
import { useSubmitOnboardingDetails } from '../../hooks/useGetOnboarding';
import { BusinessFormValues, businessSchema } from '../types/validation';

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="helix-label">{label}</label>
      {children}
    </div>
  );
}

export default function BusinessProfileForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BusinessFormValues>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessType: 'business',
      country: 'Nigeria',
      sector: 'fashion',
    },
  });
  const { data, isPending } = useGetProductCategories({
    pageNumber: 1,
    pageSize: 10,
  });
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
    console.log(data);
    const postData = {};
    mutate({
      data: data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="helix-card p-6 space-y-5 fade-up"
      data-testid="biz-create-form"
    >
      <h2 className="helix-h3">Create your business profile</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          label="Business name"
          {...register('businessName')}
          error={errors.businessName?.message}
        />

        <Field label="Registration type">
          <select className="helix-input" {...register('businessType')}>
            <option value="business">Business Entity</option>
            <option value="individual">Individual</option>
          </select>
        </Field>

        <Field label="Country">
          <select className="helix-input" {...register('country')}>
            <option>Nigeria</option>
            <option>United States</option>
            <option>Ghana</option>
            <option>Kenya</option>
            <option>South Africa</option>
          </select>
        </Field>

        <Field label="Sector">
          <select className="helix-input" {...register('sector')}>
            {SECTORS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>

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
        data-testid="biz-submit"
        type="submit"
        className="helix-btn-primary inline-flex items-center gap-2"
      >
        Continue <ArrowRight size={14} />
      </button>
    </form>
  );
}
