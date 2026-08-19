'use client';

import { useAppSelector, useAppDispatch } from '@/hooks/store/store';
import { useRouter } from 'next/navigation';
import { formatUSD } from '@/lib/func';
import {
  removeFromCart,
  updateCartItemQuantity,
} from '@/store/cart/cart.slice';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import AddPaymentModal from '@/features/consumer/payment-methods/components/AddPaymentModal';
import { EmptyCart } from '../components/EmptyCart';
import { CartItemList } from '../components/CartItemList';
import { OrderSummary } from '../components/OrderSummary';
import DeliveryAddressSection from '../components/DeliveryAddressSection';
import Loader from '@/components/buttons/Loader';
import { CreateCheckoutOrderPayload } from '../types/types';
import { createPaymentIntent, PaymentIntentDetails } from '../api/paymentApi';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../stripe/CheckoutStripe';
import { PaymentMethodsSection } from '../components/PaymentMethodsSection';
import SuccessModal from '@/components/modals/SuccessModal';
const CheckoutPage = () => {
  const { items } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [paymentData, setPaymentData] = useState<PaymentIntentDetails | null>(
    null,
  );
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null,
  );

  const [paying, setPaying] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.priceUsd * item.quantity,
    0,
  );
  const shippingFee = subtotal > 0 ? 0 : 0; // flat shipping fee
  const total = subtotal + shippingFee;

  const handleQuantityChange = (productId: number, newQty: number) => {
    if (newQty < 1) return;
    dispatch(updateCartItemQuantity({ productId, quantity: newQty }));
  };

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
    toast.info('Item removed from cart');
  };

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
      phone: items[0].shipping_phone ?? '',
      deliveryDate: new Date().toISOString(),
      description: items[0].description ?? '',
      orderType: 'prepay',
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

  console.log(paymentData);
  if (items.length === 0) {
    return <EmptyCart onBrowse={() => router.push('/')} />;
  }
  return (
    <>
      <section>
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1 text-sm text-muted hover:text-text mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </button>

        <h1 className="helix-h1 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CartItemList
              items={items}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />

            <DeliveryAddressSection />
          </div>

          <aside className="space-y-6">
            <OrderSummary
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
            />

            {/* <PaymentMethodsSection
              selectedPaymentId={selectedPaymentId}
              onSelect={setSelectedPaymentId}
              onAddClick={() => setShowPaymentModal(true)}
            /> */}

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

            {/* <p className="text-[11px] text-muted text-center">
              Payments are secured and encrypted.{' '}
              {user
                ? `Logged in as ${user.email}`
                : 'Sign in to complete payment.'}
            </p> */}
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
    </>
  );
};

export default CheckoutPage;
