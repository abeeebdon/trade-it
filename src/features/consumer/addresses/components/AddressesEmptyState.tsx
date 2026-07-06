import { MapPin } from 'lucide-react';

interface AddressesEmptyStateProps {
  onAdd: () => void;
}

export default function AddressesEmptyState({
  onAdd,
}: AddressesEmptyStateProps) {
  return (
    <div className="helix-card p-10 text-center">
      <MapPin size={28} className="text-[#C9922A] mx-auto mb-3" />
      <div className="helix-h3 mb-2">No delivery addresses yet</div>
      <p className="text-[13px] text-[#9CA3AF] max-w-md mx-auto">
        Add your first US delivery address to speed up checkout.
      </p>
      <button
        onClick={onAdd}
        className="helix-btn-primary text-sm inline-flex mt-5"
      >
        Add address
      </button>
    </div>
  );
}
