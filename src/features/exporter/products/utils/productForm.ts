import type {
  ProductVariant as VariantRow,
  VariantFormValues,
  VariantOption,
} from '../components/VariantComponent';
import type { ProductVariant as ApiProductVariant } from '../../api/productsApi';
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

const combinationKey = (
  combination: Record<string, string>,
  fallbackIndex: number,
) =>
  Object.keys(combination)
    .sort()
    .map((name) => `${name}:${combination[name]}`)
    .join('|') || `variant-${fallbackIndex}`;

/** Converts the API variant list into the `VariantComponent` form shape. */
export const toVariantForm = (
  variants?: ApiProductVariant[] | null,
): VariantFormValues => {
  if (!variants?.length) return { options: [], variants: [] };

  const optionValues = new Map<string, string[]>();

  for (const variant of variants) {
    for (const option of variant.options ?? []) {
      const name = option.optionName.trim().toLowerCase();
      if (!name) continue;

      const values = optionValues.get(name) ?? [];
      const exists = values.some(
        (value) => value.toLowerCase() === option.optionValue.toLowerCase(),
      );

      if (!exists) values.push(option.optionValue);
      optionValues.set(name, values);
    }
  }

  const options: VariantOption[] = Array.from(optionValues.entries()).map(
    ([name, values]) => ({
      id: `opt-${name}`,
      name,
      values: values.map((value) => ({
        id: `val-${name}-${value}`,
        value,
      })),
    }),
  );

  const rows: VariantRow[] = variants.map((variant, index) => {
    const combination: Record<string, string> = {};

    for (const option of variant.options ?? []) {
      const name = option.optionName.trim().toLowerCase();
      if (name) combination[name] = option.optionValue;
    }

    return {
      id: combinationKey(combination, index),
      combination,
      price: variant.price ?? 0,
      available: variant.quantity ?? 0,
    };
  });

  return { options, variants: rows };
};
