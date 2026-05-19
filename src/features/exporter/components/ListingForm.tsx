'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import type {
  FulfillmentMode,
  Listing,
  ListingFormData,
  ListingStatus,
} from '../types/exporter';
import { CATS } from '@/lib/constants';
import Image from 'next/image';

// Props

interface ListingFormProps {
  open: boolean;
  isExporter: boolean;
  editing: Listing | null;
  onClose: () => void;
  onSave: (listing: Listing) => void;
}

// ─── ListingForm ─────────────────────────────────────────────────────────────────

export default function ListingForm({
  open,
  isExporter,
  editing,
  onClose,
  onSave,
}: ListingFormProps) {
  const mode: FulfillmentMode = isExporter ? 'riby_dtc' : 'buyer_local';

  const [form, setForm] = useState<ListingFormData>( // ← setForm was missing
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

  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const f of files) {
      try {
        const mockUrl = URL.createObjectURL(f);
        setForm((x) => ({ ...x, photos: [...x.photos, mockUrl] }));
      } catch {
        toast.error('Upload failed');
      }
    }
  };

  const save = async () => {
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setBusy(true);
    try {
      await new Promise((res) => setTimeout(res, 500));
      const saved: Listing = {
        id: editing?.id ?? `lst-${Date.now()}`,
        fulfillment_mode: mode,
        ...form,
      };
      onSave(saved);
      toast.success(editing ? 'Listing updated' : 'Listing created');
      onClose();
    } catch {
      toast.error('Failed');
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
            : `New ${mode === 'riby_dtc' ? 'direct-from-Africa' : 'US in-stock'} listing`}
        </h2>

        {/* ── Form fields ── */}
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="helix-label">Title</label>
            <input
              className="helix-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Hand-Dyed Adire Fabric Set"
              data-testid="lf-title"
            />
          </div>

          {/* Category */}
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

          {/* Retail price */}
          <div>
            <label className="helix-label">Retail price (USD)</label>
            <input
              type="number"
              step="0.01"
              min={0}
              className="helix-input"
              value={form.retail_price_usd}
              onChange={(e) =>
                setForm({ ...form, retail_price_usd: Number(e.target.value) })
              }
              data-testid="lf-price"
            />
          </div>

          {/* Stock qty */}
          <div>
            <label className="helix-label">Stock qty</label>
            <input
              type="number"
              min={0}
              className="helix-input"
              value={form.stock_qty}
              onChange={(e) =>
                setForm({ ...form, stock_qty: Number(e.target.value) })
              }
            />
          </div>

          {/* Ships from */}
          <div>
            <label className="helix-label">Ships from</label>
            <input
              className="helix-input"
              value={form.ships_from}
              onChange={(e) => setForm({ ...form, ships_from: e.target.value })}
              placeholder={
                isExporter ? 'Lagos → Riby US fulfillment' : 'Brooklyn, NY'
              }
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="helix-label">Description</label>
            <textarea
              className="helix-input h-24"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Describe the product for consumers…"
            />
          </div>

          {/* Photos */}
          <div className="md:col-span-2">
            <label className="helix-label">Photos</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={upload}
              className="helix-input"
              data-testid="lf-photos"
            />
            {form.photos.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {form.photos.map((ph, i) => (
                  <Image
                    key={i}
                    src={ph}
                    alt=""
                    className="w-16 h-16 rounded object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Status */}
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

          {/* Fulfillment mode — read-only info */}
          <div>
            <label className="helix-label">Fulfillment mode</label>
            <div className="helix-input bg-[#0A1628]/60 text-[#9CA3AF] cursor-default select-none">
              {mode === 'riby_dtc'
                ? 'DTC · RIBY (from Africa)'
                : 'LOCAL · 48HR (US stock)'}
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="helix-btn-secondary flex-1">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={busy}
            className="helix-btn-primary flex-1"
            data-testid="lf-save"
          >
            {busy ? 'Saving…' : 'Save listing'}
          </button>
        </div>
      </div>
    </div>
  );
}
