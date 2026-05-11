import { useState } from 'react';
import { ListingFormProps } from '../types/buyers';
import { CATS } from '@/features/shops/components/data';

function ListingForm({ isExporter, editing, onClose }: ListingFormProps) {
  const mode = isExporter ? 'riby_dtc' : 'buyer_local';
  const [form, setForm] = useState(
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
  //   const upload = async (e) => {
  //     const files = Array.from(e.target.files || []);
  //     for (const f of files) {
  //       const fd = new FormData();
  //       fd.append('file', f);
  //       try {
  //         const { data } = await api.post('/upload?kind=shop', fd, {
  //           headers: { 'Content-Type': 'multipart/form-data' },
  //         });
  //         const token = localStorage.getItem('helix_token');
  //         const url = `${process.env.REACT_APP_BACKEND_URL}/api/files/${data.storage_path}?auth=${encodeURIComponent(token)}`;
  //         setForm((x) => ({ ...x, photos: [...x.photos, url] }));
  //       } catch {
  //         toast.error('Upload failed');
  //       }
  //     }
  //   };
  //   const save = async () => {
  //     setBusy(true);
  //     try {
  //       if (editing) {
  //         await api.patch(`/shop/listings/${editing.id}`, form);
  //         toast.success('Updated');
  //       } else {
  //         await api.post('/shop/listings', { ...form, fulfillment_mode: mode });
  //         toast.success('Listing live');
  //       }
  //       onClose();
  //     } catch (err) {
  //       toast.error(err.response?.data?.detail || 'Failed');
  //     } finally {
  //       setBusy(false);
  //     }
  //   };
  return (
    <div
      className="fixed h-full inset-0 bg-[#0A1628]/80 flex items-start justify-center  pb-10 overflow-y-auto z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="helix-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="helix-h3">
          {editing
            ? 'Edit listing'
            : `New ${mode === 'riby_dtc' ? 'direct-from-Africa' : 'US in-stock'} listing`}
        </h2>
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="helix-label">Title</label>
            <input
              className="helix-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              data-testid="lf-title"
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
              step="0.01"
              className="helix-input"
              value={form.retail_price_usd}
              onChange={(e) =>
                setForm({ ...form, retail_price_usd: Number(e.target.value) })
              }
              data-testid="lf-price"
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
              //   onChange={upload}
              className="helix-input"
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {form.photos.map((ph, i) => (
                <img
                  key={i}
                  src={ph}
                  alt=""
                  className="w-16 h-16 rounded object-cover"
                />
              ))}
            </div>
          </div>
          <div>
            <label className="helix-label">Status</label>
            <select
              className="helix-input"
              value={form.status}
              //   onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="out_of_stock">Out of stock</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="helix-btn-secondary flex-1">
            Cancel
          </button>
          <button
            // onClick={save}
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
export default ListingForm;
