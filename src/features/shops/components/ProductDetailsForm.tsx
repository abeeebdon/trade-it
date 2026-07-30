'use client';

import { useState } from 'react';
import { formatUSD } from '@/lib/func';
import { Map, Shield, Truck } from 'lucide-react';
import { ProductData } from '@/features/exporter/api/productsApi';
import { PrepayForm } from './PrepatForm';
import { QuoteForm } from './QuoteForm';
import { orderModes } from './data';

interface Props {
  productDetails: ProductData;
}

const ProductDetailsForm = ({ productDetails }: Props) => {
  const [mode, setMode] = useState('prepay');
  return (
    <section className="lg:col-span-2 space-y-4">
      <article className="border border-border rounded p-6">
        <p className="helix-label">Price</p>

        <p className="font-mono text-4xl text-[#C9922A] font-bold mt-1">
          {formatUSD(productDetails.priceUsd ?? productDetails.price)}
        </p>

        <div className="text-[12px] text-[#9CA3AF] mt-1">
          {productDetails.unit > 0
            ? `${productDetails.unit} in stock`
            : 'Sold out'}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {orderModes.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={`p-3 rounded border text-left text-[12px] ${
                mode === value
                  ? 'border-[#C9922A] bg-[#C9922A]/8'
                  : 'border-[#1A7A6E]/30'
              }`}
            >
              <div className="font-semibold flex items-center gap-1">
                <Icon size={12} />
                {label}
              </div>
            </button>
          ))}
        </div>

        {mode === 'prepay' ? (
          <PrepayForm productDetails={productDetails} />
        ) : (
          <QuoteForm productDetails={productDetails} />
        )}
      </article>

      {/* SHIPPING INFO (unchanged) */}
      <article className="p-5 bg-surface border border-border rounded">
        <p className="helix-label">How this ships</p>
        <div className="mt-3 space-y-2 text-[13px]">
          <div className="flex items-start gap-2">
            <Truck size={16} className="text-[#C9922A] mt-0.5" />
            <p>International fulfillment + logistics handling</p>
          </div>
          <div className="flex items-start gap-2">
            <Map size={16} className="text-[#C9922A] mt-0.5" />
            <p>Import, duties & delivery handled by logistics partner</p>
          </div>
          <div className="flex items-start gap-2">
            <Shield size={16} className="text-[#C9922A] mt-0.5" />
            <p>Escrow protected payment system</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProductDetailsForm;
