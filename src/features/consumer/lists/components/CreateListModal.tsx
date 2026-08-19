'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createListSchema } from './validation';
import type { CreateListFormValues } from './validation';
import { useCreateShoppingList } from '../hooks/useShoppingLists';
import Loader from '@/components/buttons/Loader';

interface CreateListModalProps {
  onClose: () => void;
}

export default function CreateListModal({ onClose }: CreateListModalProps) {
  const { mutate: submit, isPending } = useCreateShoppingList(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateListFormValues>({
    resolver: zodResolver(createListSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = (data: CreateListFormValues) => {
    submit({ name: data.name.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
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
            disabled={isPending}
            className="helix-btn-primary flex-1"
          >
            {isPending ? <Loader /> : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
