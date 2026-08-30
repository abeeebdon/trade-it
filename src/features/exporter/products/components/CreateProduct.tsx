'use client';

import { useMemo } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  productSchema,
  ProductFormValues,
} from '@/features/authentication/components/validation';
import {
  useCreateProduct,
  useGetProductCategories,
} from '../../hooks/useProducts';
import InputField from '@/components/form/InputFIeld';
import ImageUploader, { type ImageItem } from '@/components/form/ImageUploader';
import { UNITS, STATUSES } from '@/lib/constants';
import BackButton from '@/components/buttons/BackButton';
import Loader from '@/components/buttons/Loader';

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      currencyId: 1,
    },
  });

  const { mutate: submitProduct, isPending } = useCreateProduct();

  const { data: categoryData, isPending: categoriesLoading } =
    useGetProductCategories();

  const categories = useMemo(
    () => categoryData?.data ?? [],
    [categoryData?.data],
  );

  // Watched values for live UI updates
  const thumbnailPreview =
    useWatch({ control, name: 'thumbnailPreview' }) ?? null;
  const imagePreviews = useWatch({ control, name: 'imagePreviews' }) ?? [];

  // File handlers

  const thumbnailItems: ImageItem[] = thumbnailPreview
    ? [
        {
          id: 'thumbnail',
          url: thumbnailPreview,
          file: getValues('thumbnail') ?? undefined,
        },
      ]
    : [];

  const handleThumbnailChange = (items: ImageItem[]) => {
    const item = items[0];
    setValue('thumbnail', item?.file ?? null, { shouldValidate: true });
    setValue('thumbnailPreview', item?.url ?? null);
  };

  const imageItems: ImageItem[] = imagePreviews.map((url, i) => ({
    id: `image-${i}`,
    url,
    file: getValues('images')?.[i] ?? undefined,
  }));

  const handleImagesChange = (items: ImageItem[]) => {
    setValue(
      'images',
      items.map((i) => i.file).filter((f): f is File => !!f),
      { shouldValidate: true },
    );
    setValue(
      'imagePreviews',
      items.map((i) => i.url),
    );
  };

  // Submit
  const onSubmit = (values: ProductFormValues) => {
    submitProduct({
      Name: values.name,
      Category: values.category,
      Unit: values.unitId,
      quantity: Number(values.quantity),
      PriceUsd: values.price_usd,
      Moq: values.moq,
      Description: values.description,
      CurrencyId: values.currencyId,
      StatusId: values.statusId,
      ThumbnailImage: values.thumbnail ?? null,
      Images: values.images,
    });
  };
  return (
    <section className="w-full max-w-2xl">
      <BackButton />

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="mt-5 grid md:grid-cols-2 gap-4"
        noValidate
      >
        {/* Name */}
        <div className="md:col-span-2">
          <InputField
            label="Name"
            placeholder="e.g. Premium Sesame Seeds"
            error={errors.name?.message}
            data-testid="pf-name"
            {...register('name')}
          />
        </div>

        {/* Category */}
        <div>
          <label className="helix-label">Category</label>
          {categoriesLoading ? (
            <div className="helix-input h-10 animate-pulse opacity-40" />
          ) : (
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select {...field} className="helix-input" data-testid="pf-cat">
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            />
          )}
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Unit */}
        <div>
          <label className="helix-label">Unit</label>
          <Controller
            name="unitId"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="helix-input"
              >
                {UNITS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.unitId && (
            <p className="text-red-500 text-xs mt-1">{errors.unitId.message}</p>
          )}
        </div>
        <div>
          <InputField
            label="Quantity"
            type="number"
            placeholder="Enter the quantity available"
            error={errors.quantity?.message}
            {...register('quantity', { valueAsNumber: true })}
          />
        </div>

        {/* Price */}
        <div>
          <InputField
            label="Price (USD)"
            type="number"
            placeholder="0.00"
            error={errors.price_usd?.message}
            {...register('price_usd', { valueAsNumber: true })}
          />
        </div>

        {/* MOQ */}
        <InputField
          label="Minimum Order Quantity (MOQ)"
          type="number"
          placeholder="10"
          error={errors.moq?.message}
          {...register('moq', { valueAsNumber: true })}
        />

        {/* Status */}
        <div>
          <label className="helix-label">Status</label>
          <Controller
            name="statusId"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="helix-input"
              >
                {STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="helix-label">Description</label>
          <textarea
            className={`helix-input h-24 ${
              errors.description ? 'border-red-500' : ''
            }`}
            placeholder="Describe your product for international buyers..."
            {...register('description')}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Thumbnail */}
        <div className="md:col-span-2">
          <label className="helix-label">Thumbnail Image</label>
          <ImageUploader
            value={thumbnailItems}
            onChange={handleThumbnailChange}
            maxImages={1}
          />
        </div>

        {/* Additional Images */}
        <div className="md:col-span-2">
          <label className="helix-label">Additional Images</label>
          <ImageUploader
            value={imageItems}
            onChange={handleImagesChange}
            maxImages={5}
          />
          {errors.images && (
            <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>
          )}
        </div>

        {/* Actions */}
        <div className="md:col-span-2 flex justify-end gap-3 mt-6">
          <button
            type="submit"
            disabled={isPending}
            className="helix-btn-primary w-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? <Loader /> : 'Create product'}
          </button>
        </div>
      </form>
    </section>
  );
}
