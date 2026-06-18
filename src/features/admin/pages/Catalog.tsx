'use client';
import { useMemo, useState } from 'react';

import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { useGetMarketPlaceProd } from '../hooks/useGetMarketPlaceProducts';
import { MarketPlaceProducts } from '../types/catalog';
import ProductCard from '../components/ProductCard';
import { useGetProductCategories } from '@/features/exporter/hooks/useProducts';

export default function Catalog() {
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const { data: productCategories, isPending: isFetchingCategory } =
    useGetProductCategories({ pageNumber: 1, pageSize: 10 });
  const { data, isPending } = useGetMarketPlaceProd({
    pageNumber: 1,
    pageSize: 10,
    category: category,
    search: '',
  });
  const productData: MarketPlaceProducts = useMemo(() => {
    return data ? data : ({} as MarketPlaceProducts);
  }, [data]);
  return (
    <main className="min-h-[70vh]">
      <div className="flex flex-wrap gap-2 mb-8">
        {isFetchingCategory ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-9 w-24 animate-pulse rounded-full bg-[#1A7A6E]/20"
              />
            ))}
          </>
        ) : (
          <>
            <button
              onClick={() => setCategory('')}
              className={`px-4 py-2 rounded-full text-[12px] font-medium border transition ${
                category === ''
                  ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]'
                  : 'bg-transparent text-[#9CA3AF] border-[#1A7A6E]/40 hover:border-[#1A7A6E]'
              }`}
            >
              All Sectors
            </button>
            {productCategories?.data.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.name)}
                className={`px-4 py-2 rounded-full text-[12px] font-medium border transition ${
                  category === c.name
                    ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]'
                    : 'bg-transparent text-[#9CA3AF] border-[#1A7A6E]/40 hover:border-[#1A7A6E]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </>
        )}
        <select
          className="helix-input ml-auto w-40"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">All Countries</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Ghana">Ghana</option>
          <option value="Kenya">Kenya</option>
        </select>
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {productData.data.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
          {productData.data.length === 0 && (
            <div className="col-span-full text-center text-[#9CA3AF] py-20">
              No products match your filters.
            </div>
          )}
        </div>
      )}
    </main>
  );
}
