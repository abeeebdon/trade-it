import { Pencil, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { formatUSD } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';

import { ProductResponseType } from '../types/product';
import { getStatusId } from './helpers';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: ProductResponseType;
}

export function ProductTableRow({ product }: ProductCardProps) {
  const router = useRouter();
  return (
    <tr className="hidden md:table-row">
      <td>
        {product.thumbnailImage ? (
          <Image
            src={product.thumbnailImage}
            alt={product.productName}
            className="w-14 h-14 rounded object-cover"
            width={20}
            height={20}
          />
        ) : (
          <div className="w-14 h-14 rounded bg-muted flex items-center justify-center text-text text-[10px] font-mono">
            NO IMG
          </div>
        )}
      </td>
      <td className="max-w-xs truncate">
        <Link
          className="hover:text-primary"
          href={`/exporter/my-products/details?id=${product.id}`}
        >
          {product.productName}
        </Link>
      </td>
      <td className="text-[13px] text-muted">{product.category}</td>
      <td className="font-mono">{formatUSD(product.priceUsd)}</td>
      <td className="font-mono">{product.moq}</td>
      <td className="font-mono">{product.unit}</td>
      <td>
        <StatusPill status={getStatusId(product.statusId) ?? 'Draft'} />
      </td>
      <td>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              router.push(`/exporter/my-products/edit?id=${product.id}`)
            }
            className="text-text inline cursor-pointer hover:text-gold"
            title="Edit product"
          >
            <Pencil size={20} />
          </button>
          <Link
            className="text-text inline hover:text-primary"
            href={`/exporter/my-products/details?id=${product.id}`}
            title="View product"
          >
            <Eye size={20} />
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  return (
    <div className="helix-card p-4 md:hidden space-y-3">
      <div className="flex gap-3">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
          {product.thumbnailImage ? (
            <Image
              src={product.thumbnailImage}
              alt={product.productName}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[9px] font-mono text-text">
              NO IMG
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <Link
            href={`/exporter/my-products/details?id=${product.id}`}
            className="block truncate text-sm font-semibold hover:text-blue-700"
          >
            {product.productName}
          </Link>
          <p className="mt-1 text-[12px] text-muted">{product.category}</p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="font-mono text-sm">
              {formatUSD(product.priceUsd)}
            </span>
            <StatusPill status={getStatusId(product.statusId) ?? 'Draft'} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border-soft pt-3 text-[12px] text-muted">
        <div className="flex gap-3">
          <span>
            MOQ <span className="font-mono text-text">{product.moq}</span>
          </span>
          <span>
            Unit <span className="font-mono text-text">{product.unit}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              router.push(`/exporter/my-products/edit?id=${product.id}`)
            }
            className="text-text cursor-pointer hover:text-primary"
            title="Edit product"
          >
            <Pencil size={17} />
          </button>
          <Link
            className="text-text hover:text-primary"
            href={`/exporter/my-products/details?id=${product.id}`}
            title="View product"
          >
            <Eye size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
