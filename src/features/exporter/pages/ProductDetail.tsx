'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatUSD, formatNGN } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { CheckCircle2, Warehouse, MapPin } from 'lucide-react';
import { products as mockProducts } from '../components/data';
import type { Supplier, ProductData } from '../types/exporter';
import { useHeader } from '@/context/HeaderContext';

// ─── Types ───────────────────────────────────────────────────────────────────────

type RfqForm = {
  quantity: number;
  delivery_address: string;
  target_delivery_date: string;
  message: string;
};

// ─── Mock Suppliers (keyed by product id) ────────────────────────────────────────

const mockSuppliers: Record<string, Supplier> = {
  '3b58c1c6-164c-407c-906a-c940fcc3ce75': {
    business_name: 'Eko Leather Works Ltd',
    country: 'Nigeria',
    address: '14 Apapa Industrial Estate, Lagos',
    compliance_score: 88,
    kyb_status: 'approved',
    kyc_status: 'approved',
    anchor_customer_id: 'ANC-BIZ-00124',
  },
  'c1a7e5b2-9914-4f3c-8a9d-1d7d3d8caa21': {
    business_name: 'Abeokuta Artisan Collective',
    country: 'Nigeria',
    address: 'Itoku Market, Abeokuta, Ogun State',
    compliance_score: 82,
    kyb_status: 'approved',
    kyc_status: 'approved',
    anchor_customer_id: 'ANC-BIZ-00209',
  },
  '7d2f4b0c-5c77-4f0d-9c21-6a32c44b0b12': {
    business_name: 'Savannah Naturals Export Co.',
    country: 'Nigeria',
    address: 'Kaduna Export Processing Zone, Kaduna State',
    compliance_score: 91,
    kyb_status: 'approved',
    kyc_status: 'approved',
    anchor_customer_id: 'ANC-BIZ-00517',
  },
  'a8b9d1e2-2f4b-4e1a-9a5c-33c4b2f6d981': {
    business_name: 'NorthGrain Agro Exports',
    country: 'Nigeria',
    address: 'Kano Free Trade Zone, Kano State',
    compliance_score: 94,
    kyb_status: 'approved',
    kyc_status: 'approved',
    anchor_customer_id: 'ANC-BIZ-00341',
  },
  'f4c3e2b1-6d77-4a88-bb1d-55c9d3f2a111': {
    business_name: 'Lagos Crafts Export Hub',
    country: 'Nigeria',
    address: 'Lekki Free Zone, Lagos State',
    compliance_score: 76,
    kyb_status: 'approved',
    kyc_status: 'approved',
    anchor_customer_id: null,
  },
};

const fallbackSupplier: Supplier = {
  business_name: 'Demo Supplier Ltd',
  country: 'Nigeria',
  address: 'Lagos Export Zone',
  compliance_score: 75,
  kyb_status: 'approved',
  kyc_status: 'approved',
  anchor_customer_id: null,
};

// ProductDetail
export default function ProductDetail() {
  //hooks
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);
  const { setHeader } = useHeader();
  const [data, setData] = useState<ProductData | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [rfq, setRfq] = useState<RfqForm>({
    quantity: 10,
    delivery_address: '',
    target_delivery_date: '',
    message: '',
  });

  // ── Fetch product data
  useEffect(() => {
    if (!id) return;
    setTimeout(() => {
      const found = mockProducts.find((p) => p.id === id) ?? mockProducts[0];
      const supplier = mockSuppliers[found.id] ?? fallbackSupplier;
      setData({ product: found, supplier });
      setRfq((r) => ({ ...r, quantity: found.min_order_qty || 10 }));
    }, 600);
  }, [id]);

  // ── Update header once data is loaded
  useEffect(() => {
    if (!data) return;

    const p = data.product;

    setHeader({
      title: p.name,
      kicker: `${p.category.replace('-', ' ').toUpperCase()} · ${p.country ?? 'Nigeria'}`,
    });

    // Restore static header when navigating away
    return () => {
      setHeader(null);
    };
  }, [data, setHeader]);

  // ── RFQ submit
  const submitRfq = async () => {
    setBusy(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      const mockOrderNumber = `RFQ-${Date.now().toString().slice(-6)}`;
      const mockOrderId = `ord-${Date.now()}`;
      toast.success(`RFQ ${mockOrderNumber} submitted`);
      router.push(`/orders/${mockOrderId}`);
    } catch {
      toast.error('Failed to submit RFQ');
    } finally {
      setBusy(false);
    }
  };

  // ── Loading skeleton
  if (!data) {
    return (
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 helix-card overflow-hidden animate-pulse opacity-40">
          <div className="aspect-[16/9] bg-[#1A7A6E]/10" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-[#1A7A6E]/10 rounded w-1/4" />
            <div className="h-4 bg-[#1A7A6E]/10 rounded w-3/4" />
            <div className="h-4 bg-[#1A7A6E]/10 rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="helix-card p-6 h-48 animate-pulse opacity-40" />
          <div className="helix-card p-6 h-40 animate-pulse opacity-40" />
        </div>
      </div>
    );
  }

  const p = data.product;
  const s = data.supplier;
  const canRfq = user?.role === 'buyer' && user?.name !== s.business_name;

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left col: image + details ── */}
        <div className="lg:col-span-2 helix-card overflow-hidden">
          <div className="aspect-[16/9] bg-[#0A1628] relative">
            {p.photos?.[0] ? (
              <Image
                src={p.photos[0]}
                alt={p.name}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#1A7A6E] text-[11px] font-mono tracking-widest">
                NO IMAGE
              </div>
            )}
          </div>

          <div className="p-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {p.compliance_badges?.map((b) => (
                <span key={b} className="helix-status helix-status-gold">
                  {b}
                </span>
              ))}
              {p.export_readiness_score >= 80 && (
                <span className="helix-status helix-status-ok flex items-center gap-1">
                  <CheckCircle2 size={10} /> EXPORT READY ·{' '}
                  {p.export_readiness_score}/100
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-[15px] leading-relaxed text-[#F5F5F5]">
              {p.description}
            </p>

            {/* Meta grid */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#1A7A6E]/15">
              <Meta
                label="Min Order Qty"
                value={`${p.min_order_qty} ${p.unit}`}
              />
              <Meta label="Unit" value={p.unit} />
              <Meta label="Status" value={<StatusPill status={p.status} />} />
            </div>
          </div>
        </div>

        {/* ── Right col: pricing + supplier ── */}
        <div className="space-y-4">
          {/* Pricing card */}
          <div className="helix-card p-6">
            <div className="helix-label">Price per {p.unit}</div>
            <div className="font-mono text-4xl text-[#C9922A] font-bold mt-1">
              {formatUSD(p.price_usd)}
            </div>
            <div className="text-[12px] text-[#9CA3AF] font-mono">
              {formatNGN(p.price_ngn)}
            </div>

            {canRfq ? (
              <button
                onClick={() => setOpen(true)}
                className="helix-btn-primary w-full mt-5"
                data-testid="rfq-open-btn"
              >
                Request quotation
              </button>
            ) : user?.role === 'exporter' ? (
              <div className="mt-5 text-[12px] text-[#9CA3AF]">
                Exporter view — buyers can RFQ.
              </div>
            ) : (
              <Link
                href="/login"
                className="helix-btn-primary w-full mt-5 text-center block"
              >
                Sign in to RFQ
              </Link>
            )}
          </div>

          {/* Supplier card */}
          <div className="helix-card p-6">
            <div className="helix-label">Supplier</div>
            <div className="helix-h3 mt-1">{s.business_name}</div>
            <div className="mt-3 space-y-2 text-[13px] text-[#9CA3AF]">
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                {s.country} · {s.address || '—'}
              </div>
              <div className="flex items-center gap-2">
                <Warehouse size={14} />
                Score:{' '}
                <span className="text-[#C9922A] font-mono">
                  {s.compliance_score}/100
                </span>
              </div>
              <div className="flex gap-2 pt-2 flex-wrap">
                <StatusPill status={s.kyb_status || s.kyc_status} />
                {s.anchor_customer_id && (
                  <span className="helix-status helix-status-gold">
                    ANCHOR VERIFIED
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RFQ Modal ── */}
      {open && (
        <div
          className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur flex items-start justify-center pt-16 pb-10 overflow-y-auto z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="helix-card w-full max-w-md p-6 fade-up"
            data-testid="rfq-modal"
          >
            <div className="helix-label">Request Quotation</div>
            <h2 className="helix-h3 mt-1">{p.name}</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="helix-label">Quantity</label>
                <input
                  type="number"
                  min={p.min_order_qty}
                  className="helix-input"
                  value={rfq.quantity}
                  onChange={(e) =>
                    setRfq({ ...rfq, quantity: Number(e.target.value) })
                  }
                  data-testid="rfq-qty"
                />
                <div className="text-[11px] text-[#9CA3AF] mt-1 font-mono">
                  Est: {formatUSD((rfq.quantity || 0) * p.price_usd)}
                </div>
              </div>
              <div>
                <label className="helix-label">Delivery address</label>
                <input
                  className="helix-input"
                  value={rfq.delivery_address}
                  onChange={(e) =>
                    setRfq({ ...rfq, delivery_address: e.target.value })
                  }
                  required
                  data-testid="rfq-address"
                />
              </div>
              <div>
                <label className="helix-label">Target delivery date</label>
                <input
                  type="date"
                  className="helix-input"
                  value={rfq.target_delivery_date}
                  onChange={(e) =>
                    setRfq({ ...rfq, target_delivery_date: e.target.value })
                  }
                  data-testid="rfq-date"
                />
              </div>
              <div>
                <label className="helix-label">Message to supplier</label>
                <textarea
                  className="helix-input h-20"
                  value={rfq.message}
                  onChange={(e) => setRfq({ ...rfq, message: e.target.value })}
                  data-testid="rfq-message"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="helix-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRfq}
                  disabled={busy}
                  className="helix-btn-primary flex-1"
                  data-testid="rfq-submit"
                >
                  {busy ? 'Submitting…' : 'Submit RFQ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────────

interface MetaProps {
  label: string;
  value: React.ReactNode;
}

function Meta({ label, value }: MetaProps) {
  return (
    <div>
      <div className="helix-label">{label}</div>
      <div className="text-[14px] mt-1">{value}</div>
    </div>
  );
}
