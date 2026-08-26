'use client';

import { useAppSelector } from '@/hooks/store/store';
import { useRouter } from 'next/navigation';
import { formatUSD } from '@/lib/func';
import { useCart } from '@/features/consumer/cart/hooks/useCart';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import AddPaymentModal from '@/features/consumer/payment-methods/components/AddPaymentModal';
import { EmptyCart } from '../components/EmptyCart';
import { OrderSummary } from '../components/OrderSummary';
import DeliveryAddressSection from '../components/DeliveryAddressSection';
import Loader from '@/components/buttons/Loader';
import { PageLoading } from '@/components/loading';
import { CreateCheckoutOrderPayload } from '../types/types';
import { createPaymentIntent, PaymentIntentDetails } from '../api/paymentApi';
import SuccessModal from '@/components/modals/SuccessModal';
import { PaymentMethodsSection } from '../components/PaymentMethodsSection';
import CartItemList from '../components/CartItemList';
const CheckoutPage = () => {
  const { data, isPending } = useCart();
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>('');
  const items = data?.items ?? [];
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [paymentData, setPaymentData] = useState<PaymentIntentDetails | null>(
    null,
  );

  const [paying, setPaying] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const subtotal = data?.subtotal ?? 0;
  const shippingFee = data?.shipping ?? 0;
  const total = data?.total ?? 0;

  const handlePay = async () => {
    setPaying(true);
    const selectedItems = items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    const postData: CreateCheckoutOrderPayload = {
      items: selectedItems,
      deliveryAddressId: 1,
      email: user?.email ?? '',
      phone: '',
      deliveryDate: new Date().toISOString(),
      description: '',
      orderType: 'prepay',
      PaymentType: selectedPaymentId,
    };

    try {
      const response = await createPaymentIntent(postData);
      setPaymentData({
        clientSecret: response.data.clientSecret,
        publishableKey: response.data.publishableKey,
        stripePaymentIntentId: response.data.stripePaymentIntentId,
        subtotalUsd: response.data.subtotalUsd,
        totalUsd: response.data.totalUsd,
        order: response.data.order,
      });
      setShowSuccess(true);
      setSuccessMsg(response.message);
    } catch (err) {
      console.error('[payment-intent] error:', err);
    } finally {
      setPaying(false);
    }
  };

  if (isPending) {
    return <PageLoading message="Loading your cart..." />;
  }
  if (items.length === 0) {
    return <EmptyCart />;
  }
  return (
    <article>
      <section>
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1 text-sm text-muted hover:text-text mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </button>

        <h1 className="helix-h2 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2 space-y-6">
            <CartItemList items={items} />

            <DeliveryAddressSection />
          </article>

          <aside className="space-y-6 ">
            <OrderSummary
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
            />

            <PaymentMethodsSection
              selectedPaymentId={selectedPaymentId}
              onSelect={setSelectedPaymentId}
              onAddClick={() => setShowPaymentModal(true)}
            />

            <button
              onClick={handlePay}
              disabled={paying || items.length === 0}
              className="helix-btn-primary w-full flex items-center justify-center gap-2"
            >
              {paying ? (
                <Loader />
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Order {formatUSD(total)}
                </>
              )}
            </button>
          </aside>
        </div>

        {showPaymentModal && (
          <AddPaymentModal onClose={() => setShowPaymentModal(false)} />
        )}
      </section>

      <SuccessModal
        open={showSuccess}
        message=""
        onContinue={() => router.push(`/payment?id=${paymentData?.order.id}`)}
        onCancel={() => router.refresh()}
      />
      {/* {paymentData && (
        <Elements
          stripe={loadStripe(paymentData.publishableKey)}
          options={{
            clientSecret: paymentData.clientSecret,
          }}
        >
          <CheckoutForm paymentData={paymentData} />
        </Elements>
      )} */}
    </article>
  );
};

export default CheckoutPage;
