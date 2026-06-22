'use client';

import { useSearchParams } from 'next/navigation';
import { useGetMarketPlaceById } from '../hooks/useMarketDetails';
import { useMemo, useState } from 'react';
import RequestQuotationModal from '../components/RequestQuotationModal';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatNGN, formatUSD } from '@/lib/func';
import { useAppSelector } from '@/hooks/store/store';
import DetailCard from '@/components/custom/DetailCard';
import Image from 'next/image';
import { Product } from '@/features/landingPage/types/home';
import { Loading } from '@/components/loading';

const MarketPlaceDetails = () => {
  const searchParams = useSearchParams();
  const { user } = useAppSelector((state) => state.auth);
  const id = searchParams.get('id') ?? '';
  const [open, setOpen] = useState(false);

  const { data, isPending } = useGetMarketPlaceById({ id });
  const productDetails: Product = useMemo(() => {
    return data ? data : ({} as Product);
  }, [data]);
  const canRfq = user && user.role === 'retailer';
  console.log(user);
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 helix-card overflow-hidden">
          <div className="aspect-video bg-[#0A1628]">
            <Image
              src={productDetails.thumbnailImage}
              alt={productDetails.productName}
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {/* {p.compliance_badges?.map((b) => (
                <span key={b} className="helix-status helix-status-gold">
                  {b}
                </span>
              ))}
              {p.export_readiness_score >= 80 && (
                <span className="helix-status helix-status-ok">
                  <CheckCircle size={10} /> EXPORT READY ·{' '}
                  {p.export_readiness_score}/100
                </span>
              )} */}
            </div>
            <p className="text-[15px] leading-relaxed text-[#F5F5F5]">
              {productDetails.description}
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#1A7A6E]/15">
              <DetailCard
                label="Min Order Qty"
                value={`${productDetails.moq} ${productDetails.unit}`}
              />
              <DetailCard label="Unit" value={productDetails.unit} />
              <DetailCard
                label="Status"
                value={<StatusPill status={productDetails.exportStatus} />}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="helix-card p-6">
            <div className="helix-label">Price per {productDetails.unit}</div>
            <div className="font-mono text-4xl text-[#C9922A] font-bold mt-1">
              {formatUSD(productDetails.priceUsd)}
            </div>
            <div className="text-[12px] text-[#9CA3AF] font-mono">
              {formatNGN(productDetails.priceUsd)}
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

          {/* <div className="helix-card p-6">
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
          </div> */}
        </div>
      </div>

      {open && (
        <RequestQuotationModal setOpen={setOpen} product={productDetails} />
      )}
    </div>
  );
};

export default MarketPlaceDetails;
