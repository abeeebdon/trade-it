'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { RootState } from '@/store/store';

import type {
  FulfillmentMode,
  ListingStatus,
  CreateListingPayload,
} from '../../types/exporter';
import { ProductListingTypes } from '../types/sellType';
import { useForm, type Resolver } from 'react-hook-form';
import { ListingFormValues, listingSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/form/InputFIeld';
import SelectField from '@/components/form/SelectField';
import ImageUploader, { type ImageItem } from '@/components/form/ImageUploader';
import { Loader2 } from 'lucide-react';
import { useGetProductCategories } from '../../hooks/useProducts';

interface ListingFormProps {
  open: boolean;
  isExporter: boolean;
  editing: ProductListingTypes | null;
  onClose: () => void;
  onSave: (listing: CreateListingPayload) => void;
  isLoading?: boolean;
}

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft', id: 1 },
  { value: 'active', label: 'Active', id: 2 },
  { value: 'out_of_stock', label: 'Out of stock', id: 2 },
  { value: 'archived', label: 'Archived', id: 3 },
] as const;

export default function ListingForm({
  open,
  isExporter,
  editing,
  onClose,
  onSave,
  isLoading = false,
}: ListingFormProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const mode: FulfillmentMode = isExporter ? 'riby_dtc' : 'buyer_local';
  const [thumbnails, setThumbnails] = useState<ImageItem[]>(
    editing?.thumbnailImage
      ? [{ id: 'existing-thumbnail', url: editing.thumbnailImage }]
      : [],
  );
  const { data: categories, isPending: catPending } = useGetProductCategories();
  const catData = categories?.data;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema) as Resolver<ListingFormValues>,
    defaultValues: {
      title: editing?.title ?? '',
      description: editing?.description ?? '',
      category: editing?.category ?? '',
      retail_price_usd: editing?.retailPriceUsd,
      stock_qty: editing?.stockQty,
      ships_from: editing?.shipsFrom ?? '',
    },
  });
  const [photos, setPhotos] = useState<ImageItem[]>(
    editing?.photos?.map((p) => ({
      id: `existing-${p.id}`,
      url: p.imageUrl,
    })) ?? [],
  );

  if (!open) return null;

  const onSubmit = async (data: ListingFormValues) => {
    if (!photos.length && !editing) {
      toast.error('Please upload at least one image');
      return;
    }
    const payload: CreateListingPayload = {
      UserId: Number(user?.id),
      Title: data.title,
      ThumbnailImage: thumbnails[0]?.file ?? null,
      Category: data.category,
      RetailPriceUsd: data.retail_price_usd,
      StockQty: data.stock_qty,
      ShipsFrom: data.ships_from,
      Description: data.description,
      ProductStatusId: Number(data.status),
      FulfillmentMode: mode,
      Photos: photos.map((p) => p.file).filter((f): f is File => Boolean(f)),
    };

    onSave(payload);
    reset();
  };
  const handleClose = () => {
    reset();
    setThumbnails([]);
    setPhotos([]);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A1628]/80 backdrop-blur flex items-start justify-center overflow-y-auto p-4 pt-10 pb-10"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="helix-card w-full max-w-2xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto"
        data-testid="listing-form"
      >
        <h2 className="helix-h3">
          {editing
            ? 'Edit listing'
            : `New ${
                mode === 'riby_dtc' ? 'direct-from-Africa' : 'US in-stock'
              } listing`}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <InputField
              label="Title"
              placeholder="e.g. Hand-Dyed Adire Fabric Set"
              error={errors.title?.message}
              {...register('title')}
            />
            <div>
              <label className="helix-label">Category</label>
              <select className="helix-input" {...register('category')}>
                {catData?.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label="Retail price (USD)"
              type="number"
              error={errors.retail_price_usd?.message}
              {...register('retail_price_usd')}
            />

            <InputField
              label="Stock qty"
              type="number"
              error={errors.stock_qty?.message}
              {...register('stock_qty')}
            />
            <div className="md:col-span-2">
              {' '}
              <InputField
                label="Ships from"
                error={errors.ships_from?.message}
                {...register('ships_from')}
              />
            </div>

            <div className="md:col-span-2">
              <label className="helix-label">Description</label>
              <textarea
                className="helix-input h-24"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="helix-label">Thumbnail</label>
              <ImageUploader
                value={thumbnails}
                onChange={setThumbnails}
                maxImages={1}
              />
            </div>
            <div className="md:col-span-2">
              <label className="helix-label">Photos</label>
              <ImageUploader
                value={photos}
                onChange={setPhotos}
                maxImages={10}
              />
            </div>

            <SelectField
              label="Status"
              error={errors.status?.message}
              {...register('status')}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.id}>
                  {option.label}
                </option>
              ))}
            </SelectField>

            <div>
              <label className="helix-label">Fulfillment mode</label>
              <div className="helix-input bg-[#0A1628]/60 text-[#9CA3AF] cursor-default select-none">
                {mode === 'riby_dtc'
                  ? 'DTC · RIBY (from Africa)'
                  : 'LOCAL · 48HR (US stock)'}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="helix-btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="helix-btn-primary flex-1 justify-center"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Save listing'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
