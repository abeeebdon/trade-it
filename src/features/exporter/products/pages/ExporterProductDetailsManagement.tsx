'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pencil, Trash2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

import { useGetProductById, useDeleteProduct } from '../../hooks/useProducts';
import { ProductData } from '../../api/productsApi';
import { Loading } from '@/components/loading';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { getStatusId } from '../components/helpers';
import { formatUSD, formatDateTime } from '@/lib/func';
import WarningModal from '@/components/modals/WarningModal';
import BackButton from '@/components/buttons/BackButton';

export const ExporterProductDetailsManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data, isPending, isError } = useGetProductById(id ?? '');

  const product = useMemo(() => {
    return data ?? ({} as ProductData);
  }, [data]);

  const imageUrls = useMemo(() => {
    if (product.images?.length) {
      return product.images.map((img) => img.imageUrl);
    }
    return product.thumbnailImage ? [product.thumbnailImage] : [];
  }, [product]);

  const deleteMutation = useDeleteProduct(() => {
    router.push('/exporter/my-products');
  });

  const handleDelete = () => {
    if (!product.id) return;
    deleteMutation.mutate(product.id);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  if (isError || !product.id) {
    return (
      <div className="helix-card p-10 text-center">
        <p className="text-[#9CA3AF] text-sm">
          Failed to load product details. It may have been deleted or the ID is
          invalid.
        </p>
        <button
          onClick={() => router.push('/exporter/my-products')}
          className="helix-btn-primary mt-4"
        >
          Back to products
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <BackButton path="/exporter/my-products" title="Back to products" />

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/exporter/my-products/edit?id=${id}`)}
            className="helix-btn-primary inline-flex items-center gap-2"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={() => setDeleteOpen(true)}
            className="helix-btn-secondary inline-flex items-center gap-2 text-[#E74C3C] border-[#E74C3C]/30 hover:bg-[#E74C3C]/10"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Images */}
        <div className="lg:col-span-3">
          <div className="helix-card overflow-hidden">
            {product.thumbnailImage ? (
              <Image
                src={product.thumbnailImage}
                alt={product.productName}
                width={800}
                height={600}
                className="w-full aspect-4/3 object-cover"
              />
            ) : (
              <div className="w-full aspect-4/3 bg-[#1A7A6E]/10 flex items-center justify-center text-[#9CA3AF] text-sm">
                No image available
              </div>
            )}

            {/* Additional images */}
            {imageUrls.length > 0 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {imageUrls.map((url, i) => (
                  <Image
                    key={i}
                    src={url}
                    alt={`${product.productName} ${i + 1}`}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded object-cover shrink-0"
                  />
                ))}
              </div>
            )}

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="helix-status helix-status-neutral">
                  {product.category}
                </span>
                <StatusPill
                  status={
                    getStatusId(product.statusId ?? product.productStatusId) ??
                    'Draft'
                  }
                />
              </div>
              <h1 className="helix-h2">{product.productName}</h1>
              <p className="text-[15px] text-[#9CA3AF] mt-4 leading-relaxed">
                {product.description || 'No description provided.'}
              </p>
            </div>
          </div>
        </div>

        {/* Details sidebar */}
        <div className="lg:col-span-2">
          <div className="helix-card p-6">
            <h3 className="helix-h3 mb-4">Product Details</h3>

            <div className="space-y-4">
              <DetailRow
                label="Price (USD)"
                value={formatUSD(product.priceUsd)}
              />
              <DetailRow
                label="Minimum Order Quantity"
                value={String(product.moq ?? product.quantity ?? '—')}
              />
              <DetailRow
                label="Unit"
                value={product.unit ? String(product.unit) : '—'}
              />
              <DetailRow
                label="Status"
                value={
                  <StatusPill
                    status={getStatusId(product.statusId) ?? 'Draft'}
                  />
                }
              />
            </div>
          </div>
          <article className="helix-card mt-6">
            <h3></h3>
          </article>
        </div>
      </div>

      {/* Delete Confirmation */}
      <WarningModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
        label="Delete Product"
        btnText="Yes, delete"
        text={`Are you sure you want to delete "${product.productName}"? This action cannot be undone.`}
      />
    </>
  );
};

// Small helper for detail rows
const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center justify-between py-2 border-b border-[#1A7A6E]/10 last:border-0">
    <span className="text-[13px] text-[#9CA3AF]">{label}</span>
    <span className="text-[13px] font-medium text-right">{value}</span>
  </div>
);
