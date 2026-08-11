'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useGetOrderDetails } from '../hooks/useGetOrders';
import { StatusPill } from '../components/StatusPill';
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
  ShieldCheck,
} from 'lucide-react';

const OrderDetailsPage = () => {
  const router = useRouter();
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
  }

  const total = order.totalAmount ?? order.amount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            onClick={() => router.push('/shop/orders')}
            className="flex items-center gap-2 text-[14px] text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors mb-2"
          >
            <ArrowLeft size={16} />
            Back to orders
          </button>
          <h1 className="text-[22px] font-bold text-[#F5F5F5]">
            Order {order.orderNumber}
          </h1>
          <p className="text-[13px] text-[#9CA3AF] mt-1">
            Placed on {formatDateTime(order.deliveryDate)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusPill status={order.status} />
          <StatusPill status={order.paymentStatus} />
        </div>
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column — product & shipping */}
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
                value={order.category?.replace(/-/g, ' ') ?? '—'}
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

        {/* Right column — summary, payment & metadata */}
        <div className="space-y-6">
          {/* Order summary */}
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
              <h3 className="helix-label">Total Amount</h3>
              <div className="font-mono text-3xl text-[#C9922A] font-bold">
                {formatUSD(total)}
              </div>

              {order.status === 'pending_payment' && (
                <button
                  onClick={() => router.push(`/payment?id=${order.id}`)}
                  className="helix-btn-primary w-full inline-flex items-center justify-center gap-2"
                >
                  <CreditCard size={16} />
                  Pay
                </button>
              )}

              <div className="space-y-3 pt-3 border-t border-[#1A7A6E]/15 text-[14px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#9CA3AF]">Subtotal</span>
                  <span className="text-[#F5F5F5]">
                    {formatUSD(order.subtotalAmount ?? order.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9CA3AF]">Shipping</span>
                  <span className="text-[#F5F5F5]">
                    {formatUSD(order.shippingAmount ?? 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9CA3AF]">Quantity</span>
                  <span className="text-[#F5F5F5]">{order.quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9CA3AF]">Currency</span>
                  <span className="text-[#F5F5F5] uppercase">
                    {order.currency ?? 'usd'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#1A7A6E]/15">
                  <span className="text-[#9CA3AF]">Role</span>
                  <span className="text-[#F5F5F5]">{order.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment details */}
          <div className="helix-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#1A7A6E]/10 flex items-center justify-center">
                <ShieldCheck size={20} className="text-[#1A7A6E]" />
              </div>
              <h2 className="text-[16px] font-semibold text-[#F5F5F5]">
                Payment
              </h2>
            </div>

            <div className="space-y-4 text-[14px]">
              <div className="flex items-center justify-between">
                <span className="text-[#9CA3AF]">Provider</span>
                <span className="text-[#F5F5F5] capitalize">
                  {order.paymentProvider ?? '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#9CA3AF]">Payment status</span>
                <StatusPill status={order.paymentStatus} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#9CA3AF]">Stripe status</span>
                <span className="text-[#F5F5F5] capitalize">
                  {order.stripePaymentStatus?.replace(/_/g, ' ') ?? '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#9CA3AF]">Paid at</span>
                <span className="text-[#F5F5F5]">
                  {order.paidAt ? formatDateTime(order.paidAt) : 'Not paid yet'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact card */}
          <div className="helix-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#374151]/30 flex items-center justify-center">
                <User size={20} className="text-[#9CA3AF]" />
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

            <div className="space-y-4 text-[14px]">
              <div className="flex items-center justify-between">
                <span className="text-[#9CA3AF]">Order ID</span>
                <span className="text-[#F5F5F5] font-mono text-[13px]">
                  #{order.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#9CA3AF]">Order Number</span>
                <span className="text-[#F5F5F5] font-mono text-[12px]">
                  {order.orderNumber}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#9CA3AF]">Order Type</span>
                <span className="text-[#F5F5F5] capitalize">
                  {order.orderType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#9CA3AF]">Status</span>
                <StatusPill status={order.status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
