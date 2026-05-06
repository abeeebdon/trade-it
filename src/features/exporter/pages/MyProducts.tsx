'use client';

import { useEffect, useState } from 'react';
import { formatUSD, formatNGN } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { toast } from 'sonner';
import { Plus, Trash2, Pencil } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────────

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price_usd: number;
  price_ngn: number;
  min_order_qty: number;
  unit: string;
  photos: string[];
  status: string;
};

type Fx = {
  usd_to_ngn: number;
  source: string;
  fetched_at: number;
};

type ProductFormData = {
  name: string;
  category: string;
  description: string;
  price_usd: number;
  min_order_qty: number;
  unit: string;
  photos: string[];
  status: string;
};

// ─── Constants ──────────────────────────────────────────────────────────────────

const CATS = [
  { value: 'fashion', label: 'Fashion & Textiles' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'staple-foods', label: 'Staple Foods' },
  { value: 'general-goods', label: 'General Goods' },
];

// ─── Mock Data ──────────────────────────────────────────────────────────────────

const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Premium Sesame Seeds (50kg bags)',
    category: 'agriculture',
    description:
      'High-quality sesame seeds sourced from Northern Nigeria, suitable for export.',
    price_usd: 16,
    price_ngn: 25440,
    min_order_qty: 200,
    unit: 'bag',
    photos: [],
    status: 'active',
  },
  {
    id: 'prod-002',
    name: 'Refined Shea Butter — Grade A',
    category: 'general-goods',
    description:
      'Cold-pressed, unrefined shea butter in export-ready packaging.',
    price_usd: 20,
    price_ngn: 31800,
    min_order_qty: 80,
    unit: 'kg',
    photos: [],
    status: 'active',
  },
  {
    id: 'prod-003',
    name: 'Hibiscus Flower (Dried, Export Grade)',
    category: 'agriculture',
    description:
      'Sun-dried Hibiscus sabdariffa, sorted and cleaned for international buyers.',
    price_usd: 11,
    price_ngn: 17490,
    min_order_qty: 500,
    unit: 'kg',
    photos: [],
    status: 'draft',
  },
];

const mockFx: Fx = {
  usd_to_ngn: 1590.5,
  source: 'CBN',
  fetched_at: Math.floor(Date.now() / 1000),
};

// ─── MyProducts ─────────────────────────────────────────────────────────────────

export default function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [fx, setFx] = useState<Fx | null>(null);

  const load = () => {
    setTimeout(() => {
      setProducts(mockProducts);
      setFx(mockFx);
    }, 800);
  };

  useEffect(() => {
    load();
  }, []);

  const del = (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success('Deleted');
  };

  return (
    <>
      {/* Header action — mirrors original Shell actions prop */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="helix-btn-primary inline-flex items-center gap-2"
          data-testid="create-product-btn"
        >
          <Plus size={14} /> New product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="helix-card p-10 text-center">
          <div className="text-[#9CA3AF]">
            No products yet. Create your first listing to appear in the
            marketplace.
          </div>
          <button
            onClick={() => setOpen(true)}
            className="helix-btn-primary mt-4"
          >
            Create product
          </button>
        </div>
      ) : (
        <div className="helix-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="helix-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>MOQ</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.photos?.[0] ? (
                        <img
                          src={p.photos[0]}
                          alt=""
                          className="w-14 h-14 rounded object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded bg-[#1A7A6E]/10 flex items-center justify-center text-[#1A7A6E] text-[10px] font-mono">
                          NO IMG
                        </div>
                      )}
                    </td>
                    <td className="max-w-xs truncate">{p.name}</td>
                    <td className="text-[13px] text-[#9CA3AF]">{p.category}</td>
                    <td className="font-mono">
                      {formatUSD(p.price_usd)}
                      <div className="text-[11px] text-[#9CA3AF]">
                        {formatNGN(p.price_ngn)}
                      </div>
                    </td>
                    <td className="font-mono">
                      {p.min_order_qty} {p.unit}
                    </td>
                    <td>
                      <StatusPill status={p.status} />
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditing(p);
                            setOpen(true);
                          }}
                          className="text-[#1A7A6E] hover:text-[#C9922A]"
                          data-testid={`edit-${p.id}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => del(p.id)}
                          className="text-[#E74C3C] hover:text-[#ff8e82]"
                          data-testid={`del-${p.id}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {open && (
        <ProductForm
          onClose={() => {
            setOpen(false);
            load();
          }}
          editing={editing}
          fx={fx}
          onSave={(product) => {
            if (editing) {
              setProducts((prev) =>
                prev.map((p) => (p.id === product.id ? product : p)),
              );
            } else {
              setProducts((prev) => [...prev, product]);
            }
          }}
        />
      )}
    </>
  );
}

// ─── ProductForm ─────────────────────────────────────────────────────────────────

interface ProductFormProps {
  onClose: () => void;
  editing: Product | null;
  fx: Fx | null;
  onSave: (product: Product) => void;
}

function ProductForm({ onClose, editing, fx, onSave }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>(
    editing
      ? {
          name: editing.name,
          category: editing.category,
          description: editing.description,
          price_usd: editing.price_usd,
          min_order_qty: editing.min_order_qty,
          unit: editing.unit,
          photos: editing.photos || [],
          status: editing.status,
        }
      : {
          name: '',
          category: 'fashion',
          description: '',
          price_usd: 50,
          min_order_qty: 10,
          unit: 'piece',
          photos: [],
          status: 'draft',
        },
  );
  const [busy, setBusy] = useState(false);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const f of files) {
      try {
        // Mock upload — replace with real API call when backend is ready
        const mockUrl = URL.createObjectURL(f);
        setForm((x) => ({ ...x, photos: [...x.photos, mockUrl] }));
      } catch {
        toast.error('Upload failed');
      }
    }
  };

  const save = async () => {
    setBusy(true);
    try {
      // Mock save — replace with real API call when backend is ready
      await new Promise((res) => setTimeout(res, 600));
      const saved: Product = {
        id: editing?.id ?? `prod-${Date.now()}`,
        ...form,
        price_ngn: form.price_usd * (fx?.usd_to_ngn ?? 1590),
      };
      onSave(saved);
      toast.success(editing ? 'Product updated' : 'Product created');
      onClose();
    } catch {
      toast.error('Failed to save product');
    } finally {
      setBusy(false);
    }
  };

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
              {CATS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Unit">
            <input
              className="helix-input"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
            />
          </Field>
          <Field label="Price USD">
            <input
              type="number"
              step="0.01"
              className="helix-input"
              value={form.price_usd}
              onChange={(e) =>
                setForm({ ...form, price_usd: Number(e.target.value) })
              }
              data-testid="pf-price"
            />
          </Field>
          <Field label="MOQ">
            <input
              type="number"
              className="helix-input"
              value={form.min_order_qty}
              onChange={(e) =>
                setForm({ ...form, min_order_qty: Number(e.target.value) })
              }
            />
          </Field>
          <Field label="Description" full>
            <textarea
              className="helix-input h-24"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Field>
          <Field label="Photos" full>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={upload}
              className="helix-input"
              data-testid="pf-photos"
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
          </Field>
          <Field label="Status">
            <select
              className="helix-input"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="active">Active (published)</option>
              <option value="archived">Archived</option>
            </select>
          </Field>
          {fx && (
            <div className="flex items-end text-[12px] text-[#9CA3AF] font-mono">
              NGN est. @ {fx.usd_to_ngn} = ₦
              {(form.price_usd * fx.usd_to_ngn).toLocaleString()}
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="helix-btn-secondary flex-1">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={busy}
            className="helix-btn-primary flex-1"
            data-testid="pf-save"
          >
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Field ───────────────────────────────────────────────────────────────────────

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
