'use client';

import { useSearchParams } from 'next/navigation';
import { useGetOrderDetails } from '../hooks/useGetOrders';
import { Loading } from '@/components/loading';
import OrderDetailsHeader from '../components/OrderDetailsHeader';
import OrderProductCard from '../components/OrderProductCard';
import OrderShippingCard from '../components/OrderShippingCard';
import OrderSummaryCard from '../components/OrderSummaryCard';
import OrderPaymentCard from '../components/OrderPaymentCard';
import OrderContactCard from '../components/OrderContactCard';
import OrderMetaCard from '../components/OrderMetaCard';
import OrderNotFound from '../components/OrderNotFound';

const OrderDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const { data: order, isPending } = useGetOrderDetails(id);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  if (!order) {
    return <OrderNotFound />;
  }

  return (
    <div className="space-y-6">
      <OrderDetailsHeader order={order} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column — product & shipping */}
        <div className="lg:col-span-2 space-y-6">
          <OrderProductCard order={order} />
          <OrderShippingCard order={order} />
        </div>

        <OrderSummaryCard order={order} />
        <div className="lg:flex justify-between lg:col-span-3 space-y-3 gap-4">
          <OrderPaymentCard order={order} />
          <OrderContactCard order={order} />
          <OrderMetaCard order={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
