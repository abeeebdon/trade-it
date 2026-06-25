'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { toast } from 'sonner';

import { RootState } from '@/store/store';
import { CATS } from '@/lib/constants';

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
import PressableBtn from '@/components/buttons/PressableBtn';
import { Loader2 } from 'lucide-react';

interface ListingFormProps {
  open: boolean;
  isExporter: boolean;
  editing: ProductListingTypes | null;
  onClose: () => void;
  onSave: (listing: CreateListingPayload) => void;
  isLoading?: boolean;
}

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
  const [thumbNailPhotos, setThumbNailPhotos] = useState<File | null>(null);
  const [thumbNailPreview, setThumbNailPreview] = useState<string>();
  const {
    register,
    handleSubmit,
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
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);

  if (!open) return null;

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const newPhotos = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
  };
  const uploadThumbNail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setThumbNailPhotos(selectedFile);

    const previewUrl = URL.createObjectURL(selectedFile);
    setThumbNailPreview(previewUrl);
  };
  const existingPhotos = editing?.photos?.map((p) => p.imageUrl) ?? [];
  const getProductStatusId = (status: ListingStatus) => {
    switch (status) {
      case 'active':
        return 1;
      case 'out_of_stock':
        return 2;
      case 'archived':
        return 3;
      default:
        return 1;
    }
  };

  const onSubmit = async (data: ListingFormValues) => {
    if (!photos.length && !editing) {
      toast.error('Please upload at least one image');
      return;
    }
    const payload: CreateListingPayload = {
      UserId: Number(user?.id),
      Title: data.title,
      ThumbnailImage: thumbNailPhotos ?? null,
      Category: data.category,
      RetailPriceUsd: data.retail_price_usd,
      StockQty: data.stock_qty,
      ShipsFrom: data.ships_from,
      Description: data.description,
      ProductStatusId: getProductStatusId(data.status),
      FulfillmentMode: mode,
      Photos: photos.map((p) => p.file),
    };

    onSave(payload);
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

            <select className="helix-input" {...register('category')}>
              {CATS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

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

            <InputField
              label="Ships from"
              error={errors.ships_from?.message}
              {...register('ships_from')}
            />

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
              <label className="helix-label">ThumbNails</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={uploadThumbNail}
                className="helix-input"
              />

              {thumbNailPreview && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <Image
                    src={thumbNailPreview}
                    alt="preview"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded object-cover"
                    unoptimized
                  />
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="helix-label">Photos</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={upload}
                className="helix-input"
              />

              <div className="flex flex-wrap gap-2 mt-3">
                {existingPhotos.map((photo, index) => (
                  <Image
                    key={`existing-${index}`}
                    src={photo}
                    alt={`existing-${index}`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded object-cover"
                    unoptimized
                  />
                ))}
                {photos.length > 0 &&
                  photos.map((photo, index) => (
                    <Image
                      key={index}
                      src={photo.preview}
                      alt={`preview-${index}`}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded object-cover"
                      unoptimized
                    />
                  ))}
              </div>
            </div>

            <select className="helix-input" {...register('status')}>
              <option value="active">Active</option>
              <option value="out_of_stock">Out of stock</option>
              <option value="archived">Archived</option>
            </select>

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
              onClick={onClose}
              className="helix-btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="helix-btn-primary flex-1"
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
