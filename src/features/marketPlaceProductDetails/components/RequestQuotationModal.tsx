'use client';

import InputField from '@/components/form/InputFIeld';
import { Product } from '@/features/landingPage/types/home';
import { formatUSD } from '@/lib/func';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { z } from 'zod';

const requestQuotationSchema = z.object({
  quantity: z.coerce.number().min(1, 'Quantity is required'),
  delivery_address: z.string().min(5, 'Please enter a valid delivery address'),
  target_delivery_date: z.string().optional(),
  message: z.string().optional(),
});

type RequestQuotationFormData = z.infer<typeof requestQuotationSchema>;

interface RequestQuotationModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  product: Product;
}

const RequestQuotationModal = ({
  setOpen,
  product,
}: RequestQuotationModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RequestQuotationFormData>({
    resolver: zodResolver(
      requestQuotationSchema,
    ) as Resolver<RequestQuotationFormData>,
    defaultValues: {
      quantity: 0,
      delivery_address: '',
      target_delivery_date: '',
      message: '',
    },
  });

  const quantity = watch('quantity') || product.moq;

  const onSubmit = async (data: RequestQuotationFormData) => {
    console.log(data);

    // await submitRfq({
    //   ...data,
    //   productId: product.id,
    // });

    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur flex items-start justify-center pt-16 pb-10 overflow-y-auto z-50 p-4"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="helix-card w-full max-w-md p-6 fade-up"
      >
        <div className="helix-label">Request Quotation</div>

        <h2 className="helix-h3 mt-1">{product.productName}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div>
            <InputField
              label="Quantity"
              type="number"
              placeholder={`Minimum ${product.moq}`}
              error={errors.quantity?.message}
              {...register('quantity', {
                valueAsNumber: true,
              })}
            />

            <div className="text-[11px] text-[#9CA3AF] mt-1 font-mono">
              Est: {formatUSD(product.priceUsd)}
            </div>
          </div>

          <InputField
            label="Delivery Address"
            placeholder="Enter delivery address"
            error={errors.delivery_address?.message}
            {...register('delivery_address')}
          />

          <InputField
            label="Target Delivery Date"
            type="date"
            error={errors.target_delivery_date?.message}
            {...register('target_delivery_date')}
          />

          <div>
            <label className="helix-label">Message to Supplier</label>

            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <textarea
                  {...field}
                  className="helix-input h-20"
                  placeholder="Additional information..."
                />
              )}
            />

            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="helix-btn-secondary flex-1"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="helix-btn-primary flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit RFQ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestQuotationModal;
