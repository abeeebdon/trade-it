'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import PressableBtn from '@/components/buttons/PressableBtn';
import { useModerateListing } from '../hooks/useModerateListing';
import { ModerateListingPayload } from '../types/listings';
import { isAxiosError } from 'axios';
import {
  moderateSchema,
  ModerateFormData,
  ModerateListingModalProps,
  actionConfig,
} from './moderateListingData';

export default function ModerateListingModal({
  listingId,
  listingTitle,
  currentStatus,
  onClose,
}: ModerateListingModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<ModerateFormData>({
    resolver: zodResolver(moderateSchema),
    defaultValues: {
      action: '',
      notes: '',
    },
  });

  const selectedAction = watch('action');

  const { mutate: moderate, isPending } = useModerateListing();

  const onSubmit = (data: ModerateFormData) => {
    const payload: ModerateListingPayload = {
      status: data.action,
      notes: data.notes,
    };

    moderate(
      { listingId, payload },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (err) => {
          const message = isAxiosError(err)
            ? err.response?.data?.message || err.message
            : err instanceof Error
              ? err.message
              : 'Failed to moderate listing';

          setError('root', { message });
        },
      },
    );
  };

  return (
    <Modal title="Moderate Listing" onClose={onClose} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Listing context */}
        <div className="rounded-xl border border-[#1A7A6E]/20 bg-[#0A1628]/50 p-4">
          <p className="text-[13px] text-[#9CA3AF]">
            Listing:{' '}
            <span className="text-[#F5F5F5] font-medium">{listingTitle}</span>
          </p>
          <p className="text-[13px] text-[#9CA3AF] mt-1">
            Current status:{' '}
            <span className="capitalize font-medium text-[#C9922A]">
              {currentStatus}
            </span>
          </p>
        </div>

        {/* Server / API Error */}
        {errors.root && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-sm text-red-700 dark:text-red-400">
              {errors.root.message}
            </p>
          </div>
        )}

        {/* Action selection */}
        <div>
          <label className="helix-label mb-2 block">Action</label>
          <div className="flex gap-3">
            {actionConfig.map((config) => {
              const Icon = config.icon;
              const isActive = selectedAction === config.label;

              return (
                <button
                  key={config.label}
                  type="button"
                  data-active={isActive}
                  onClick={() =>
                    setValue('action', config.label, { shouldValidate: true })
                  }
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${config.className}`}
                >
                  <Icon size={18} />
                  {config.label}
                </button>
              );
            })}
          </div>
          {errors.action && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.action.message}
            </p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="mod-notes" className="helix-label">
            Notes
          </label>
          <textarea
            id="mod-notes"
            className="helix-input h-28 mt-1"
            placeholder="Provide a reason for this moderation action..."
            {...register('notes')}
          />
          {errors.notes && (
            <p className="text-red-500 text-xs mt-1">{errors.notes.message}</p>
          )}
        </div>

        {/* Submit + Cancel */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="helix-btn-secondary flex-1"
          >
            Cancel
          </button>
          <PressableBtn
            title={isPending ? 'Submitting...' : 'Submit'}
            loading={isPending}
            handleClick={handleSubmit(onSubmit)}
            className="helix-btn-primary justify-center items-center flex-1"
          />
        </div>
      </form>
    </Modal>
  );
}
