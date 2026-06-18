'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useGetMarketPlaceById } from '../hooks/useMarketDetails';
import { useEffect, useState } from 'react';
import RequestQuotationModal from '../components/RequestQuotationModal';
import { CheckCircle, MapPin, Warehouse } from 'lucide-react';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatNGN, formatUSD } from '@/lib/func';
import { useAppSelector } from '@/hooks/store/store';
import DetailCard from '@/components/custom/DetailCard';

const MarketPlaceDetails = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const id = searchParams.get('id') ?? '';
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [rfq, setRfq] = useState({
    quantity: 10,
    delivery_address: '',
    target_delivery_date: '',
    message: '',
  });
  useEffect(() => {
    if (!id.trim) {
      toast.error('There is an error');
      router.back();
      return;
    }
  }, [id]);
  const p = data?.product;
  const s = data?.supplier || {};
  const canRfq = user && user.role === 'retailer' && user.id;
  const { data: productDetails, isPending } = useGetMarketPlaceById({ id });
  console.log(data);
  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 helix-card overflow-hidden">
          <div className="aspect-[16/9] bg-[#0A1628]">
            <img
              src={p.photos?.[0]}
              alt={p.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {p.compliance_badges?.map((b) => (
                <span key={b} className="helix-status helix-status-gold">
                  {b}
                </span>
              ))}
              {p.export_readiness_score >= 80 && (
                <span className="helix-status helix-status-ok">
                  <CheckCircle size={10} /> EXPORT READY ·{' '}
                  {p.export_readiness_score}/100
                </span>
              )}
            </div>
            <p className="text-[15px] leading-relaxed text-[#F5F5F5]">
              {p.description}
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#1A7A6E]/15">
              <DetailCard
                label="Min Order Qty"
                value={`${p.min_order_qty} ${p.unit}`}
              />
              <DetailCard label="Unit" value={p.unit} />
              <DetailCard
                label="Status"
                value={<StatusPill status={p.status} />}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
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
              >
                Request quotation
              </button>
            ) : user && user.role === 'exporter' ? (
              <div className="mt-5 text-[12px] text-[#9CA3AF]">
                Exporter view — buyers can RFQ.
              </div>
            ) : (
              <a
                href="/login"
                className="helix-btn-primary w-full mt-5 text-center block"
              >
                Sign in to RFQ
              </a>
            )}
          </div>

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
              <div className="flex gap-2 pt-2">
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

      {open && <RequestQuotationModal />}
    </div>
  );
};

export default MarketPlaceDetails;
