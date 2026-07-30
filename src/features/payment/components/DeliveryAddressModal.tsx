'use client';

import { useState } from 'react';
import { X, MapPin, Plus, Star } from 'lucide-react';
import { useGetAddresses } from '@/features/consumer/addresses/hooks/useAddresses';
import AddAddressModal from '@/features/consumer/addresses/components/AddAddressModal';
import type { DeliveryAddress } from '@/features/consumer/addresses/types';
import { Loading } from '@/components/loading';

interface DeliveryAddressModalProps {
  open: boolean;
  onClose: () => void;
  selectedId?: number | null;
  onSelect: (address: DeliveryAddress) => void;
}

export default function DeliveryAddressModal({
  open,
  onClose,
  selectedId,
  onSelect,
}: DeliveryAddressModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const { data, isPending, isError } = useGetAddresses(1, 20);

  if (!open) return null;

  const addresses: DeliveryAddress[] =
    data?.data?.data ?? (data as unknown as DeliveryAddress[]) ?? [];

  const handleSelect = (addr: DeliveryAddress) => {
    onSelect(addr);
    onClose();
  };

  // ── Show add-address form ──────────────────────────
  if (showAddForm) {
    return <AddAddressModal onClose={() => setShowAddForm(false)} />;
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <article className="w-[90%] max-w-md border border-border rounded bg-bg z-9999 p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="helix-h3">Select Delivery Address</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-text transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Loading */}
        {isPending && (
          <div className="flex justify-center py-8">
            <Loading />
          </div>
        )}

        {/* Error */}
        {isError && !isPending && (
          <p className="text-danger text-sm text-center py-4">
            Failed to load addresses. Please try again.
          </p>
        )}

        {/* No addresses — prompt to add */}
        {!isPending && !isError && addresses.length === 0 && (
          <div className="text-center py-6">
            <MapPin size={32} className="text-muted mx-auto mb-3" />
            <p className="text-muted text-sm mb-4">
              You haven&apos;t added any delivery addresses yet.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="helix-btn-primary text-sm inline-flex items-center gap-1"
            >
              <Plus size={14} /> Add Address
            </button>
          </div>
        )}

        {/* Address list */}
        {!isPending && !isError && addresses.length > 0 && (
          <>
            <div className="space-y-2 mb-4">
              {addresses.map((addr) => (
                <button
                  key={addr.id}
                  type="button"
                  onClick={() => handleSelect(addr)}
                  className={`w-full text-left p-3 rounded border transition-colors ${
                    selectedId === addr.id
                      ? 'border-primary bg-primary/8'
                      : 'border-border hover:border-secondary/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text flex items-center gap-1.5">
                        {addr.label}
                        {addr.isDefault && (
                          <Star
                            size={12}
                            fill="currentColor"
                            className="text-primary shrink-0"
                          />
                        )}
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        {addr.recipientName}
                      </p>
                      <p className="text-xs text-muted truncate">
                        {[
                          addr.addressLine1,
                          addr.addressLine2,
                          addr.city,
                          addr.state,
                          addr.postalCode,
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                      {addr.phoneNumber && (
                        <p className="text-xs text-muted">{addr.phoneNumber}</p>
                      )}
                    </div>
                    {selectedId === addr.id && (
                      <span className="text-primary text-[11px] font-semibold shrink-0 mt-0.5">
                        Selected
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAddForm(true)}
              className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1"
            >
              <Plus size={14} /> Add new address
            </button>
          </>
        )}
      </article>
    </section>
  );
}
