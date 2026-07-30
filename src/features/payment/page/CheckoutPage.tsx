'use client';

import { useAppSelector, useAppDispatch } from '@/hooks/store/store';
import { useRouter } from 'next/navigation';
import { formatUSD } from '@/lib/func';
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  CartItem,
} from '@/store/cart/cart.slice';
import {
  Trash2,
  Minus,
  Plus,
  MapPin,
  CreditCard,
  Banknote,
  Wallet,
  ShieldCheck,
  ShoppingCart,
  ArrowLeft,
  Pencil,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import PressableBtn from '@/components/buttons/PressableBtn';
import { useGetPaymentMethods } from '@/features/consumer/payment-methods/hooks/usePaymentMethods';
import {
  resolvePaymentMethod,
  type PaymentMethod,
} from '@/features/consumer/payment-methods/types';
import { useGetAddresses } from '@/features/consumer/addresses/hooks/useAddresses';
import type { DeliveryAddress } from '@/features/consumer/addresses/types';
import DeliveryAddressModal from '../components/DeliveryAddressModal';
import AddPaymentModal from '@/features/consumer/payment-methods/components/AddPaymentModal';
import { Loading } from '@/components/loading';

// ── Static fallback payment methods ──────────────────────
const FALLBACK_PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'bank', label: 'Bank Transfer', icon: Banknote },
  { id: 'wallet', label: 'Digital Wallet', icon: Wallet },
];

// ── Map API payment type to icon ─────────────────────────
const PM_ICON: Record<string, typeof CreditCard> = {
  card: CreditCard,
  zelle: Banknote,
  ach: Wallet,
};

const CheckoutPage = () => {
  const { items } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Payment
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null,
  );
  const [paying, setPaying] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Address
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] =
    useState<DeliveryAddress | null>(null);

  // ── Queries ──────────────────────────────────────────
  const {
    data: pmData,
    isPending: pmLoading,
    isError: pmError,
  } = useGetPaymentMethods(1, 20);
  const { data: addrData, isPending: addrLoading } = useGetAddresses(1, 20);

  // Resolve payment methods
  const apiPaymentMethods: PaymentMethod[] = useMemo(
    () => pmData?.data?.data ?? (pmData as unknown as PaymentMethod[]) ?? [],
    [pmData],
  );

  const resolvedPMs = useMemo(
    () => apiPaymentMethods.map(resolvePaymentMethod),
    [apiPaymentMethods],
  );

  // Resolve addresses + auto-select default or first
  const addresses: DeliveryAddress[] = useMemo(
    () =>
      addrData?.data?.data ?? (addrData as unknown as DeliveryAddress[]) ?? [],
    [addrData],
  );

  const displayAddress: DeliveryAddress | null = useMemo(() => {
    if (selectedAddress) return selectedAddress;
    if (addresses.length === 0) return null;
    return addresses.find((a) => a.isDefault) ?? addresses[0];
  }, [addresses, selectedAddress]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.priceUsd * item.quantity,
    0,
  );
  const shippingFee = subtotal > 0 ? 25 : 0; // flat shipping fee
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
    if (selectedPaymentId === null) {
      toast.error('Please select a payment method');
      return;
    }
    setPaying(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      dispatch(clearCart());
      toast.success('Payment successful! Your order has been placed.');
      router.push('/');
    } catch {
      toast.error('Payment failed. Please try again.');
    } finally {
      setPaying(false);
    }
  };

  // ── Empty cart ──────────────────────────────────────────
  if (items.length === 0) {
    return (
      <article className="flex flex-col items-center justify-center gap-4 h-[60vh]">
        <ShoppingCart size={48} className="text-muted" />
        <h2 className="helix-h2 text-text">Your cart is empty</h2>
        <p className="text-muted text-sm">
          Looks like you haven&apos;t added anything yet.
        </p>
        <PressableBtn
          handleClick={() => router.push('/')}
          title="Browse Products"
          className="helix-btn-primary"
        />
      </article>
    );
  }

  return (
    <section className="max-w-5xl mx-auto">
      {/* Back link */}
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-1 text-sm text-muted hover:text-text mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Continue Shopping
      </button>

      <h1 className="helix-h1 mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ── LEFT: Cart Items & Delivery ─────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cart Items */}
          <article className="helix-card p-6">
            <h2 className="helix-h3 mb-4">Cart Items ({items.length})</h2>
            <div className="divide-y divide-border">
              {items.map((item: CartItem) => (
                <div
                  key={item.productId}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-md bg-secondary/10 shrink-0 overflow-hidden">
                    {item.thumbnailImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.thumbnailImage}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                        No img
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-text text-sm truncate">
                      {item.productName}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">
                      {item.description?.slice(0, 80)}
                      {item.description?.length > 80 ? '...' : ''}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity - 1,
                          )
                        }
                        className="w-7 h-7 rounded border border-secondary/30 flex items-center justify-center text-muted hover:text-text transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-6 text-center text-text">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity + 1,
                          )
                        }
                        className="w-7 h-7 rounded border border-secondary/30 flex items-center justify-center text-muted hover:text-text transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <p className="font-mono text-primary text-sm mt-1">
                      {formatUSD(item.priceUsd * item.quantity)}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => handleRemove(item.productId)}
                    className="text-muted hover:text-danger transition-colors self-start"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </article>

          {/* Delivery Address */}
          <article className="helix-card p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="helix-h3 flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                Delivery Address
              </h2>
              <button
                type="button"
                onClick={() => setShowAddressModal(true)}
                className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1"
              >
                <Pencil size={14} />
                {displayAddress ? 'Change' : 'Add'}
              </button>
            </div>

            {addrLoading ? (
              <div className="flex justify-center py-3">
                <Loading />
              </div>
            ) : displayAddress ? (
              <div className="text-sm text-muted space-y-1">
                <p className="text-text font-medium">
                  {displayAddress.recipientName}
                </p>
                <p>
                  {[
                    displayAddress.addressLine1,
                    displayAddress.addressLine2,
                    displayAddress.city,
                    displayAddress.state,
                    displayAddress.postalCode,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </p>
                {displayAddress.phoneNumber && (
                  <p>{displayAddress.phoneNumber}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted">
                No delivery address. Click &quot;Add&quot; to create one.
              </p>
            )}
          </article>
        </div>

        {/* ── RIGHT: Summary & Payment ────────────────────── */}
        <aside className="space-y-6">
          {/* Order Summary */}
          <article className="helix-card p-6">
            <h2 className="helix-h3 mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>{formatUSD(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span>{formatUSD(shippingFee)}</span>
              </div>
              <hr className="border-border my-2" />
              <div className="flex justify-between font-semibold text-text text-base">
                <span>Total</span>
                <span className="text-primary">{formatUSD(total)}</span>
              </div>
            </div>
          </article>

          {/* Payment Methods */}
          <article className="helix-card p-6">
            <h2 className="helix-h3 mb-4">Payment Method</h2>

            {pmLoading ? (
              <div className="flex justify-center py-3">
                <Loading />
              </div>
            ) : pmError || resolvedPMs.length === 0 ? (
              /* ── No payment methods from API — show fallback + add button ── */
              <div>
                <div className="space-y-2 mb-4">
                  {FALLBACK_PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                    <label
                      key={id}
                      className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${
                        selectedPaymentId === null && id === 'card'
                          ? 'border-primary bg-primary/8'
                          : 'border-secondary/30 hover:border-secondary/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={id}
                        defaultChecked={id === 'card'}
                        onChange={() => setSelectedPaymentId(null)}
                        className="accent-primary"
                      />
                      <Icon size={18} className="text-muted" />
                      <span className="text-sm text-text">{label}</span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  className="helix-btn-secondary w-full text-sm"
                >
                  + Add payment method
                </button>
                <p className="text-[11px] text-muted mt-2 text-center">
                  Add a real payment method for faster checkout.
                </p>
              </div>
            ) : (
              /* ── API payment methods ── */
              <div className="space-y-2">
                {resolvedPMs.map((pm) => {
                  const Icon = PM_ICON[pm.kind] ?? CreditCard;
                  return (
                    <label
                      key={pm.id}
                      className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${
                        selectedPaymentId === pm.id
                          ? 'border-primary bg-primary/8'
                          : 'border-secondary/30 hover:border-secondary/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={pm.id}
                        checked={selectedPaymentId === pm.id}
                        onChange={() => setSelectedPaymentId(pm.id)}
                        className="accent-primary"
                      />
                      <Icon size={18} className="text-muted" />
                      <div>
                        <span className="text-sm text-text">{pm.label}</span>
                        {pm.isDefault && (
                          <span className="text-[10px] text-primary ml-2 font-medium">
                            Default
                          </span>
                        )}
                      </div>
                    </label>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  + Add another
                </button>
              </div>
            )}
          </article>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={paying || items.length === 0}
            className="helix-btn-primary w-full flex items-center justify-center gap-2"
          >
            {paying ? (
              'Processing...'
            ) : (
              <>
                <ShieldCheck size={18} />
                Pay {formatUSD(total)}
              </>
            )}
          </button>

          <p className="text-[11px] text-muted text-center">
            Payments are secured and encrypted.{' '}
            {user
              ? `Logged in as ${user.email}`
              : 'Sign in to complete payment.'}
          </p>
        </aside>
      </div>

      {/* ── Modals ────────────────────────────────────── */}
      <DeliveryAddressModal
        open={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        selectedId={displayAddress?.id ?? null}
        onSelect={setSelectedAddress}
      />

      {showPaymentModal && (
        <AddPaymentModal onClose={() => setShowPaymentModal(false)} />
      )}
    </section>
  );
};

export default CheckoutPage;
