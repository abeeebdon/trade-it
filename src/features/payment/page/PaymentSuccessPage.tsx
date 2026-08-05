'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import PressableBtn from '@/components/buttons/PressableBtn';

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const orderID = searchParams.get('id');
  const router = useRouter();

  return (
    <article className="flex flex-col items-center justify-center gap-6 h-[60vh]">
      <div className="flex flex-col items-center gap-2">
        <div className="text-5xl">✅</div>
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
        <p className="text-muted-foreground">Thank you for your purchase.</p>
        {orderID && (
          <p className="text-sm text-muted-foreground">
            Order ID: <span className="font-medium">{orderID}</span>
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <PressableBtn
          handleClick={() =>
            router.push(
              orderID ? `/consumer/orders?id=${orderID}` : '/consumer/orders',
            )
          }
          title="View Order"
          className="helix-btn-primary"
        />
        <PressableBtn
          handleClick={() => router.push('/shop')}
          title="Continue Shopping"
          className="helix-btn-secondary"
        />
      </div>
    </article>
  );
};

export default PaymentSuccessPage;
