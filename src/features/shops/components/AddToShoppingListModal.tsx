'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '@/components/ui/Modal';
import {
  useGetShoppingLists,
  useAddItemToList,
} from '@/features/consumer/lists/hooks/useShoppingLists';
import { AddToShoppingListForm, addToShoppingListSchema } from './validation';
import Loader from '@/components/buttons/Loader';

interface Props {
  open: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  defaultQty: number;
}

export default function AddToShoppingListModal({
  open,
  onClose,
  productId,
  productName,
  defaultQty,
}: Props) {
  const { data, isLoading } = useGetShoppingLists(1, 50);
  const { mutate: addItem, isPending } = useAddItemToList();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddToShoppingListForm>({
    resolver: zodResolver(addToShoppingListSchema),
    defaultValues: {
      shoppingListId: '',
      qty: defaultQty,
    },
  });

  // Reset form when modal opens with fresh defaults
  useEffect(() => {
    if (open) {
      reset({ shoppingListId: '', qty: defaultQty });
    }
  }, [open, defaultQty, reset]);

  const lists = data?.data?.data ?? [];

  const onSubmit = (formData: AddToShoppingListForm) => {
    const postData = {
      shoppingListId: formData.shoppingListId,
      payload: {
        productId: String(productId),
        quantity: formData.qty,
      },
    };
    addItem(postData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal title="Add to Shopping List" onClose={onClose} maxWidth="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-[13px] text-muted">
          Add <span className="text-text font-medium">{productName}</span> to
          one of your shopping lists.
        </p>

        {/* Shopping list select */}
        <div className="space-y-1.5">
          <label className="helix-label block">Shopping List</label>
          {isLoading ? (
            <div className="h-10 w-full rounded-md bg-white/10 animate-pulse" />
          ) : lists.length === 0 ? (
            <p className="text-[12px] text-muted">
              No shopping lists found.{' '}
              <a href="/consumer/lists" className="text-primary underline">
                Create one
              </a>
            </p>
          ) : (
            <>
              <select
                {...register('shoppingListId')}
                className="helix-input w-full"
              >
                <option value="" disabled>
                  Select a list…
                </option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name} ({list.itemCount} items)
                  </option>
                ))}
              </select>
              {errors.shoppingListId && (
                <p className="text-red-500 text-[11px]">
                  {errors.shoppingListId.message}
                </p>
              )}
            </>
          )}
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <label className="helix-label block">Quantity</label>
          <input
            type="number"
            {...register('qty', { valueAsNumber: true })}
            min={1}
            className="helix-input w-24"
          />
          {errors.qty && (
            <p className="text-red-500 text-[11px]">{errors.qty.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending || isLoading || lists.length === 0}
          className="helix-btn-primary w-full"
        >
          {isPending ? <Loader /> : 'Add to List'}
        </button>
      </form>
    </Modal>
  );
}
