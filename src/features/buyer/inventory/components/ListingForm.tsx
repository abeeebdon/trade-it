'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ListingFormProps } from '../../types/buyers';
import { listingSchema } from './validation';
import InputField from '@/components/form/InputFIeld';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useGetProductCategories } from '@/features/exporter/hooks/useProducts';
import { toast } from 'sonner';
import { useCreateLocalListing } from '../hooks/useGetInventory';
import { CreateLocalListingPayload } from '../types/inventory';

type ListingFormData = z.infer<typeof listingSchema>;

function ListingForm({ editing, onClose }: ListingFormProps) {
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
  });
  const { data, refetch, isPending } = useGetProductCategories({
    pageNumber: 1,
    pageSize: 10,
  });
  const categoryArray = useMemo(() => {
    return data ? data.data : [];
  }, [data]);
  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const newPhotos = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
  };
  const { mutateAsync } = useCreateLocalListing();
  console.log(errors);
  const onSubmit = async (data: ListingFormData) => {
    console.log(data);
    const photoArray = photos.map((ph) => ph.file);
    if (photoArray.length < 1) {
      toast.error('Please select a photo');
      return;
    }
    const payload: CreateLocalListingPayload = { ...data, Photos: photoArray };
    await mutateAsync(payload);
  };

  return (
    <div
      className="fixed inset-0 bg-[#0A1628]/80 flex items-start justify-center p-4 pb-10 overflow-y-auto z-50"
      onClick={onClose}
    >
      <div
        className="helix-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="helix-h3">
          {editing ? 'Edit Listing' : 'Create Listing'}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 grid md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <InputField
              label="Title"
              placeholder="Product title"
              {...register('Title')}
              error={errors.Title?.message}
            />
          </div>

          <div>
            <label className="helix-label">Category</label>

            <select className="helix-input" {...register('Category')}>
              {categoryArray.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <p className="text-xs text-red-500 mt-1">
              {errors.Category?.message}
            </p>
          </div>

          <InputField
            label="Retail Price (USD)"
            type="number"
            {...register('RetailPriceUsd')}
            error={errors.RetailPriceUsd?.message}
          />

          <InputField
            label="Stock Quantity"
            type="number"
            {...register('StockQty')}
            error={errors.StockQty?.message}
          />

          <InputField
            label="Ships From"
            {...register('ShipsFrom')}
            error={errors.ShipsFrom?.message}
          />

          <div className="md:col-span-2">
            <label className="helix-label">Description</label>

            <textarea
              rows={5}
              className="helix-input"
              {...register('Description')}
            />

            <p className="text-xs text-red-500 mt-1">
              {errors.Description?.message}
            </p>
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

            <div className="flex gap-2 mt-3 flex-wrap">
              {photos.map((photo, index) => (
                <Image
                  width={60}
                  height={60}
                  key={index}
                  src={photo.preview}
                  alt=""
                  className="w-16 h-16 rounded object-cover"
                />
              ))}
            </div>
          </div>

          <div>
            <label className="helix-label">Status</label>

            <select
              className="helix-input"
              {...register('LocalListingStatusId')}
            >
              <option value={1}>Active</option>

              <option value={2}>Out of Stock</option>

              <option value={3}>Archived</option>
            </select>
          </div>

          <div className="md:col-span-2 flex gap-3 mt-4">
            <button
              type="button"
              className="helix-btn-secondary flex-1"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="helix-btn-primary flex-1"
            >
              {isSubmitting ? 'Saving...' : 'Save Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ListingForm;
