'use client';

import { useMemo, useState } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  productSchema,
  ProductFormValues,
  shippingDefaults,
} from '@/features/authentication/components/validation';
import {
  useCreateProduct,
  useGetProductCategories,
} from '../../hooks/useProducts';
import InputField from '@/components/form/InputFIeld';
import CustomSelect from '@/components/form/CustomSelect';
import ImageUploader, { type ImageItem } from '@/components/form/ImageUploader';
import { STATUSES } from '@/lib/constants';
import BackButton from '@/components/buttons/BackButton';
import Loader from '@/components/buttons/Loader';
import DescriptionEditor from './DescriptionEditor';
import FormSection from './FormSection';
import ShippingForm from './ShippingForm';
import VariantComponent, {
  variantDefaults,
  type VariantFormValues,
} from './VariantComponent';
import { toOptionNames, toVariantsJson } from '../utils/productForm';

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
      shipping: shippingDefaults,
    },
  });

  const { mutate: submitProduct, isPending } = useCreateProduct();

  const [variantForm, setVariantForm] =
    useState<VariantFormValues>(variantDefaults);

  const { data: categoryData, isPending: categoriesLoading } =
    useGetProductCategories();

  const categories = useMemo(
    () => categoryData?.data ?? [],
    [categoryData?.data],
  );

  const thumbnailPreview =
    useWatch({ control, name: 'thumbnailPreview' }) ?? null;
  const imagePreviews = useWatch({ control, name: 'imagePreviews' }) ?? [];
  const priceUsd = useWatch({ control, name: 'price_usd' });

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
    submitProduct({
      Name: values.name,
      Category: values.category,
      quantity: Number(values.quantity),
      PriceUsd: values.price_usd,
      Moq: values.moq,
      Description: values.description,
      CurrencyId: values.currencyId,
      StatusId: values.statusId,
      ThumbnailImage: values.thumbnail ?? null,
      Images: values.images,
      OptionNames: toOptionNames(variantForm),
      VariantsJson: toVariantsJson(values.name, variantForm),
    });
  };
  return (
    <section className="w-full max-w-2xl">
      <BackButton />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-4"
      >
        {/* Product details */}
        <FormSection title="Product details">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <InputField
                label="Name"
                placeholder="e.g. Alo vera Seeds"
                error={errors.name?.message}
                {...register('name')}
              />
            </div>

            <div>
              {categoriesLoading ? (
                <>
                  <label className="helix-label">Category</label>
                  <div className="helix-input h-10 animate-pulse opacity-40" />
                </>
              ) : (
                <CustomSelect
                  control={control}
                  name="category"
                  label="Category"
                  placeholder="Select a category"
                  options={categories.map((c) => ({
                    label: c.name,
                    value: c.name,
                  }))}
                  error={errors.category?.message}
                />
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
              <CustomSelect
                control={control}
                name="statusId"
                label="Status"
                valueType="number"
                options={STATUSES.map((s) => ({
                  label: s.label,
                  value: String(s.id),
                }))}
                error={errors.statusId?.message}
              />
            </div>
          </div>
        </FormSection>

        {/* Description */}
        <FormSection title="Description">
          <Controller
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
