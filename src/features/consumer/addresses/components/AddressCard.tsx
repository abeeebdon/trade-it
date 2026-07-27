'use client';

import { useState } from 'react';
import { Trash, Star, Eye } from 'lucide-react';
import ViewAddressModal from './ViewAddressModal';
import type { Address } from '../types';

interface AddressCardProps {
  address: Address;
  onDelete: (id: number) => void;
  onSetDefault?: (id: number) => void;
}

export default function AddressCard({
  address: a,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  const [viewing, setViewing] = useState(false);

  return (
    <>
      <div className="helix-card p-5 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="font-semibold text-[14px] flex items-center gap-1.5">
              {a.label}
              {a.isDefault && (
                <Star
                  size={13}
                  fill="currentColor"
                  className="text-[#C9922A]"
                />
              )}
            </div>
            <div className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider mt-0.5">
              {a.recipientName}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewing(true)}
              className="text-[#9CA3AF] hover:text-[#1A7A6E]"
              data-testid={`view-addr-${a.id}`}
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => onDelete(a.id)}
              className="text-[#9CA3AF] hover:text-[#E74C3C]"
              data-testid={`del-addr-${a.id}`}
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
        <div className="text-[13px] leading-6 text-[#9CA3AF] flex-1">
          {a.addressLine1}
          <br />
          {a.addressLine2 && (
            <>
              {a.addressLine2}
              <br />
            </>
          )}
          {a.city}, {a.state} {a.postalCode}
          {a.phoneNumber && (
            <>
              <br />
              <span className="font-mono text-[12px]">{a.phoneNumber}</span>
            </>
          )}
        </div>
        {!a.isDefault && onSetDefault && (
          <button
            onClick={() => onSetDefault(a.id)}
            className="text-[11px] text-[#C9922A] hover:underline mt-3 self-start"
            data-testid={`set-default-${a.id}`}
          >
            Set as default
          </button>
        )}
      </div>

      {viewing && (
        <ViewAddressModal address={a} onClose={() => setViewing(false)} />
      )}
    </>
  );
}
