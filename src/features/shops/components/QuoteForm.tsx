'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatUSD } from '@/lib/func';
import { useAppSelector } from '@/hooks/store/store';
import { ProductData } from '@/features/exporter/api/productsApi';
import { QuoteOrderForm, quoteOrderSchema } from './validation';
import { useGetQuoteOrder } from '@/features/buyer/orders/hooks/useGetQuoteOrders';
import { QuoteRequestType } from '@/features/buyer/orders/types/orders';
import { getUserId } from '@/lib/helpers/TokenDetails';
import { useGetConsumerQuoteOrder } from '../hooks/useGetOrders';
import { CreateConsumerQuoteRequest } from '../types/shops';

interface Props {
  productDetails: ProductData;
}

export function QuoteForm({ productDetails }: Props) {
  const [placing, setPlacing] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { mutateAsync } = useGetQuoteOrder();
  const { mutateAsync: consumerMutateAsync } = useGetConsumerQuoteOrder();
  const { register, watch, handleSubmit } = useForm<QuoteOrderForm>({
    resolver: zodResolver(quoteOrderSchema),
    defaultValues: {
      qty: '1',
      quoteMsg: '',
    },
  });
  const id = getUserId();

  const qty = watch('qty');
  const submitConsumer = async (data: QuoteOrderForm) => {
    try {
      const postData: CreateConsumerQuoteRequest = {
        sellerId: productDetails.userId,
        productName: productDetails.productName,
        message: data.quoteMsg ?? '',
        quantity: Number(data.qty),
        consumerEmail: user?.email ?? '',
        consumerName: user?.fullName ?? '',
      };
      await consumerMutateAsync(postData);

      // TODO: wire up the actual quote-request mutation here
    } finally {
      setPlacing(false);
    }
  };
  const submitBuyer = async (data: QuoteOrderForm) => {
    try {
      const postData: QuoteRequestType = {
        sellerId: productDetails.userId,
        buyerId: id,
        productName: productDetails.productName,
        message: data.quoteMsg ?? '',
        quantity: Number(data.qty),
        buyerEmail: user?.email ?? '',
        buyerName: user?.fullName ?? '',
      };
      await mutateAsync(postData);

      // TODO: wire up the actual quote-request mutation here
    } finally {
      setPlacing(false);
    }
  };
  const onSubmit = async (data: QuoteOrderForm) => {
    setPlacing(true);

    if (user?.role == 'consumer') {
      submitConsumer(data);
      return;
    } else {
      submitBuyer(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
      <div className="flex items-center gap-3">
        <label className="helix-label mb-0">Qty</label>
        <input
          type="text"
          className="helix-input w-24"
          {...register('qty')}
          min={1}
          max={productDetails.unit}
        />
        <div className="font-mono text-[14px]">
          = {formatUSD(Number(qty) * productDetails.price)}
        </div>
      </div>

      <div>
        <label className="helix-label">Message</label>
        <textarea className="helix-input h-24" {...register('quoteMsg')} />
      </div>

      <button
        disabled={placing || productDetails.unit <= 0}
        className="helix-btn-primary w-full"
        type="submit"
      >
        {placing
          ? 'Processing...'
          : user
            ? 'Request Quote'
            : 'Sign in to request quote'}
      </button>
    </form>
  );
}
