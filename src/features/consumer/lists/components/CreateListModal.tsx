'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createListSchema } from './validation';

interface CreateListModalProps {
  onSuccess: (name: string) => void;
  onClose: () => void;
}

export default function CreateListModal({
  onSuccess,
  onClose,
}: CreateListModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createListSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = (data: { name: string }) => {
    onSuccess(data.name.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-testid="new-list-modal"
    >
      <div
        className="absolute inset-0 bg-[#0A1628]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative helix-card p-6 w-full max-w-md mx-4"
      >
        <h3 className="helix-h3 mb-4">Create shopping list</h3>
        <label className="helix-label">List name</label>
        <input
          className="helix-input"
          placeholder="Monthly Groceries"
          {...register('name')}
          data-testid="list-name-input"
        />
        {errors.name && (
          <p className="text-[#E74C3C] text-[11px] mt-1">
            {errors.name.message}
          </p>
        )}
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="helix-btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="helix-btn-primary flex-1"
            data-testid="list-create-btn"
          >
            {isSubmitting ? 'Creating…' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
