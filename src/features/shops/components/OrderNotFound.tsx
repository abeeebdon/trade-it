'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Package } from 'lucide-react';

const OrderNotFound = () => {
  const router = useRouter();

  return (
    <div className="helix-card p-12 text-center text-[#9CA3AF]">
      <Package size={48} className="mx-auto mb-4 opacity-40" />
      <p className="text-lg font-medium">Order not found</p>
      <p className="mt-1 text-sm">
        The order you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>
      <button
        onClick={() => router.push('/shop/orders')}
        className="helix-btn-primary mt-6 inline-flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Go back
      </button>
    </div>
  );
};

export default OrderNotFound;
