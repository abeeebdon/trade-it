'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { toast } from 'sonner';

import { RootState } from '@/store/store';
import { CATS } from '@/lib/constants';
import { useCreateListing } from '../hooks/useListings';

import type {
  FulfillmentMode,
  Listing,
  ListingFormData,
  ListingStatus,
  CreateListingPayload,
} from '../types/exporter';

interface ListingFormProps {
  open: boolean;
  isExporter: boolean;
  editing: Listing | null;
  onClose: () => void;
  onSave: (listing: Listing) => void;
}

export default function ListingForm({
  open,
  isExporter,
  editing,
  onClose,
  onSave,
}: ListingFormProps) {
  // Safe extraction fallbacks
  const user = useSelector((state: RootState) => state.auth.user);
  const mode: FulfillmentMode = isExporter ? 'riby_dtc' : 'buyer_local';

  // Pass close handler directly into mutation lifecycle hook options if preferred
  const { mutateAsync: createListingMutation } = useCreateListing();

  const [form, setForm] = useState<ListingFormData>(
    editing
      ? {
          title: editing.title,
          description: editing.description,
          category: editing.category,
          retail_price_usd: editing.retail_price_usd,
          stock_qty: editing.stock_qty,
          photos: editing.photos || [],
          ships_from: editing.ships_from,
          status: editing.status,
        }
      : {
          title: '',
          description: '',
          category: 'fashion',
          retail_price_usd: 29,
          stock_qty: 10,
          photos: [],
          ships_from: isExporter
            ? 'Lagos → Riby US fulfillment'
            : 'Brooklyn, NY',
          status: 'active',
        },
  );

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(editing?.photos || []);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previews]);

  if (!open) return null;

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    setFiles((prev) => [...prev, ...selectedFiles]);
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...urls]);
  };

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

  const save = async () => {
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!form.description.trim()) {
      toast.error('Description is required');
      return;
    }
    if (!form.ships_from.trim()) {
      toast.error('Ships from is required');
      return;
    }
    if (form.retail_price_usd <= 0) {
      toast.error('Retail price must be greater than zero');
      return;
    }
    if (!files.length && !editing) {
      toast.error('Please upload at least one image');
      return;
    }

    setBusy(true);

    try {
      const payload: CreateListingPayload = {
        UserId: Number(user?.id),
        Title: form.title,
        ThumbnailImage: files[0] ?? null,
        Category: form.category,
        RetailPriceUsd: form.retail_price_usd,
        StockQty: form.stock_qty,
        ShipsFrom: form.ships_from,
        Description: form.description,
        ProductStatusId: getProductStatusId(form.status),
        FulfillmentMode: mode,
        Photos: files,
      };

      const response = await createListingMutation(payload);

      const saved: Listing = {
        id:
          response?.data?.id ?? response?.id ?? editing?.id ?? `${Date.now()}`,
        title: form.title,
        description: form.description,
        category: form.category,
        retail_price_usd: form.retail_price_usd,
        stock_qty: form.stock_qty,
        ships_from: form.ships_from,
        status: form.status,
        fulfillment_mode: mode,
        photos: previews.length > 0 ? previews : editing?.photos || [],
      };

      onSave(saved);
      onClose();
    } catch (error) {
      // Caught cleanly here to avoid breaking application loop thread
      console.error('Error within submission component scope:', error);
    } finally {
      setBusy(false);
    }
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

        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="helix-label">Title</label>
            <input
              className="helix-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Hand-Dyed Adire Fabric Set"
            />
          </div>

          <div>
            <label className="helix-label">Category</label>
            <select
              className="helix-input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="helix-label">Retail price (USD)</label>
            <input
              type="number"
              className="helix-input"
              value={form.retail_price_usd}
              onChange={(e) =>
                setForm({ ...form, retail_price_usd: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="helix-label">Stock qty</label>
            <input
              type="number"
              className="helix-input"
              value={form.stock_qty}
              onChange={(e) =>
                setForm({ ...form, stock_qty: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="helix-label">Ships from</label>
            <input
              className="helix-input"
              value={form.ships_from}
              onChange={(e) => setForm({ ...form, ships_from: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="helix-label">Description</label>
            <textarea
              className="helix-input h-24"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
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

            {previews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {previews.map((photo, index) => (
                  <Image
                    key={index}
                    src={photo}
                    alt={`preview-${index}`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded object-cover"
                    unoptimized
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="helix-label">Status</label>
            <select
              className="helix-input"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as ListingStatus })
              }
            >
              <option value="active">Active</option>
              <option value="out_of_stock">Out of stock</option>
              <option value="archived">Archived</option>
            </select>
          </div>

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
          <button onClick={onClose} className="helix-btn-secondary flex-1">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={busy}
            className="helix-btn-primary flex-1"
          >
            {busy ? 'Saving...' : 'Save listing'}
          </button>
        </div>
      </div>
    </div>
  );
}
