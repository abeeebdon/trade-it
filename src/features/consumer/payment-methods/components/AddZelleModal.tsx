'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddZellePaymentMethod } from '../hooks/usePaymentMethods';
import InputField from '@/components/form/InputFIeld';
import { ZelleFormValues, zelleSchema } from './validation';
interface AddZelleModalProps {
  onClose: () => void;
}

export default function AddZelleModal({ onClose }: AddZelleModalProps) {
  const { mutateAsync: submit, isPending: busy } =
    useAddZellePaymentMethod(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ZelleFormValues>({
    resolver: zodResolver(zelleSchema),
    defaultValues: { is_default: false },
  });

  const onSubmit = (values: ZelleFormValues) => {
    submit({
      is_default: values.is_default,
      zelleEmail: values.zelleEmail,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="helix-h3 mb-4">Add Zelle Account</h3>
      <InputField
        label="Zelle Email"
        placeholder="you@example.com"
        {...register('zelleEmail')}
        error={errors.zelleEmail?.message}
      />

      {/* Default checkbox */}
      <label className="flex items-center gap-2 mt-4 text-[12px] text-muted">
        <input type="checkbox" {...register('is_default')} /> Set as default
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
          {busy ? 'Saving…' : 'Save Zelle'}
        </button>
      </div>
    </form>
  );
}
