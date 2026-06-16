import { Eye, Pencil } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { MobileListingCardProps } from '../types/sellType';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatUSD } from '@/lib/func';
import { useRouter } from 'next/navigation';
import { CreateListingPayload } from '../../types/exporter';
import { useEditListing } from '../../hooks/useListings';
import ListingForm from './ListingForm';

const MobileListingCard = ({ l }: MobileListingCardProps) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: editListingMutation } = useEditListing();
  const router = useRouter();
  const handleSave = async (payload: CreateListingPayload) => {
    await editListingMutation({
      id: l.id,
      payload,
    });
    setOpen(false);
  };
  return (
    <>
      <div className="helix-card p-4 space-y-4">
        <div className="flex gap-4">
          {l.photos?.[0] ? (
            <Image
              src={l.photos[0].imageUrl}
              alt={l.title}
              width={80}
              height={80}
              className="w-20 h-20 rounded-lg object-cover shrink-0"
              unoptimized
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-[#1A7A6E]/10 flex items-center justify-center text-[10px] font-mono shrink-0">
              NO IMG
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm truncate">{l.title}</h3>
            <p className="text-xs text-[#9CA3AF] mt-1">{l.category}</p>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <StatusPill status={l.status} />
              <span
                className={`helix-status ${
                  l.deliveryPartnerOfRecord === 'riby_dtc'
                    ? 'helix-status-gold'
                    : 'helix-status-ok'
                }`}
              >
                {l.deliveryPartnerOfRecord === 'riby_dtc'
                  ? 'DTC · RIBY'
                  : 'LOCAL · 48HR'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-xs text-[#9CA3AF]">Price</p>
            <p className="font-semibold font-mono">
              {formatUSD(l.retailPriceUsd)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#9CA3AF]">Stock</p>
            <p className="font-semibold font-mono">{l.stockQty}</p>
          </div>
        </div>

        <button
          onClick={() => {
            setOpen(true);
          }}
          className="helix-btn-secondary w-full inline-flex items-center justify-center gap-2"
        >
          <Pencil size={15} />
          Edit
        </button>
        <button
          onClick={() => {
            router.push(`/exporter/sell/${l.id}`);
          }}
          className="helix-btn-secondary w-full inline-flex items-center justify-center gap-2"
        >
          <Eye size={15} />
          View Details
        </button>
      </div>
      <ListingForm
        open={open}
        isExporter={true}
        editing={l}
        onClose={() => {
          setOpen(false);
        }}
        onSave={handleSave}
      />
    </>
  );
};

export default MobileListingCard;
