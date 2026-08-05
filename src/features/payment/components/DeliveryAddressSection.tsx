'use client';

import { MapPin, Pencil } from 'lucide-react';
import { Loading } from '@/components/loading';
import type { DeliveryAddress } from '@/features/consumer/addresses/types';
import DeliveryAddressModal from './DeliveryAddressModal';
import { useMemo, useState } from 'react';
import { useGetAddresses } from '@/features/consumer/addresses/hooks/useAddresses';

const DeliveryAddressSection = () => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] =
    useState<DeliveryAddress | null>(null);

  const { data: addrData, isPending: isLoading } = useGetAddresses(1, 20);

  const addresses: DeliveryAddress[] = useMemo(
    () =>
      addrData?.data?.data ?? (addrData as unknown as DeliveryAddress[]) ?? [],
    [addrData],
  );

  const displayAddress: DeliveryAddress | null = useMemo(() => {
    if (selectedAddress) return selectedAddress;
    if (addresses.length === 0) return null;
    return addresses.find((a) => a.isDefault) ?? addresses[0];
  }, [addresses, selectedAddress]);
  const onChangeClick = () => setShowAddressModal(true);

  return (
    <>
      <article className="helix-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="helix-h3 flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            Delivery Address
          </h2>
          <button
            type="button"
            onClick={onChangeClick}
            className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1"
          >
            <Pencil size={14} />
            {displayAddress ? 'Change' : 'Add'}
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-3">
            <Loading />
          </div>
        ) : displayAddress ? (
          <div className="text-sm text-muted space-y-1">
            <p className="text-text font-medium">
              {displayAddress.recipientName}
            </p>
            <p>
              {[
                displayAddress.addressLine1,
                displayAddress.addressLine2,
                displayAddress.city,
                displayAddress.state,
                displayAddress.postalCode,
              ]
                .filter(Boolean)
                .join(', ')}
            </p>
            {displayAddress.phoneNumber && <p>{displayAddress.phoneNumber}</p>}
          </div>
        ) : (
          <p className="text-sm text-muted">
            No delivery address. Click &quot;Add&quot; to create one.
          </p>
        )}
      </article>
      <DeliveryAddressModal
        open={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        selectedId={displayAddress?.id ?? null}
        onSelect={setSelectedAddress}
      />
    </>
  );
};
export default DeliveryAddressSection;
