'use client';

import { useEffect, useMemo } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';

import {
  productSchema,
  ProductFormValues,
} from '@/features/authentication/components/validation';
import {
  useCreateProduct,
  useEditProduct,
  useGetProductCategories,
} from '../hooks/useProducts';
import { RootState } from '@/store/store';
import InputField from '@/components/form/InputFIeld';
import ImageUploader, { type ImageItem } from '@/components/form/ImageUploader';
import { UNITS, STATUSES, DEFAULT_CURRENCY_ID } from '@/lib/constants';
import { ProductResponseType } from '../products/types/product';

// Helpers

const defaultValues = () => ({
  name: '',
  category: '',
  unitId: 1,
  price_usd: 50,
  moq: 10,
  description: '',
  currencyId: DEFAULT_CURRENCY_ID,
  statusId: 1,
  thumbnail: null,
  images: [],
  thumbnailPreview: null,
  imagePreviews: [],
});

const valuesFromProduct = (p: ProductResponseType) => ({
  name: p.productName,
  category: p.category,
  unitId: p.unit,
  price_usd: p.priceUsd,
  moq: p.moq,
  description: p.description,
  currencyId: DEFAULT_CURRENCY_ID,
  statusId: STATUSES.find((s) => s.value === String(p.statusId))?.id ?? 1,
  thumbnail: null,
  images: [],
  thumbnailPreview: p.thumbnailImage?.[0] ?? null,
  imagePreviews: p.images?.slice(1) ?? [],
});

//  Props
interface ProductFormProps {
  onClose: () => void;
  editing: ProductResponseType | null;
  fxRate?: number;
}

//  Component

export default function ProductForm({
  onClose,
  editing,
  fxRate,
}: ProductFormProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: editing ? valuesFromProduct(editing) : defaultValues(),
  });

  const isEditMode = !!editing;

  const { mutate: submitProduct, isPending } = useCreateProduct(onClose);
  const { mutate: editProduct } = useEditProduct(onClose);

  const { data: categoryData, isPending: categoriesLoading } =
    useGetProductCategories();

  const categories = useMemo(
    () => categoryData?.data ?? [],
    [categoryData?.data],
  );

  // Seed first category once API responds, but only in create mode
  useEffect(() => {
    if (editing || !categories.length) return;
    const current = getValues('category');
    if (!current) {
      setValue('category', categories[0].name);
    }
  }, [categories, editing, getValues, setValue]);

  // Watched values for live UI updates
  const priceUsd = useWatch({ control, name: 'price_usd' });
  const thumbnailPreview =
    useWatch({ control, name: 'thumbnailPreview' }) ?? null;
  const imagePreviews = useWatch({ control, name: 'imagePreviews' }) ?? [];

  const ngnEstimate = useMemo(
    () =>
      fxRate && priceUsd ? `₦${(priceUsd * fxRate).toLocaleString()}` : null,
    [fxRate, priceUsd],
  );

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
    if (isEditMode && editing) {
      editProduct({
        id: editing.id,
        payload: {
          UserId: user?.id ? Number(user.id) : undefined,
          Name: values.name,
          Category: values.category,
          Unit: values.unitId,
          quantity: values.quantity,

          PriceUsd: values.price_usd,
          Moq: values.moq,
          Description: values.description,
          CurrencyId: values.currencyId,
          StatusId: values.statusId,
          ThumbnailImage: values.thumbnail ?? null,
          Images: values.images,
        },
      });
      return;
    }
    submitProduct({
      UserId: user?.id ? Number(user.id) : undefined,
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
    <section
      className="fixed inset-0 z-50 bg-[#0A1628]/80 backdrop-blur flex items-start justify-center pt-16 pb-10 overflow-y-auto p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="helix-card w-full max-w-2xl p-6 fade-up max-h-[90vh] overflow-y-auto"
        data-testid="product-form"
      >
        <h2 className="helix-h3">
          {editing ? 'Edit product' : 'Create product'}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
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
                  <select
                    {...field}
                    className="helix-input"
                    data-testid="pf-cat"
                  >
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
              <p className="text-red-500 text-xs mt-1">
                {errors.unitId.message}
              </p>
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
            {ngnEstimate && (
              <p className="text-[11px] text-[#9CA3AF] font-mono mt-1">
                ≈ {ngnEstimate} at current rate
              </p>
            )}
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
              <p className="text-red-500 text-xs mt-1">
                {errors.images.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="md:col-span-2 flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="helix-btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="helix-btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="pf-save"
            >
              {isPending
                ? 'Saving…'
                : editing
                  ? 'Save changes'
                  : 'Create product'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
