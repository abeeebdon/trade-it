import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatUSD } from '@/lib/func';
import { Eye, Pencil } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ListingFormCardProps } from '../types/sellType';
import ListingForm from './ListingForm';
import { useState } from 'react';

const ListingformCard = ({ l, handleEdit }: ListingFormCardProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleSave = () => {
    setOpen(false);
  };
  return (
    <>
      <tr>
        <td>
          {l.photos?.[0] ? (
            <Image
              src={l.photos[0].imageUrl}
              alt={l.title}
              width={56}
              height={56}
              className="w-14 h-14 rounded object-cover"
              unoptimized
            />
          ) : (
            <div className="w-14 h-14 rounded bg-[#1A7A6E]/10 flex items-center justify-center text-[10px] font-mono">
              NO IMG
            </div>
          )}
        </td>
        <td className="max-w-50 truncate">{l.title}</td>
        <td className="text-[13px] text-[#9CA3AF]">{l.category}</td>
        <td className="font-mono">{formatUSD(l.retailPriceUsd)}</td>
        <td className="font-mono">{l.stockQty}</td>
        <td>
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
        </td>
        <td>
          <StatusPill status={l.status} />
        </td>
        <td className="space-x-2">
          <button
            onClick={() => setOpen(true)}
            className="text-[#1A7A6E] hover:text-[#C9922A] transition"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => router.push(`/exporter/sell/${l.id}`)}
            className="text-[#1A7A6E] hover:text-[#C9922A] transition"
          >
            <Eye size={16} />
          </button>
        </td>
      </tr>
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

export default ListingformCard;
