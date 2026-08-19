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
import { useRouter } from 'next/navigation';
import SuccessModal from '@/components/modals/SuccessModal';

interface Props {
  productDetails: ProductData;
}

export function QuoteForm({ productDetails }: Props) {
  const [placing, setPlacing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { mutateAsync } = useGetQuoteOrder();
  const { mutateAsync: consumerMutateAsync } = useGetConsumerQuoteOrder();
  const { register, watch, handleSubmit, reset } = useForm<QuoteOrderForm>({
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
        sellerId: productDetails.sellerId,
        productName: productDetails.productName,
        message: data.quoteMsg ?? '',
        quantity: Number(data.qty),
        consumerEmail: user?.email ?? '',
        consumerName: user?.fullName ?? '',
      };
      await consumerMutateAsync(postData, {
        onSuccess: () => {
          reset();
          setShowSuccessModal(true);
        },
      });

      // TODO: wire up the actual quote-request mutation here
    } finally {
      setPlacing(false);
    }
  };
  const submitBuyer = async (data: QuoteOrderForm) => {
    try {
      const postData: QuoteRequestType = {
        sellerId: productDetails.sellerId,
        buyerId: Number(id),
        productName: productDetails.productName,
        message: data.quoteMsg ?? '',
        quantity: Number(data.qty),
        buyerEmail: user?.email ?? '',
        buyerName: user?.fullName ?? '',
      };
      await mutateAsync(postData, {
        onSuccess: () => {
          reset();
          setShowSuccessModal(true);
        },
      });

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
  const handleContinue = () => {
    setShowSuccessModal(false);
    if (user?.role == 'consumer') {
      router.push('/consumer/quotes');
    } else {
      router.push('/buyer/fulfillment');
    }
  };
  return (
    <>
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
            = {formatUSD(Number(qty) * productDetails.priceUsd)}
          </div>
        </div>

        <div>
          <label className="helix-label">Message</label>
          <textarea className="helix-input h-24" {...register('quoteMsg')} />
        </div>
        {user ? (
          <button
            disabled={placing || productDetails.unit <= 0}
            className="helix-btn-primary w-full"
            type="submit"
          >
            {placing ? 'Processing...' : 'Request Quote'}
          </button>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="helix-btn-primary w-full"
            type="button"
          >
            Sign in to buy
          </button>
        )}
      </form>
      {showSuccessModal && (
        <SuccessModal
          onCancel={() => setShowSuccessModal(false)}
          open={showSuccessModal}
          message="Your quote request has been sent successfully."
          onContinue={handleContinue}
        />
      )}
    </>
  );
}
