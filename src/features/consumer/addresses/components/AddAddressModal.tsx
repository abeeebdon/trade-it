'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addAddressSchema } from './validation';
import type { AddAddressFormValues } from './validation';
import { useAddAddress } from '../hooks/useAddresses';

interface AddAddressModalProps {
  onClose: () => void;
}

export default function AddAddressModal({ onClose }: AddAddressModalProps) {
  const { mutate: submit, isPending: busy } = useAddAddress(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddAddressFormValues>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: { isDefault: false },
  });

  const onSubmit = (values: AddAddressFormValues) => {
    submit({
      label: values.label,
      recipientName: values.recipientName,
      phoneNumber: values.phoneNumber ?? '',
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2 ?? '',
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      isDefault: values.isDefault ?? false,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-testid="add-addr-modal"
    >
      <div
        className="absolute inset-0 bg-[#0A1628]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative helix-card p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
      >
        <h3 className="helix-h3 mb-4">Add delivery address</h3>
        <div className="space-y-3">
          <div>
            <label className="helix-label">Label</label>
            <input
              className="helix-input"
              placeholder="Home, Office…"
              {...register('label')}
              data-testid="addr-label"
            />
            {errors.label && (
              <p className="text-[#E74C3C] text-[11px] mt-1">
                {errors.label.message}
              </p>
            )}
          </div>
          <div>
            <label className="helix-label">Recipient name</label>
            <input
              className="helix-input"
              placeholder="Full name"
              {...register('recipientName')}
              data-testid="addr-recipient"
            />
            {errors.recipientName && (
              <p className="text-[#E74C3C] text-[11px] mt-1">
                {errors.recipientName.message}
              </p>
            )}
          </div>
          <div>
            <label className="helix-label">Address line 1</label>
            <input
              className="helix-input"
              placeholder="123 Main St"
              {...register('addressLine1')}
              data-testid="addr-line1"
            />
            {errors.addressLine1 && (
              <p className="text-[#E74C3C] text-[11px] mt-1">
                {errors.addressLine1.message}
              </p>
            )}
          </div>
          <div>
            <label className="helix-label">Address line 2 (optional)</label>
            <input
              className="helix-input"
              placeholder="Apt / Suite"
              {...register('addressLine2')}
              data-testid="addr-line2"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="helix-label">City</label>
              <input
                className="helix-input"
                {...register('city')}
                data-testid="addr-city"
              />
              {errors.city && (
                <p className="text-[#E74C3C] text-[11px] mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <label className="helix-label">State</label>
              <input
                className="helix-input"
                placeholder="NY"
                {...register('state')}
                data-testid="addr-state"
              />
              {errors.state && (
                <p className="text-[#E74C3C] text-[11px] mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="helix-label">Postal code</label>
              <input
                className="helix-input"
                {...register('postalCode')}
                data-testid="addr-postal"
              />
              {errors.postalCode && (
                <p className="text-[#E74C3C] text-[11px] mt-1">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
            <div>
              <label className="helix-label">Phone (optional)</label>
              <input
                className="helix-input"
                {...register('phoneNumber')}
                data-testid="addr-phone"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-[12px] text-[#9CA3AF]">
            <input
              type="checkbox"
              {...register('isDefault')}
              data-testid="addr-default"
            />{' '}
            Set as default
          </label>
        </div>
        <div className="flex gap-2 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="helix-btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="helix-btn-primary flex-1"
            data-testid="addr-save"
          >
            {busy ? 'Saving…' : 'Save address'}
          </button>
        </div>
      </form>
    </div>
  );
}
