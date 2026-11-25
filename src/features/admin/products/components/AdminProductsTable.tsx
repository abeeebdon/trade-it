import Image from 'next/image';
import { ImageOff } from 'lucide-react';

import { cn } from '@/lib/cn';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatUSD } from '@/lib/func';
import { AdminProduct } from '../types/product';
import { productStatusLabel } from '../utils';

const headCell =
  'border-b border-border bg-bg px-3.5 py-2.5 text-left font-mono text-[10px] font-medium tracking-[0.12em] text-muted uppercase whitespace-nowrap';

const cell =
  'border-b border-border/50 px-3.5 py-2.5 text-[12px] text-text align-middle';

function ProductThumbnail({ product }: { product: AdminProduct }) {
  if (!product.thumbnailImage) {
    return (
      <div className="size-9 rounded-lg bg-bg-soft border border-border flex items-center justify-center text-muted">
        <ImageOff size={14} />
      </div>
    );
  }

  return (
    <Image
      src={product.thumbnailImage}
      alt={product.productName}
      width={36}
      height={36}
      className="size-9 rounded-lg object-cover border border-border"
    />
  );
}

export function AdminProductsTable({ products }: { products: AdminProduct[] }) {
  return (
    <div className="hidden md:block overflow-hidden rounded-lg border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className={headCell}>Product</th>
              <th className={headCell}>Category</th>
              <th className={headCell}>Price</th>
              <th className={headCell}>MOQ</th>
              <th className={headCell}>Unit</th>
              <th className={headCell}>Source</th>
              <th className={headCell}>Status</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child_td]:border-b-0">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition-colors hover:bg-primary/5"
              >
                <td className={cell}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <ProductThumbnail product={product} />
                    <div className="min-w-0">
                      <p className="font-medium text-text truncate max-w-56">
                        {product.productName}
                      </p>
                      <p className="text-[10px] text-muted font-mono">
                        #{product.id}
                        {product.sellerId
                          ? ` · Seller ${product.sellerId}`
                          : ''}
                      </p>
                    </div>
                  </div>
                </td>
                <td className={cn(cell, 'text-muted')}>{product.category}</td>
                <td className={cn(cell, 'font-mono text-primary')}>
                  {formatUSD(product.priceUsd)}
                </td>
                <td className={cn(cell, 'font-mono')}>{product.moq}</td>
                <td className={cn(cell, 'font-mono')}>{product.unit}</td>
                <td className={cell}>
                  <span className="helix-status helix-status-neutral">
                    {product.sourceType ?? '—'}
                  </span>
                </td>
                <td className={cell}>
                  <StatusPill status={productStatusLabel(product.statusId)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminProductMobileCard({ product }: { product: AdminProduct }) {
  return (
    <section className="helix-card p-4 block transition-colors">
      <div className="flex gap-3">
        <div className="shrink-0">
          <ProductThumbnail product={product} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold text-text truncate">
                {product.productName}
              </h3>
              <p className="text-[11px] text-muted mt-0.5">
                #{product.id} · {product.category}
              </p>
            </div>
            <StatusPill status={productStatusLabel(product.statusId)} />
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="font-mono text-[12px] text-primary font-semibold">
              {formatUSD(product.priceUsd)}
            </span>
            <span className="text-[11px] text-muted">
              MOQ: {product.moq} · Unit: {product.unit}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
