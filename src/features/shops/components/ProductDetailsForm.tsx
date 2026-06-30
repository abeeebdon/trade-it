'use client';

import { useState } from 'react';
import { formatUSD } from '@/lib/func';
import { Lock, Map, MessageCircle, Shield, Truck } from 'lucide-react';
import { ProductData } from '@/features/exporter/api/productsApi';
import { PrepayForm } from './PrepatForm';
import { QuoteForm } from './QuoteForm';

interface Quote {
  id: string;
  quote_number: string;
  quoted_unit_price_usd: number;
}

interface Props {
  productDetails: ProductData;
}

const ProductDetailsForm = ({ productDetails }: Props) => {
  const [mode, setMode] = useState<'prepay' | 'quote'>('prepay');
  const [quote] = useState<Quote | null>(null);

  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="helix-card p-6">
        <p className="helix-label">Price</p>

        <p className="font-mono text-4xl text-[#C9922A] font-bold mt-1">
          {formatUSD(productDetails.price)}
        </p>

        <div className="text-[12px] text-[#9CA3AF] mt-1">
          {productDetails.unit > 0
            ? `${productDetails.unit} in stock`
            : 'Sold out'}
        </div>

        {!quote && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode('prepay')}
              className={`p-3 rounded border text-left text-[12px] ${
                mode === 'prepay'
                  ? 'border-[#C9922A] bg-[#C9922A]/8'
                  : 'border-[#1A7A6E]/30'
              }`}
            >
              <div className="font-semibold flex items-center gap-1">
                <Lock size={12} /> Order & Prepay
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode('quote')}
              className={`p-3 rounded border text-left text-[12px] ${
                mode === 'quote'
                  ? 'border-[#C9922A] bg-[#C9922A]/8'
                  : 'border-[#1A7A6E]/30'
              }`}
            >
              <div className="font-semibold flex items-center gap-1">
                <MessageCircle size={12} /> Request Quote
              </div>
            </button>
          </div>
        )}

        {mode === 'prepay' ? (
          <PrepayForm productDetails={productDetails} />
        ) : (
          <QuoteForm productDetails={productDetails} />
        )}
      </div>

      {/* SHIPPING INFO (unchanged) */}
      <div className="helix-card p-5">
        <div className="helix-label">How this ships</div>
        <div className="mt-3 space-y-2 text-[13px]">
          <div className="flex items-start gap-2">
            <Truck size={16} className="text-[#C9922A] mt-0.5" />
            <div>International fulfillment + logistics handling</div>
          </div>
          <div className="flex items-start gap-2">
            <Map size={16} className="text-[#C9922A] mt-0.5" />
            <div>Import, duties & delivery handled by logistics partner</div>
          </div>
          <div className="flex items-start gap-2">
            <Shield size={16} className="text-[#C9922A] mt-0.5" />
            <div>Escrow protected payment system</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsForm;
