'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatUSD } from '@/lib/func';
import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import { ProductData } from '@/features/exporter/api/productsApi';
import { addToCart } from '@/store/cart/cart.slice';
import { PrepayOrderForm, prepayOrderSchema } from './validation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import InputField from '@/components/form/InputFIeld';
import CartSuccessModal from './CartSuccessModal';
import AddToShoppingListModal from './AddToShoppingListModal';
import { FileText, Truck } from 'lucide-react';

interface Props {
  productDetails: ProductData;
  setMode?: (mode: string) => void;
}

export function PrepayForm({ productDetails, setMode }: Props) {
  const [placing, setPlacing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showShoppingListModal, setShowShoppingListModal] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrepayOrderForm>({
    resolver: zodResolver(prepayOrderSchema),
    defaultValues: {
      qty: '1',
      shipping_name: '',
      shipping_address: '',
      shipping_email: user?.email ?? '',
      shipping_phone: '',
    },
  });

  const qty = watch('qty');
  const qtyNum = Number(qty) || 0;
  const maxQty = Number(productDetails.unit) || 0;

  const onSubmit = async (data: PrepayOrderForm) => {
    const q = Number(data.qty);
    if (q > maxQty) {
      toast.error(`Quantity exceeds available stock of ${maxQty}`);
      return;
    }
    setPlacing(true);

    try {
      dispatch(
        addToCart({
          productId: productDetails.id,
          productName: productDetails.productName,
          thumbnailImage: productDetails.thumbnailImage ?? '',
          priceUsd: productDetails.priceUsd ?? productDetails.price,
          quantity: Number(data.qty),
          shipping_name: data.shipping_name,
          shipping_address: data.shipping_address,
          shipping_email: data.shipping_email,
          shipping_phone: data.shipping_phone,
          description: productDetails.description ?? '',
        }),
      );

      reset();
      setShowSuccess(true);
    } finally {
      setPlacing(false);
    }
  };
  const calcAmount = (): string => {
    return formatUSD(qtyNum * productDetails.priceUsd);
  };
  const handleAddToShoppingList = () => {
    setShowShoppingListModal(true);
  };
  const handleToggleToQuoteMode = () => {
    setMode?.('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        <article className="space-y-3">
          <div className="">
            <label className="helix-label mb-0 block">Quantity</label>
            <input
              type="number"
              className="helix-input w-24"
              {...register('qty')}
              min={1}
              max={maxQty}
            />
            <div>
              <p className="font-mono text-[14px]">= {calcAmount()}</p>
              {qtyNum > maxQty && (
                <p className="text-red-500 text-[10px] ">
                  Max available: {maxQty}
                </p>
              )}
            </div>
          </div>

          <InputField
            label="Shipping Name"
            placeholder="Shipping Name"
            className="helix-input"
            error={errors.shipping_name?.message}
            {...register('shipping_name')}
          />
          <InputField
            label="Shipping Address"
            placeholder="Shipping Address"
            className="helix-input"
            error={errors.shipping_address?.message}
            {...register('shipping_address')}
          />
          <InputField
            label="Email"
            placeholder="Email"
            className="helix-input"
            error={errors.shipping_email?.message}
            {...register('shipping_email')}
          />
          <InputField
            label="Phone or Contact Number"
            placeholder="+99"
            className="helix-input"
            type="number"
            error={errors.shipping_phone?.message}
            {...register('shipping_phone')}
          />
        </article>
        <article className="mt-5">
          {user ? (
            <button
              disabled={placing || maxQty <= 0 || qtyNum > maxQty || qtyNum < 1}
              className="helix-btn-primary w-full"
              type="submit"
            >
              {placing ? 'Processing...' : `Add to Cart`}
            </button>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="helix-btn-primary w-full"
              type="button"
            >
              Sign in
            </button>
          )}
        </article>
      </form>

      <article className="mt-8 space-y-4">
        {/* Quote mode toggle */}
        <article className="space-y-3">
          <p className="text-[13px] text-muted">
            Wants to buy a large quantity?{' '}
          </p>
          <button
            className="flex cursor-pointer items-center hover:text-primary-dim  text-primary  gap-2"
            onClick={handleToggleToQuoteMode}
          >
            <FileText size={16} />
            <span>Request a Quote (bulk order)</span>
          </button>
        </article>
        <hr className="border-[#1A7A6E]/15" />

        <article className="space-y-3">
          <p className="text-[13px] text-muted">
            You can also add this product to your shopping list for later
          </p>

          <button
            className="flex cursor-pointer items-center hover:text-primary-dim  text-primary gap-2"
            onClick={handleAddToShoppingList}
          >
            <Truck size={16} />
            <span>Add to shopping items</span>
          </button>
        </article>
      </article>
      <CartSuccessModal
        open={showSuccess}
        setOpen={setShowSuccess}
        productName={productDetails.productName}
      />
      {showShoppingListModal && (
        <AddToShoppingListModal
          open={showShoppingListModal}
          onClose={() => setShowShoppingListModal(false)}
          productId={productDetails.id}
          productName={productDetails.productName}
          defaultQty={qtyNum}
        />
      )}
    </>
  );
}
