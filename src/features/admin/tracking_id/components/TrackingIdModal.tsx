'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import InputField from '@/components/form/InputFIeld';
import SelectField from '@/components/form/SelectField';
import Modal from '@/components/ui/Modal';
import PressableBtn from '@/components/buttons/PressableBtn';
import type {
  TrackingId,
  TrackingIdFormValues,
  TrackingStatus,
} from '../types/trackingId';
import { TRACKING_STATUSES } from '../constants';

const trackingStatusValues = TRACKING_STATUSES.map(
  (status) => status.value,
) as [TrackingStatus, ...TrackingStatus[]];

const trackingIdSchema = z.object({
  orderNumber: z.string().min(1, 'Order number is required'),
  trackingNumber: z.string().min(1, 'Tracking number is required'),
  status: z.enum(trackingStatusValues),
});

interface TrackingIdModalProps {
  open: boolean;
  onClose: () => void;
  editing?: TrackingId | null;
  isMutating: boolean;
  onSubmit: (values: TrackingIdFormValues) => void;
}

export default function TrackingIdModal({
  open,
  onClose,
  editing,
  isMutating,
  onSubmit,
}: TrackingIdModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackingIdFormValues>({
    resolver: zodResolver(trackingIdSchema),
    defaultValues: editing
      ? {
          orderNumber: editing.orderNumber,
          trackingNumber: editing.trackingNumber,
          status: editing.status,
        }
      : { orderNumber: '', trackingNumber: '', status: 'received' },
  });

  if (!open) return null;

  return (
    <Modal
      onClose={onClose}
      title={editing ? 'Edit Tracking ID' : 'Add Tracking ID'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <InputField
          label="Order number"
          placeholder="e.g. JM-1042"
          {...register('orderNumber')}
          error={errors.orderNumber?.message}
        />
        <InputField
          label="Tracking number"
          placeholder="e.g. JMP202608200001"
          {...register('trackingNumber')}
          error={errors.trackingNumber?.message}
        />
        <SelectField
          label="Status"
          {...register('status')}
          error={errors.status?.message}
        >
          {TRACKING_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </SelectField>

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
            title={editing ? 'Save Changes' : 'Create'}
            className="helix-btn-primary flex-1 justify-center items-center"
            handleClick={handleSubmit(onSubmit)}
            loading={isMutating}
          />
        </div>
      </form>
    </Modal>
  );
}
