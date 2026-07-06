import { CreditCard } from 'lucide-react';

interface PaymentMethodsEmptyStateProps {
  onAdd: () => void;
}

export default function PaymentMethodsEmptyState({
  onAdd,
}: PaymentMethodsEmptyStateProps) {
  return (
    <div className="helix-card p-10 text-center">
      <CreditCard size={28} className="text-[#C9922A] mx-auto mb-3" />
      <div className="helix-h3 mb-2">No payment methods yet</div>
      <p className="text-[13px] text-[#9CA3AF] max-w-md mx-auto">
        Add a card, Zelle, or ACH to speed up checkout.
      </p>
      <button
        onClick={onAdd}
        className="helix-btn-primary text-sm inline-flex mt-5"
      >
        Add payment method
      </button>
    </div>
  );
}
