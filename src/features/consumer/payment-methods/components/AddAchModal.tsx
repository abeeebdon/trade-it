'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddAchPaymentMethod } from '../hooks/usePaymentMethods';
import { AchFormValues, achSchema } from './validation';
import InputField from '@/components/form/InputFIeld';

interface AddAchModalProps {
  onClose: () => void;
}

export default function AddAchModal({ onClose }: AddAchModalProps) {
  const { mutate: submit, isPending: busy } = useAddAchPaymentMethod(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AchFormValues>({
    resolver: zodResolver(achSchema),
    defaultValues: { isDefault: false },
  });

  const onSubmit = (values: AchFormValues) => {
    submit({
      isDefault: values.isDefault,
      bankName: values.bankName,
      routingNumber: values.routingNumber,
      accountNumber: values.accountNumber,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="helix-h3 mb-4">Add ACH Bank Transfer</h3>

      <div className="space-y-3">
        <InputField
          label="Bank Name"
          placeholder="Chase"
          {...register('bankName')}
          error={errors.bankName?.message}
        />

        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Routing number"
            placeholder="9 digits"
            error={errors.routingNumber?.message}
            {...register('routingNumber')}
          />
          <InputField
            label="Account number"
            placeholder="9 digits"
            error={errors.accountNumber?.message}
            {...register('accountNumber')}
          />
        </div>
      </div>

      {/* Default checkbox */}
      <label className="flex items-center gap-2 mt-4 text-[12px] text-muted">
        <input type="checkbox" {...register('isDefault')} /> Set as default
      </label>

      {/* Actions */}
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
        >
          {busy ? 'Saving…' : 'Save Bank'}
        </button>
      </div>
    </form>
  );
}
