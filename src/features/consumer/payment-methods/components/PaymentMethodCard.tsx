import { Trash, CreditCard, Landmark } from 'lucide-react';
import type { PaymentMethod } from '../types';

interface PaymentMethodCardProps {
  pm: PaymentMethod;
  onDelete: (id: string) => void;
}

export default function PaymentMethodCard({
  pm,
  onDelete,
}: PaymentMethodCardProps) {
  return (
    <div
      className="helix-card p-5 flex items-center gap-4"
      data-testid={`pm-${pm.id}`}
    >
      <div className="w-11 h-11 rounded-lg bg-[#1A7A6E]/10 flex items-center justify-center text-[#C9922A]">
        {pm.kind === 'card' ? <CreditCard size={20} /> : <Landmark size={20} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[14px]">{pm.label}</div>
        <div className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider mt-0.5">
          {pm.kind}
          {pm.exp_month &&
            pm.exp_year &&
            ` · Exp ${String(pm.exp_month).padStart(2, '0')}/${String(pm.exp_year).slice(-2)}`}
          {pm.is_default && (
            <span className="ml-2 text-[#C9922A]">DEFAULT</span>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(pm.id)}
        className="text-[#9CA3AF] hover:text-[#E74C3C]"
        data-testid={`del-pm-${pm.id}`}
      >
        <Trash size={16} />
      </button>
    </div>
  );
}
