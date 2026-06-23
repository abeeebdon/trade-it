'use client';

import { formatUSD } from '@/lib/func';
import { Lock, Map, MessageCircle, Shield, Truck } from 'lucide-react';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/store/store';
import { ProductData } from '@/features/exporter/api/productsApi';

import { useForm } from 'react-hook-form';
import { ProductOrderForm, productOrderSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateOrder } from '@/features/exporter/hooks/useOrders';

interface Quote {
  id: string;
  quote_number: string;
  quoted_unit_price_usd: number;
}

interface Props {
  productDetails: ProductData;
}

const ProductDetailsForm = ({ productDetails }: Props) => {
  const [mode, setMode] = useState<'prepay' | 'quote'>('prepay');
  const [placing, setPlacing] = useState(false);
  const [quote] = useState<Quote | null>(null);
  const { mutateAsync } = useCreateOrder();
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductOrderForm>({
    resolver: zodResolver(productOrderSchema),
    defaultValues: {
      qty: '1',
      shipping_name: '',
      shipping_address: '',
      shipping_email: '',
      shipping_phone: '',
      quoteMsg: '',
    },
  });

  const qty = watch('qty');

  const onSubmit = async (data: ProductOrderForm) => {
    if (mode == 'prepay') {
      const postData = {
        productId: productDetails.id,
        quantity: Number(data.qty),
        deliveryDate: '2026-06-22T10:37:25.020Z',
        shipTo: data.shipping_name,
        shippingAddress: data.shipping_address,
        email: data.shipping_email,
        phone: data.shipping_phone,
        description: productDetails.description,
        orderType: mode,
      };
      await mutateAsync(postData);
      return;
    }
  };
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="helix-card p-6">
        <p className="helix-label">Price</p>

        <p className="font-mono text-4xl text-[#C9922A] font-bold mt-1">
          {formatUSD(productDetails.price)}
        </p>

        <div className="text-[12px] text-[#9CA3AF] mt-1">
          {productDetails.unit > 0
            ? `${productDetails.unit} in stock`
            : 'Sold out'}
        </div>

        {/* MODE SWITCH */}
        {!quote && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode('prepay')}
              className={`p-3 rounded border text-left text-[12px] ${
                mode === 'prepay'
                  ? 'border-[#C9922A] bg-[#C9922A]/8'
                  : 'border-[#1A7A6E]/30'
              }`}
            >
              <div className="font-semibold flex items-center gap-1">
                <Lock size={12} /> Order & Prepay
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode('quote')}
              className={`p-3 rounded border text-left text-[12px] ${
                mode === 'quote'
                  ? 'border-[#C9922A] bg-[#C9922A]/8'
                  : 'border-[#1A7A6E]/30'
              }`}
            >
              <div className="font-semibold flex items-center gap-1">
                <MessageCircle size={12} /> Request Quote
              </div>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          {/* QTY */}
          <div className="flex items-center gap-3">
            <label className="helix-label mb-0">Qty</label>

            <input
              type="text"
              className="helix-input w-24"
              {...register('qty')}
              min={1}
              max={productDetails.unit}
            />
            <div className="font-mono text-[14px]">
              = {formatUSD(Number(qty) * productDetails.price)}
            </div>
          </div>

          {/* QUOTE MODE */}
          {mode === 'quote' && (
            <div>
              <label className="helix-label">Message</label>
              <textarea
                className="helix-input h-24"
                {...register('quoteMsg')}
              />
            </div>
          )}

          {/* PREPAY MODE */}
          {mode === 'prepay' && (
            <>
              <input
                placeholder="Shipping Name"
                className="helix-input"
                {...register('shipping_name')}
              />
              {errors.shipping_name && (
                <p className="text-red-500 text-xs">
                  {errors.shipping_name.message}
                </p>
              )}

              <textarea
                placeholder="Shipping Address"
                className="helix-input h-20"
                {...register('shipping_address')}
              />

              <input
                placeholder="Email"
                className="helix-input"
                {...register('shipping_email')}
              />

              <input
                placeholder="Phone"
                className="helix-input"
                {...register('shipping_phone')}
              />
            </>
          )}

          <button
            disabled={placing || productDetails.unit <= 0}
            className="helix-btn-primary w-full"
            type="submit"
          >
            {placing
              ? 'Processing...'
              : mode === 'quote'
                ? user
                  ? 'Request Quote'
                  : 'Sign in to request quote'
                : user
                  ? `Prepay ${formatUSD(productDetails.price)}`
                  : 'Sign in to buy'}
          </button>
        </form>
      </div>

      {/* SHIPPING INFO (unchanged UI) */}
      <div className="helix-card p-5">
        <div className="helix-label">How this ships</div>

        <div className="mt-3 space-y-2 text-[13px]">
          <div className="flex items-start gap-2">
            <Truck size={16} className="text-[#C9922A] mt-0.5" />
            <div>International fulfillment + logistics handling</div>
          </div>

          <div className="flex items-start gap-2">
            <Map size={16} className="text-[#C9922A] mt-0.5" />
            <div>Import, duties & delivery handled by logistics partner</div>
          </div>

          <div className="flex items-start gap-2">
            <Shield size={16} className="text-[#C9922A] mt-0.5" />
            <div>Escrow protected payment system</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsForm;
