'use client';

import { useState } from 'react';
import { Product, ProductFormState } from '../types/exporter';
import { useCreateProduct } from '../hooks/useProducts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Image from 'next/image';

const CATEGORIES = [
  { value: 'fashion', label: 'Fashion & Textiles' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'staple-foods', label: 'Staple Foods' },
  { value: 'general-goods', label: 'General Goods' },
];

const UNITS = [
  { id: 1, label: 'Piece' },
  { id: 2, label: 'Kg' },
  { id: 3, label: 'Bag' },
  { id: 4, label: 'Roll' },
  { id: 5, label: 'Set' },
  { id: 6, label: 'Litre' },
  { id: 7, label: 'Carton' },
];

const STATUSES = [
  { id: 1, label: 'Draft', value: 'draft' },
  { id: 2, label: 'Active (published)', value: 'active' },
  { id: 3, label: 'Archived', value: 'archived' },
];

const DEFAULT_CURRENCY_ID = 1;

const defaultForm = (): ProductFormState => ({
  name: '',
  category: 'fashion',
  unitId: 1,
  price_usd: 50,
  moq: 10,
  description: '',
  currencyId: DEFAULT_CURRENCY_ID,
  statusId: 1,
  thumbnail: null,
  images: [],
});

const formFromProduct = (p: Product): ProductFormState => ({
  name: p.name,
  category: p.category,
  unitId:
    UNITS.find((u) => u.label.toLowerCase() === p.unit.toLowerCase())?.id ?? 1,
  price_usd: p.price_usd,
  moq: p.min_order_qty,
  description: p.description,
  currencyId: DEFAULT_CURRENCY_ID,
  statusId: STATUSES.find((s) => s.value === p.status)?.id ?? 1,
  thumbnail: null,
  images: [],
});

interface ProductFormProps {
  onClose: () => void;
  editing: Product | null;
  fxRate?: number;
}

export default function ProductForm({
  onClose,
  editing,
  fxRate,
}: ProductFormProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [form, setForm] = useState<ProductFormState>(
    editing ? formFromProduct(editing) : defaultForm(),
  );

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    editing?.photos?.[0] ?? null,
  );
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    editing?.photos?.slice(1) ?? [],
  );

  const { mutate: submitProduct, isPending } = useCreateProduct(onClose);

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, thumbnail: file }));
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setForm((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Enforcing required backend properties validation explicitly
    if (
      !form.name.trim() ||
      !form.description.trim() ||
      form.images.length === 0
    ) {
      return;
    }

    submitProduct({
      UserId: user?.id ? Number(user.id) : undefined,
      Name: form.name,
      Category: form.category,
      Unit: form.unitId,
      PriceUsd: form.price_usd,
      Moq: form.moq,
      Description: form.description,
      CurrencyId: form.currencyId,
      StatusId: form.statusId,
      ThumbnailImage: form.thumbnail,
      Images: form.images,
    });
  };

  const ngnEstimate = fxRate
    ? `₦${(form.price_usd * fxRate).toLocaleString()}`
    : null;

  return (
    <div
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

        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <Field label="Name" full>
            <input
              className="helix-input"
              placeholder="e.g. Premium Sesame Seeds"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              data-testid="pf-name"
            />
          </Field>

          <Field label="Category">
            <select
              className="helix-input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              data-testid="pf-cat"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Unit">
            <select
              className="helix-input"
              value={form.unitId}
              onChange={(e) =>
                setForm({ ...form, unitId: Number(e.target.value) })
              }
            >
              {UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Price (USD)">
            <input
              type="number"
              step="0.01"
              min="0"
              className="helix-input"
              value={form.price_usd}
              onChange={(e) =>
                setForm({ ...form, price_usd: Number(e.target.value) })
              }
              data-testid="pf-price"
            />
            {ngnEstimate && (
              <p className="text-[11px] text-[#9CA3AF] font-mono mt-1">
                ≈ {ngnEstimate} at current rate
              </p>
            )}
          </Field>

          <Field label="Minimum Order Quantity (MOQ)">
            <input
              type="number"
              min="1"
              className="helix-input"
              value={form.moq}
              onChange={(e) =>
                setForm({ ...form, moq: Number(e.target.value) })
              }
            />
          </Field>

          <Field label="Status">
            <select
              className="helix-input"
              value={form.statusId}
              onChange={(e) =>
                setForm({ ...form, statusId: Number(e.target.value) })
              }
            >
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Description" full>
            <textarea
              className="helix-input h-24"
              placeholder="Describe your product for international buyers..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Field>

          <Field label="Thumbnail Image" full>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnail}
              className="helix-input"
              data-testid="pf-thumbnail"
            />
            {thumbnailPreview && (
              <Image
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="mt-2 w-20 h-20 rounded object-cover"
                width={12}
                height={12}
              />
            )}
          </Field>

          <Field label="Additional Images" full>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              className="helix-input"
              data-testid="pf-images"
            />
            {imagePreviews.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative">
                    <Image
                      src={src}
                      alt=""
                      className="w-16 h-16 rounded object-cover"
                      width={12}
                      height={12}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E74C3C] text-white text-[10px] flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Field>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="helix-btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={
              isPending ||
              !form.name.trim() ||
              !form.description.trim() ||
              form.images.length === 0
            }
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
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}

function Field({ label, children, full }: FieldProps) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="helix-label">{label}</label>
      {children}
    </div>
  );
}
