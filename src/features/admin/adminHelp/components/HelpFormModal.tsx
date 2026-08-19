'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  HelpItem,
  CreateHelpPayload,
} from '@/features/admin/adminHelp/types/help';
import Modal from '@/components/ui/Modal';
import InputField from '@/components/form/InputFIeld';
import PressableBtn from '@/components/buttons/PressableBtn';
import { HelpFormValues, helpSchema } from './schema';

interface HelpFormModalProps {
  open: boolean;
  onClose: () => void;
  editingItem: HelpItem | null;
  isMutating: boolean;
  onSave: (data: { id?: number; payload: CreateHelpPayload }) => void;
}

const HelpFormModal = ({
  open,
  onClose,
  editingItem,
  isMutating,
  onSave,
}: HelpFormModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HelpFormValues>({
    resolver: zodResolver(helpSchema),
  });

  useEffect(() => {
    if (open) {
      if (editingItem) {
        reset({
          question: editingItem.question,
          answer: editingItem.answer,
          displayOrder: editingItem.displayOrder,
        });
      } else {
        reset({ question: '', answer: '', displayOrder: 0 });
      }
    }
  }, [open, editingItem, reset]);

  const onSubmit = (values: HelpFormValues) => {
    const payload: CreateHelpPayload = {
      question: values.question.trim(),
      answer: values.answer.trim(),
      displayOrder: values.displayOrder,
    };

    onSave({
      id: editingItem?.id,
      payload,
    });
  };

  if (!open) return null;

  return (
    <Modal
      onClose={onClose}
      title={editingItem ? 'Edit Help Article' : 'Create Help Article'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <InputField
          label="Question"
          {...register('question')}
          placeholder="e.g. How to reset your password"
          error={errors.question?.message}
        />
        <InputField
          label="Display Order"
          type="number"
          {...register('displayOrder', { valueAsNumber: true })}
          placeholder="e.g. 1"
          error={errors.displayOrder?.message}
        />
        <div>
          <label className="helix-label" htmlFor="answer">
            Answer
          </label>
          <textarea
            id="answer"
            {...register('answer')}
            placeholder="Write the help article content here..."
            rows={5}
            className="helix-input resize-none"
          />
          {errors.answer?.message && (
            <p className="text-red-500 text-xs mt-1">{errors.answer.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="helix-btn-secondary flex-1"
            disabled={isMutating}
          >
            Cancel
          </button>
          <PressableBtn
            title={editingItem ? 'Save Changes' : 'Create'}
            className="helix-btn-primary flex-1 justify-center items-center"
            handleClick={handleSubmit(onSubmit)}
            loading={isMutating}
          />
        </div>
      </form>
    </Modal>
  );
};

export default HelpFormModal;
