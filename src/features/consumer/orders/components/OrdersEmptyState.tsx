import Link from 'next/link';
import { Package, ArrowRight, Store } from 'lucide-react';

export default function OrdersEmptyState() {
  return (
    <div className="helix-card p-10 text-center">
      <Package size={28} className="text-[#C9922A] mx-auto mb-3" />
      <div className="helix-h3 mb-2">No orders here yet</div>
      <p className="text-[13px] text-[#9CA3AF] max-w-md mx-auto">
        When you shop on JompShop, your orders will appear here with live
        tracking from Nigeria to your door.
      </p>
      <Link
        href="/?beta=1"
        className="helix-btn-primary text-sm inline-flex items-center gap-1.5 mt-5"
      >
        <Store size={13} /> Shop now <ArrowRight size={13} />
      </Link>
    </div>
  );
}
