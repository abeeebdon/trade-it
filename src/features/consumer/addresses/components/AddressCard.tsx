import { Trash, Star } from 'lucide-react';
import type { Address } from '../types';

interface AddressCardProps {
  address: Address;
  onDelete: (id: string) => void;
}

export default function AddressCard({
  address: a,
  onDelete,
}: AddressCardProps) {
  return (
    <div className="helix-card p-5 flex flex-col" data-testid={`addr-${a.id}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-semibold text-[14px] flex items-center gap-1.5">
            {a.label}
            {a.is_default && (
              <Star size={13} fill="currentColor" className="text-[#C9922A]" />
            )}
          </div>
          <div className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider mt-0.5">
            {a.recipient_name}
          </div>
        </div>
        <button
          onClick={() => onDelete(a.id)}
          className="text-[#9CA3AF] hover:text-[#E74C3C]"
          data-testid={`del-addr-${a.id}`}
        >
          <Trash size={16} />
        </button>
      </div>
      <div className="text-[13px] leading-6 text-[#9CA3AF] flex-1">
        {a.line1}
        <br />
        {a.line2 && (
          <>
            {a.line2}
            <br />
          </>
        )}
        {a.city}, {a.state} {a.postal_code}
        <br />
        {a.country}
        {a.phone && (
          <>
            <br />
            <span className="font-mono text-[12px]">{a.phone}</span>
          </>
        )}
      </div>
    </div>
  );
}
