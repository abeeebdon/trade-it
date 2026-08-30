'use client';

import { useEffect, useMemo } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  productSchema,
  ProductFormValues,
} from '@/features/authentication/components/validation';
import {
  useEditProduct,
  useGetProductById,
  useGetProductCategories,
} from '../../hooks/useProducts';
import { RootState } from '@/store/store';
import InputField from '@/components/form/InputFIeld';
import ImageUploader, { type ImageItem } from '@/components/form/ImageUploader';
import { UNITS, STATUSES, DEFAULT_CURRENCY_ID } from '@/lib/constants';
import { ProductResponseType } from '../types/product';
import BackButton from '@/components/buttons/BackButton';

const defaultValues = (): ProductFormValues => ({
  name: '',
  category: '',
  unitId: 1,
  quantity: 0,
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

const valuesFromProduct = (p: ProductResponseType): ProductFormValues => ({
  name: p.productName,
  category: p.category,
  unitId: p.unit,
  quantity: p.moq ?? 0,
  price_usd: p.priceUsd,
  moq: p.moq,
  description: p.description,
  currencyId: DEFAULT_CURRENCY_ID,
  statusId: STATUSES.find((s) => s.value === String(p.statusId))?.id ?? 1,
  thumbnail: null,
  images: [],
  thumbnailPreview: p.thumbnailImage ?? null,
  imagePreviews: p.images ?? [],
});

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: product, isPending, isError } = useGetProductById(id ?? '');
  const { data: categoryData, isPending: categoriesLoading } =
    useGetProductCategories();
  const { mutate: editProduct, isPending: isSubmitting } = useEditProduct();

  const categories = useMemo(
    () => categoryData?.data ?? [],
    [categoryData?.data],
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues(),
  });

  useEffect(() => {
    if (!product) return;

    const productFormData: ProductResponseType = {
      id: product.id,
      productName: product.productName,
      category: product.category,
      currencyId: product.currencyId,
      description: product.description,
      images: product.images?.map((img) => img.imageUrl ?? '') ?? [],
      moq: product.moq ?? product.quantity ?? 0,
      amountInUsd: product.priceUsd,
      amountInNaira: 0,
      priceUsd: product.priceUsd,
      statusId: product.statusId ?? product.productStatusId ?? 1,
      thumbnailImage: product.thumbnailImage ?? '',
      unit: product.unit,
      createdAt: product.createdAt,
    };

    reset(valuesFromProduct(productFormData));
  }, [product, reset]);

  useEffect(() => {
    if (!product || !categories.length) return;
    const current = getValues('category');
    if (!current) {
      setValue('category', categories[0].name);
    }
  }, [categories, product, getValues, setValue]);

  const priceUsd = useWatch({ control, name: 'price_usd' });
  const thumbnailPreview =
    useWatch({ control, name: 'thumbnailPreview' }) ?? null;
  const imagePreviews = useWatch({ control, name: 'imagePreviews' }) ?? [];

  const ngnEstimate = useMemo(
    () => (priceUsd ? `₦${(priceUsd * 1500).toLocaleString()}` : null),
    [priceUsd],
  );

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

  const onSubmit = (values: ProductFormValues) => {
    if (!product) return;

    editProduct({
      id: product.id,
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
  };

  const handleClose = () => router.push('/exporter/my-products');

  if (isPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted">
        Loading product...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted">Could not load product details.</p>
        <button onClick={handleClose} className="helix-btn-primary mt-4">
          Back to products
        </button>
      </div>
    );
  }

  return (
    <section className="w-full max-w-2xl  py-6">
      <BackButton />

      <div className="mt-5 w-full  fade-up">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 grid md:grid-cols-2 gap-4"
          noValidate
        >
          <div className="md:col-span-2">
            <InputField
              label="Name"
              placeholder="e.g. Premium Sesame Seeds"
              error={errors.name?.message}
              data-testid="pf-name"
              {...register('name')}
            />
          </div>

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

          <div>
            <InputField
              label="Price (USD)"
              type="number"
              placeholder="0.00"
              error={errors.price_usd?.message}
              {...register('price_usd', { valueAsNumber: true })}
            />
            {ngnEstimate && (
              <p className="text-[11px] text-muted font-mono mt-1">
                ≈ {ngnEstimate} at current rate
              </p>
            )}
          </div>

          <InputField
            label="Minimum Order Quantity (MOQ)"
            type="number"
            placeholder="10"
            error={errors.moq?.message}
            {...register('moq', { valueAsNumber: true })}
          />

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

          <div className="md:col-span-2">
            <label className="helix-label">Thumbnail Image</label>
            <ImageUploader
              value={thumbnailItems}
              onChange={handleThumbnailChange}
              maxImages={1}
            />
          </div>

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

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="helix-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
