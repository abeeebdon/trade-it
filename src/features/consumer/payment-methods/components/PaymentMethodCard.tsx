import { Trash, CreditCard, Landmark } from 'lucide-react';
import type { PaymentMethod } from '../types';
import { resolvePaymentMethod } from '../types';
import WarningModal from '@/components/modals/WarningModal';
import { useState } from 'react';
import { useDeletePaymentMethod } from '../hooks/usePaymentMethods';

interface PaymentMethodCardProps {
  pm: PaymentMethod;
}

export default function PaymentMethodCard({ pm }: PaymentMethodCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutate: remove, isPending: deleting } = useDeletePaymentMethod();

  const resolved = resolvePaymentMethod(pm);

  const confirmDelete = () => {
    remove(String(pm.id));
  };
  return (
    <>
      <div
        className="helix-card p-5 flex items-center gap-4"
        data-testid={`pm-${pm.id}`}
      >
        <div className="w-11 h-11 rounded-lg bg-[#1A7A6E]/10 flex items-center justify-center text-[#C9922A]">
          {resolved.kind === 'card' ? (
            <CreditCard size={20} />
          ) : (
            <Landmark size={20} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[14px]">{resolved.label}</div>
          <div className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider mt-0.5">
            {resolved.kind}
            {pm.expiryMonth &&
              pm.expiryYear &&
              ` · Exp ${String(pm.expiryMonth).padStart(2, '0')}/${String(pm.expiryYear).slice(-2)}`}
            {pm.isDefault && (
              <span className="ml-2 text-[#C9922A]">DEFAULT</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-[#9CA3AF] hover:text-[#E74C3C]"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      <WarningModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        loading={deleting}
        label="Remove payment method"
        text="Are you sure you want to remove this payment method? This action cannot be undone."
        btnText="Remove"
      />
    </>
  );
}
