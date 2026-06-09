import { ArrowRight } from 'lucide-react';
import { SECTORS } from './data';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileFormData, profileSchema } from './validation';
import InputField from '@/components/form/InputFIeld';
import PressableBtn from '@/components/buttons/PressableBtn';
import { Business, ProfileStep1Props } from '../types/buyers';

const ProfileStep1 = ({ setStep, createBiz }: ProfileStep1Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      business_name: '',
      registration_type: 'business',
      country: 'Nigeria',
      sector: 'agriculture',
      contact_phone: '',
      contact_email: '',
      address: '',
      cac_number: '',
      tin: '',
      director_name: '',
      bvn: '',
      nin: '',
      ein: '',
    },
  });

  const registrationType = watch('registration_type');
  const country = watch('country');
  const onsubmit = (data: ProfileFormData) => {
    setStep(2);
    const postData: Business = {
      ...data,
      id: new Date().toDateString(),

      anchor_customer_id: new Date().toISOString(),
      kyc_status: 'pending',
      kyb_status: 'pending',
      anchor_account_ngn: '',
    };
    createBiz(postData);
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="helix-card p-6 space-y-5 fade-up"
      data-testid="biz-create-form"
    >
      <h2 className="helix-h3">Create your business profile</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          label="Business name"
          placeholder="Enter business name"
          error={errors.business_name?.message}
          {...register('business_name')}
        />

        <div>
          <label className="helix-label">Registration type</label>

          <select className="helix-input" {...register('registration_type')}>
            <option value="business">Business Entity</option>
            <option value="individual">Individual</option>
          </select>
        </div>

        <div>
          <label className="helix-label">Country</label>

          <select className="helix-input" {...register('country')}>
            <option>Nigeria</option>
            <option>United States</option>
            <option>Ghana</option>
            <option>Kenya</option>
            <option>South Africa</option>
          </select>
        </div>

        <div>
          <label className="helix-label">Sector</label>

          <select className="helix-input" {...register('sector')}>
            {SECTORS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <InputField
          label="Contact phone"
          placeholder="08012345678"
          error={errors.contact_phone?.message}
          {...register('contact_phone')}
        />

        <InputField
          label="Contact email"
          type="email"
          placeholder="hello@example.com"
          error={errors.contact_email?.message}
          {...register('contact_email')}
        />

        <div className="md:col-span-2">
          <InputField
            label="Address"
            placeholder="Business address"
            error={errors.address?.message}
            {...register('address')}
          />
        </div>

        {country === 'Nigeria' && registrationType === 'business' && (
          <>
            <InputField
              label="CAC Number"
              placeholder="RC-XXXXXXX"
              error={errors.cac_number?.message}
              {...register('cac_number')}
            />

            <InputField
              label="TIN"
              placeholder="Enter TIN"
              error={errors.tin?.message}
              {...register('tin')}
            />

            <InputField
              label="Director Name"
              placeholder="Director full name"
              error={errors.director_name?.message}
              {...register('director_name')}
            />
          </>
        )}

        {country === 'Nigeria' && registrationType === 'individual' && (
          <>
            <InputField
              label="BVN (11 digits)"
              placeholder="22123456789"
              error={errors.bvn?.message}
              {...register('bvn')}
            />

            <InputField
              label="NIN"
              placeholder="Enter NIN"
              error={errors.nin?.message}
              {...register('nin')}
            />
          </>
        )}

        {country === 'United States' && (
          <InputField
            label="EIN (9 digits)"
            placeholder="XX-XXXXXXX"
            error={errors.ein?.message}
            {...register('ein')}
          />
        )}
      </div>
      <PressableBtn
        title="Continue"
        handleClick={handleSubmit(onsubmit)}
        rightComponent={<ArrowRight size={14} />}
        className="helix-btn-primary inline-flex items-center gap-2"
      />
    </form>
  );
};

export default ProfileStep1;
