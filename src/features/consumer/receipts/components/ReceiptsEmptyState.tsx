import { Receipt } from 'lucide-react';

export default function ReceiptsEmptyState() {
  return (
    <div className="helix-card p-10 text-center">
      <Receipt size={28} className="text-[#C9922A] mx-auto mb-3" />
      <div className="helix-h3 mb-2">No receipts yet</div>
      <p className="text-[13px] text-[#9CA3AF] max-w-md mx-auto">
        Once your first order clears escrow, your receipt will show here.
      </p>
    </div>
  );
}
