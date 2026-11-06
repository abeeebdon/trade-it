import type { VariantFormValues } from '../components/VariantComponent';
import type { VariantJson } from '../../types/exporter';

/** Uppercase, dash-separated token used inside generated SKUs. */
export const slug = (value: string) =>
  value
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toUpperCase();

export const capitalize = (value: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value;

/** Option names submitted alongside `VariantsJson`. */
export const toOptionNames = (form: VariantFormValues): string[] | null =>
  form.options.length
    ? form.options.map((option) => capitalize(option.name))
    : null;

/** Each item is `JSON.stringify(VariantJson)` for one variant. */
export const toVariantsJson = (
  productName: string,
  form: VariantFormValues,
): string[] | null => {
  if (!form.variants.length) return null;

  return form.variants.map((variant) => {
    const entries = Object.entries(variant.combination);
    const suffix = entries.map(([, value]) => slug(value)).join('-');

    const payload: VariantJson = {
      sku: ['JOMP', slug(productName), suffix].filter(Boolean).join('-'),
      price: variant.price,
      quantity: variant.available,
      options: entries.map(([optionName, name]) => ({
        optionName: capitalize(optionName),
        name,
      })),
    };

    return JSON.stringify(payload);
  });
};

/** Keeps previously uploaded image URLs only (blobs are not persisted). */
export const toExistingImageUrls = (previews?: string[]): string[] | null => {
  const urls = (previews ?? []).filter((url) => !url.startsWith('blob:'));
  return urls.length ? urls : null;
};
