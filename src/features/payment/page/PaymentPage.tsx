'use client';
import PressableBtn from '@/components/buttons/PressableBtn';
import { useRouter, useSearchParams } from 'next/navigation';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const orderID = searchParams.get('id');
  const router = useRouter();
  if (!orderID) {
    return (
      <article className="flex flex-col items-center justify-center gap-4 h-[60vh]">
        <h2>Invalid order ID</h2>
        <PressableBtn
          handleClick={() => router.push('/consumer/orders')}
          title="Go to Order Page"
          className="helix-btn-primary"
        />
      </article>
    );
  }
  return <div>Coming soon - Order ID: {orderID}</div>;
};

export default PaymentPage;
