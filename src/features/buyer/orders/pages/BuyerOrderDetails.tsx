'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useGetBuyerOrderDetails } from '../hooks/useGetBuyerOrders';
import { StatusPill } from '@/features/shops/components/StatusPill';
import DetailCard from '@/components/custom/DetailCard';
import { Loading } from '@/components/loading';
import { formatDateTime, formatUSD } from '@/lib/func';
import {
  ArrowLeft,
  Package,
  User,
  CreditCard,
  Truck,
  FileText,
} from 'lucide-react';

const BuyerOrderDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const { data, isPending } = useGetBuyerOrderDetails({ orderId: id });

  // data may be an array or a single object — normalise to a single order
  const order = Array.isArray(data) ? data[0] : data;

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="helix-card p-12 text-center text-[#9CA3AF]">
        <Package size={48} className="mx-auto mb-4 opacity-40" />
        <p className="text-lg font-medium">Order not found</p>
        <p className="mt-1 text-sm">
          The order you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <button
          onClick={() => router.back()}
          className="helix-btn-primary mt-6 inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[14px] text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors mb-2"
          >
            <ArrowLeft size={16} />
            Back to orders
          </button>
          <h1 className="text-[22px] font-bold text-[#F5F5F5]">
            Order {order.orderNumber}
          </h1>
        </div>
        <div className="flex gap-3">
          <StatusPill status={order.status} />
          <StatusPill status={order.paymentStatus} />
        </div>
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column — product & order info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product card */}
          <div className="helix-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#C9922A]/10 flex items-center justify-center">
                <Package size={20} className="text-[#C9922A]" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-[#F5F5F5]">
                  {order.productName}
                </h2>
                <p className="text-[13px] text-[#9CA3AF]">
                  Product ID: #{order.productId}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <DetailCard
                label="Category"
                value={order.category.replace(/-/g, ' ')}
              />
              <DetailCard
                label="Quantity"
                value={`${order.quantity} unit(s)`}
              />
              <DetailCard label="Order Type" value={order.orderType} />
            </div>

            {order.description && (
              <div className="mt-6 pt-6 border-t border-[#1A7A6E]/15">
                <div className="helix-label mb-1">Description</div>
                <p className="text-[14px] text-[#F5F5F5] leading-relaxed">
                  {order.description}
                </p>
              </div>
            )}
          </div>

          {/* Shipping details */}
          <div className="helix-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#1A7A6E]/10 flex items-center justify-center">
                <Truck size={20} className="text-[#1A7A6E]" />
              </div>
              <h2 className="text-[16px] font-semibold text-[#F5F5F5]">
                Shipping Information
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <DetailCard label="Ship To" value={order.shipTo} />
              <DetailCard
                label="Shipping Address"
                value={order.shippingAddress}
              />
              <DetailCard
                label="Delivery Date"
                value={formatDateTime(order.deliveryDate)}
              />
            </div>
          </div>
        </div>

        {/* Right column — summary & contact */}
        <div className="space-y-6">
          {/* Price summary */}
          <div className="helix-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#C9922A]/10 flex items-center justify-center">
                <CreditCard size={20} className="text-[#C9922A]" />
              </div>
              <h2 className="text-[16px] font-semibold text-[#F5F5F5]">
                Order Summary
              </h2>
            </div>

            <div className="space-y-4">
              <div className="helix-label">Total Amount</div>
              <div className="font-mono text-3xl text-[#C9922A] font-bold">
                {formatUSD(order.amount)}
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-[#9CA3AF]">Quantity</span>
                <span className="text-[#F5F5F5]">{order.quantity}</span>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-[#9CA3AF]">Order Type</span>
                <span className="text-[#F5F5F5] capitalize">
                  {order.orderType}
                </span>
              </div>
              <div className="flex items-center justify-between text-[14px] pt-3 border-t border-[#1A7A6E]/15">
                <span className="text-[#9CA3AF]">Role</span>
                <span className="text-[#F5F5F5]">{order.role}</span>
              </div>
            </div>
          </div>

          {/* Contact card */}
          <div className="helix-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#1A7A6E]/10 flex items-center justify-center">
                <User size={20} className="text-[#1A7A6E]" />
              </div>
              <h2 className="text-[16px] font-semibold text-[#F5F5F5]">
                Contact
              </h2>
            </div>

            <div className="space-y-4">
              <DetailCard label="Email" value={order.email} />
              <DetailCard label="Phone" value={order.phone} />
            </div>
          </div>

          {/* Order metadata */}
          <div className="helix-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#374151]/30 flex items-center justify-center">
                <FileText size={20} className="text-[#9CA3AF]" />
              </div>
              <h2 className="text-[16px] font-semibold text-[#F5F5F5]">
                Details
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-[#9CA3AF]">Order ID</span>
                <span className="text-[#F5F5F5] font-mono text-[13px]">
                  #{order.id}
                </span>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-[#9CA3AF]">Status</span>
                <StatusPill status={order.status} />
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-[#9CA3AF]">Payment</span>
                <StatusPill status={order.paymentStatus} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerOrderDetails;
