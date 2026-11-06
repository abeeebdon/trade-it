'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  productEditSchema,
  ProductEditFormValues,
  shippingDefaults,
} from '@/features/authentication/components/validation';
import {
  useEditProduct,
  useGetProductById,
  useGetProductCategories,
} from '../../hooks/useProducts';
import InputField from '@/components/form/InputFIeld';
import ImageUploader, { type ImageItem } from '@/components/form/ImageUploader';
import { STATUSES, DEFAULT_CURRENCY_ID } from '@/lib/constants';
import type { ProductCategory } from '../../types/exporter';
import BackButton from '@/components/buttons/BackButton';
import Loader from '@/components/buttons/Loader';
import type { ProductData } from '../../api/productsApi';
import DescriptionEditor from '../components/DescriptionEditor';
import FormSection from '../components/FormSection';
import ShippingForm from '../components/ShippingForm';
import VariantComponent, {
  variantDefaults,
  type VariantFormValues,
} from '../components/VariantComponent';
import {
  toExistingImageUrls,
  toOptionNames,
  toVariantsJson,
} from '../utils/productForm';

const statusIdFor = (p: ProductData) => {
  const raw = p.statusId ?? p.productStatusId;
  return STATUSES.some((s) => s.id === raw) ? raw : STATUSES[0].id;
};

const valuesFromProduct = (p: ProductData): ProductEditFormValues => ({
  name: p.productName,
  category: p.category,
  quantity: p.unit ?? 0,
  price_usd: p.priceUsd,
  moq: p.moq ?? 0,
  description: p.description,
  currencyId: p.currencyId ?? DEFAULT_CURRENCY_ID,
  statusId: statusIdFor(p),
  thumbnail: null,
  images: [],
  thumbnailPreview: p.thumbnailImage || null,
  imagePreviews: p.images?.map((image) => image.imageUrl) ?? [],
  shipping: shippingDefaults,
});

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data: product, isPending, isError } = useGetProductById(id ?? '');
  console.log(product?.unit);
  const { data: categoryData, isPending: categoriesLoading } =
    useGetProductCategories();

  const categories = useMemo(
    () => categoryData?.data ?? [],
    [categoryData?.data],
  );

  if (isError) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted">Could not load product details.</p>
        <button
          onClick={() => router.push('/exporter/products')}
          className="helix-btn-primary mt-4"
        >
          Back to products
        </button>
      </div>
    );
  }

  if (isPending || !product) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted">
        Loading product...
      </div>
    );
  }

  return (
    <EditProductForm
      key={product.id}
      product={product}
      categories={categories}
      categoriesLoading={categoriesLoading}
    />
  );
}

type EditProductFormProps = {
  product: ProductData;
  categories: ProductCategory[];
  categoriesLoading: boolean;
};

function EditProductForm({
  product,
  categories,
  categoriesLoading,
}: EditProductFormProps) {
  const router = useRouter();
  const { mutate: editProduct, isPending: isSubmitting } = useEditProduct(() =>
    router.push('/exporter/products'),
  );

  const [variantForm, setVariantForm] =
    useState<VariantFormValues>(variantDefaults);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProductEditFormValues>({
    resolver: zodResolver(productEditSchema),
    defaultValues: valuesFromProduct(product),
  });

  useEffect(() => {
    if (!categories.length) return;
    if (!getValues('category')) setValue('category', categories[0].name);
  }, [categories, getValues, setValue]);

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

  const onSubmit = (values: ProductEditFormValues) => {
    editProduct({
      id: product.id,
      payload: {
        Name: values.name,
        Category: values.category,
        quantity: values.quantity,
        PriceUsd: values.price_usd,
        Moq: values.moq,
        Description: values.description,
        CurrencyId: values.currencyId,
        StatusId: values.statusId,
        ThumbnailImage: values.thumbnail ?? null,
        Images: values.images,
        ExistingImageUrls: toExistingImageUrls(values.imagePreviews),
        OptionNames: toOptionNames(variantForm),
        VariantsJson: toVariantsJson(values.name, variantForm),
      },
    });
  };

  return (
    <section className="w-full max-w-2xl py-6">
      <BackButton />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-4 fade-up"
        noValidate
      >
        {/* Product details */}
        <FormSection title="Product details">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <InputField
                label="Name"
                placeholder="e.g. Alo vera Seeds"
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
                <p className="text-danger text-xs mt-1">
                  {errors.category.message}
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
          </div>
        </FormSection>

        {/* Pricing & availability */}
        <FormSection title="Pricing & availability">
          <div className="grid gap-4 md:grid-cols-2">
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

            <div>
              <InputField
                label="Minimum Order Quantity (MOQ)"
                type="number"
                placeholder="10"
                error={errors.moq?.message}
                {...register('moq', { valueAsNumber: true })}
              />
            </div>

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
          </div>
        </FormSection>

        {/* Description */}
        <FormSection title="Description">
          <Controller
            key={product.id}
            name="description"
            control={control}
            render={({ field }) => (
              <DescriptionEditor
                label=""
                value={field.value}
                onChange={field.onChange}
                error={errors.description?.message}
                placeholder="Describe your product for international buyers..."
              />
            )}
          />
        </FormSection>

        <VariantComponent value={variantForm} onChange={setVariantForm} />

        {/* Media */}
        <FormSection title="Media">
          <div className="flex flex-col gap-4">
            <div>
              <label className="helix-label">Thumbnail Image</label>
              <ImageUploader
                value={thumbnailItems}
                onChange={handleThumbnailChange}
                maxImages={1}
              />
            </div>

            <div>
              <label className="helix-label">Additional Images</label>
              <ImageUploader
                value={imageItems}
                onChange={handleImagesChange}
                maxImages={5}
              />
              {errors.images && (
                <p className="text-danger text-xs mt-1">
                  {errors.images.message}
                </p>
              )}
            </div>
          </div>
        </FormSection>

        {/* Shipping */}
        <Controller
          name="shipping"
          control={control}
          render={({ field }) => (
            <ShippingForm value={field.value} onChange={field.onChange} />
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="helix-btn-primary w-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader /> : 'Save changes'}
          </button>
        </div>
      </form>
    </section>
  );
}
