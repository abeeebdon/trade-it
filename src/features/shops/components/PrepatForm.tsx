'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatUSD } from '@/lib/func';
import { useAppSelector } from '@/hooks/store/store';
import { ProductData } from '@/features/exporter/api/productsApi';
import { useCreateOrder } from '@/features/exporter/hooks/useOrders';
import { PrepayOrderForm, prepayOrderSchema } from './validation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Props {
  productDetails: ProductData;
}

export function PrepayForm({ productDetails }: Props) {
  const [placing, setPlacing] = useState(false);
  const { mutateAsync } = useCreateOrder();
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrepayOrderForm>({
    resolver: zodResolver(prepayOrderSchema),
    defaultValues: {
      qty: '1',
      shipping_name: '',
      shipping_address: '',
      shipping_email: user?.email ?? '',
      shipping_phone: '',
    },
  });

  const qty = watch('qty');
  const qtyNum = Number(qty) || 0;
  const maxQty = Number(productDetails.unit) || 0;

  const onSubmit = async (data: PrepayOrderForm) => {
    const q = Number(data.qty);
    if (q > maxQty) {
      toast.error(`Quantity exceeds available stock of ${maxQty}`);
      return; // guard against exceeding stock
    }
    setPlacing(true);

    try {
      const postData = {
        productId: productDetails.id,
        quantity: Number(data.qty),
        deliveryDate: '2026-06-22T10:37:25.020Z',
        shipTo: data.shipping_name,
        shippingAddress: data.shipping_address,
        email: data.shipping_email,
        phone: data.shipping_phone,
        description: productDetails.description,
        orderType: 'prepay',
      };

      await mutateAsync(postData, {
        onSuccess: (response) => {
          reset();
          router.push(`/payment?id=${response.data.id}`);
        },
      });
    } finally {
      setPlacing(false);
    }
  };
  const calcAmount = (): string => {
    return formatUSD(qtyNum * productDetails.priceUsd);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
      <div className="flex items-center gap-3">
        <label className="helix-label mb-0">Qty</label>
        <input
          type="number"
          className="helix-input w-24"
          {...register('qty')}
          min={1}
          max={maxQty}
        />
        <div>
          <p className="font-mono text-[14px]">= {calcAmount()}</p>
          {qtyNum > maxQty && (
            <p className="text-red-500 text-[10px] ">Max available: {maxQty}</p>
          )}
        </div>
      </div>

      <input
        placeholder="Shipping Name"
        className="helix-input"
        {...register('shipping_name')}
      />
      {errors.shipping_name && (
        <p className="text-red-500 text-xs">{errors.shipping_name.message}</p>
      )}

      <textarea
        placeholder="Shipping Address"
        className="helix-input h-20"
        {...register('shipping_address')}
      />
      {errors.shipping_address && (
        <p className="text-red-500 text-xs">
          {errors.shipping_address.message}
        </p>
      )}

      <input
        placeholder="Email"
        className="helix-input"
        {...register('shipping_email')}
      />
      {errors.shipping_email && (
        <p className="text-red-500 text-xs">{errors.shipping_email.message}</p>
      )}

      <input
        placeholder="Phone"
        className="helix-input"
        {...register('shipping_phone')}
      />
      {errors.shipping_phone && (
        <p className="text-red-500 text-xs">{errors.shipping_phone.message}</p>
      )}
      {user ? (
        <button
          disabled={placing || maxQty <= 0 || qtyNum > maxQty || qtyNum < 1}
          className="helix-btn-primary w-full"
          type="submit"
        >
          {placing ? 'Processing...' : `Prepay ${calcAmount()}`}
        </button>
      ) : (
        <button
          onClick={() => router.push('/login')}
          className="helix-btn-primary w-full"
          type="button"
        >
          Sign in
        </button>
      )}
    </form>
  );
}
