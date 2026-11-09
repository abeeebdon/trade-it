'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import InputField from '@/components/form/InputFIeld';
import CustomSelect from '@/components/form/CustomSelect';
import PressableBtn from '@/components/buttons/PressableBtn';

export type FulfillmentStatus = 'unfulfilled' | 'shipped' | 'delivered';

export type FulfillmentStatusOption = {
  value: FulfillmentStatus;
  label: string;
};

export const FULFILLMENT_STATUSES: FulfillmentStatusOption[] = [
  { value: 'unfulfilled', label: 'Unfulfilled' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
];

const fulfillmentStatusValues = FULFILLMENT_STATUSES.map(
  (status) => status.value,
) as [FulfillmentStatus, ...FulfillmentStatus[]];

export const fulfillmentSchema = z.object({
  fulfillmentStatus: z.enum(fulfillmentStatusValues, {
    message: 'Select a fulfillment status',
  }),
  courierName: z.string().trim().min(1, 'Courier name is required'),
  trackingNumber: z.string().trim().min(1, 'Tracking number is required'),
  trackingUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || /^https?:\/\/\S+$/i.test(value),
      'Enter a valid URL starting with http:// or https://',
    ),
});

export type FulfillmentFormValues = z.infer<typeof fulfillmentSchema>;

export type FulfillmentPayload = {
  fulfillmentStatus: FulfillmentStatus;
  courierName: string;
  trackingNumber: string;
  trackingUrl: string;
};

type FulfillmentFormProps = {
  defaultValues?: Partial<FulfillmentFormValues>;
  statusOptions?: FulfillmentStatusOption[];
  isSubmitting?: boolean;
  onSubmit: (values: FulfillmentPayload) => void;
  onCancel?: () => void;
};

const EMPTY_VALUES: FulfillmentFormValues = {
  fulfillmentStatus: 'unfulfilled',
  courierName: '',
  trackingNumber: '',
  trackingUrl: '',
};

export default function FulfillmentForm({
  defaultValues,
  statusOptions = FULFILLMENT_STATUSES,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: FulfillmentFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FulfillmentFormValues>({
    resolver: zodResolver(fulfillmentSchema),
    defaultValues: { ...EMPTY_VALUES, ...defaultValues },
  });

  const submit = (values: FulfillmentFormValues) => {
    onSubmit({
      fulfillmentStatus: values.fulfillmentStatus,
      courierName: values.courierName.trim(),
      trackingNumber: values.trackingNumber.trim(),
      trackingUrl: values.trackingUrl.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      <CustomSelect
        control={control}
        name="fulfillmentStatus"
        label="Fulfillment status"
        options={statusOptions.map((status) => ({
          label: status.label,
          value: status.value,
        }))}
        error={errors.fulfillmentStatus?.message}
        disabled={isSubmitting}
      />

      <InputField
        label="Courier name"
        placeholder="e.g. DHL Express"
        {...register('courierName')}
        error={errors.courierName?.message}
        disabled={isSubmitting}
      />

      <InputField
        label="Tracking number"
        placeholder="e.g. JMP202608200001"
        {...register('trackingNumber')}
        error={errors.trackingNumber?.message}
        disabled={isSubmitting}
      />

      <InputField
        label="Tracking URL"
        type="url"
        placeholder="https://courier.com/track/..."
        {...register('trackingUrl')}
        error={errors.trackingUrl?.message}
        disabled={isSubmitting}
      />

      <div className="flex items-center gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="helix-btn-secondary flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}

        <PressableBtn
          title="Save shipment"
          className="helix-btn-primary flex-1 justify-center items-center"
          handleClick={handleSubmit(submit)}
          loading={isSubmitting}
        />
      </div>
    </form>
  );
}
