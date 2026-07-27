'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, X } from 'lucide-react';
import { addAddressSchema } from './validation';
import type { AddAddressFormValues } from './validation';
import { useUpdateAddress } from '../hooks/useAddresses';
import type { Address } from '../types';

interface ViewAddressModalProps {
  address: Address;
  onClose: () => void;
}

export default function ViewAddressModal({
  address: a,
  onClose,
}: ViewAddressModalProps) {
  const [editing, setEditing] = useState(false);
  const { mutate: update, isPending: busy } = useUpdateAddress();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddAddressFormValues>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
      label: a.label,
      recipientName: a.recipientName,
      addressLine1: a.addressLine1,
      addressLine2: a.addressLine2 ?? '',
      city: a.city,
      state: a.state,
      postalCode: a.postalCode,
      phoneNumber: a.phoneNumber ?? '',
      isDefault: a.isDefault,
    },
  });

  const onSubmit = (values: AddAddressFormValues) => {
    update(
      {
        id: a.id,
        payload: {
          label: values.label,
          recipientName: values.recipientName,
          phoneNumber: values.phoneNumber ?? '',
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2 ?? '',
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          isDefault: values.isDefault ?? false,
        },
      },
      {
        onSuccess: () => {
          setEditing(false);
          onClose();
        },
      },
    );
  };

  const handleCancelEdit = () => {
    reset();
    setEditing(false);
  };

  const renderField = (
    label: string,
    value: string | undefined,
    editField?: React.ReactNode,
  ) => (
    <div>
      <label className="helix-label">{label}</label>
      {editing && editField ? (
        editField
      ) : (
        <p className="helix-input bg-transparent border-[#1A7A6E]/20 text-[#F5F5F5] cursor-default select-none">
          {value || '—'}
        </p>
      )}
    </div>
  );

  const renderEditField = (
    fieldName: keyof AddAddressFormValues,
    placeholder?: string,
    testId?: string,
  ) => (
    <>
      <input
        className="helix-input"
        placeholder={placeholder}
        {...register(fieldName)}
        data-testid={testId}
      />
      {errors[fieldName] && (
        <p className="text-[#E74C3C] text-[11px] mt-1">
          {errors[fieldName]?.message}
        </p>
      )}
    </>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-testid="view-addr-modal"
    >
      <div
        className="absolute inset-0 bg-[#0A1628]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={editing ? handleSubmit(onSubmit) : undefined}
        className="relative helix-card p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="helix-h3">
            {editing ? 'Edit address' : 'Address details'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors"
            aria-label="Close modal"
            data-testid="view-addr-close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {renderField(
            'Label',
            a.label,
            renderEditField('label', 'Home, Office…', 'view-addr-label'),
          )}

          {renderField(
            'Recipient name',
            a.recipientName,
            renderEditField(
              'recipientName',
              'Full name',
              'view-addr-recipient',
            ),
          )}

          {renderField(
            'Address line 1',
            a.addressLine1,
            renderEditField('addressLine1', '123 Main St', 'view-addr-line1'),
          )}

          {renderField(
            'Address line 2',
            a.addressLine2 || '—',
            renderEditField('addressLine2', 'Apt / Suite', 'view-addr-line2'),
          )}

          <div className="grid grid-cols-2 gap-3">
            {renderField(
              'City',
              a.city,
              renderEditField('city', undefined, 'view-addr-city'),
            )}
            {renderField(
              'State',
              a.state,
              renderEditField('state', 'NY', 'view-addr-state'),
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {renderField(
              'Postal code',
              a.postalCode,
              renderEditField('postalCode', undefined, 'view-addr-postal'),
            )}
            {renderField(
              'Phone',
              a.phoneNumber || '—',
              renderEditField('phoneNumber', undefined, 'view-addr-phone'),
            )}
          </div>

          {editing && (
            <label className="flex items-center gap-2 text-[12px] text-[#9CA3AF]">
              <input
                type="checkbox"
                {...register('isDefault')}
                data-testid="view-addr-default"
              />{' '}
              Set as default
            </label>
          )}

          {!editing && a.isDefault && (
            <p className="text-[11px] text-[#C9922A]">✓ Default address</p>
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex gap-2 mt-5">
          {editing ? (
            <>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="helix-btn-secondary flex-1"
                data-testid="view-addr-cancel-edit"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="helix-btn-primary flex-1"
                data-testid="view-addr-save"
              >
                {busy ? 'Saving…' : 'Save changes'}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                className="helix-btn-secondary flex-1"
                data-testid="view-addr-cancel"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="helix-btn-primary flex-1 inline-flex items-center justify-center gap-1.5"
                data-testid="view-addr-edit"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
