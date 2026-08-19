'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import PressableBtn from '@/components/buttons/PressableBtn';

interface CartSuccessModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  productName: string;
}

const CartSuccessModal = ({
  open,
  setOpen,
  productName,
}: CartSuccessModalProps) => {
  const router = useRouter();

  if (!open) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <article
        className="w-[90%] max-w-sm border border-[#1A7A6E]/30 rounded bg-bg z-9999 p-6 text-center"
        role="dialog"
      >
        <div className="flex justify-center mb-3">
          <CheckCircle size={48} className="text-green-500" />
        </div>

        <h2 className="helix-h3 text-[#F5F5F5]">Added to Cart!</h2>

        <p className="text-sm text-muted mt-2">
          <span className="font-medium text-text">{productName}</span> has been
          added to your cart.
        </p>

        <div className="flex flex-col gap-5 mt-10">
          <PressableBtn
            title="Proceed to Cart "
            className="helix-btn-primary w-full text-center flex justify-center"
            handleClick={() => router.push('/checkout')}
          />
          <PressableBtn
            title="Continue Shopping"
            className="text-sm text-muted hover:text-text flex justify-center transition-colors"
            handleClick={() => router.push('/')}
          />
        </div>
      </article>
    </section>
  );
};

export default CartSuccessModal;
