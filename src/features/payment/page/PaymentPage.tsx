'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner';

import PressableBtn from '@/components/buttons/PressableBtn';
import Loader from '@/components/buttons/Loader';
import { useGetOrderDetails } from '@/features/shops/hooks/useGetOrders';
import { OrdersSkeleton } from '@/components/orders/OrdersSkeleton';
import OrderNotFound from '@/features/shops/components/OrderNotFound';
import OrderDetailsHeader from '@/features/shops/components/OrderDetailsHeader';
import OrderProductCard from '@/features/shops/components/OrderProductCard';
import OrderShippingCard from '@/features/shops/components/OrderShippingCard';
import OrderPaymentCard from '@/features/shops/components/OrderPaymentCard';
import OrderSummaryCard from '@/features/shops/components/OrderSummaryCard';
import AddPaymentModal from '@/features/consumer/payment-methods/components/AddPaymentModal';
import { PaymentMethodsSection } from '../components/PaymentMethodsSection';
import CheckoutForm from '../stripe/CheckoutStripe';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const orderID = searchParams.get('id') ?? '';
  const router = useRouter();

  const { data: order, isPending } = useGetOrderDetails(orderID);

  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null,
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paying, setPaying] = useState(false);

  const handlePay = async () => {};

  if (!orderID) {
    return (
      <article className="flex flex-col items-center justify-center gap-4 h-[60vh]">
        <h2>Invalid order ID</h2>
        <PressableBtn
          handleClick={() => router.push('/orders')}
          title="Go to Order Page"
          className="helix-btn-primary"
        />
      </article>
    );
  }

  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto">
        <OrdersSkeleton />
      </div>
    );
  }

  if (!order) {
    return <OrderNotFound />;
  }

  return (
    <>
      <section className="max-w-6xl mx-auto">
        <OrderDetailsHeader order={order} />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <OrderProductCard order={order} />
            <OrderShippingCard order={order} />
            <OrderPaymentCard order={order} />
          </div>

          <aside className="space-y-6">
            <OrderSummaryCard order={order} hidePayButton />
            <PaymentMethodsSection
              selectedPaymentId={selectedPaymentId}
              onSelect={setSelectedPaymentId}
              onAddClick={() => setShowPaymentModal(true)}
            />
            <button
              onClick={handlePay}
              disabled={paying}
              className="helix-btn-primary w-full flex items-center justify-center gap-2"
            >
              {paying ? (
                <Loader />
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Pay Now
                </>
              )}
            </button>
            <p className="text-[11px] text-muted text-center">
              Payments are secured and encrypted.
            </p>
          </aside>
        </div>
      </section>

      {showPaymentModal && (
        <AddPaymentModal onClose={() => setShowPaymentModal(false)} />
      )}
    </>
  );
};

export default PaymentPage;
