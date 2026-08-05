'use client';

import { FormEvent, useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { PaymentIntentDetails } from '../api/paymentApi';

export default function CheckoutForm({
  paymentData,
}: {
  paymentData: PaymentIntentDetails;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? 'Payment failed.');
    }

    setLoading(false);
  };

  return (
    <article className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <section className="mx-auto max-w-lg rounded max-h-9/10 overflow-y-auto w-full bg-white p-4">
        <form onSubmit={handleSubmit} className="space-y-6 ">
          <h2 className="text-lg text-black font-semibold">
            Complete your payment
          </h2>
          <div>
            <p className="text-sm text-muted">
              You will be charged{' '}
              <span className="font-bold">
                ${(paymentData?.totalUsd || 0).toFixed(2)}
              </span>{' '}
              for this order.
            </p>
          </div>

          <PaymentElement />

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full rounded-md bg-black px-4 py-3 text-white disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </section>
    </article>
  );
}
