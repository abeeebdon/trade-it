'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Pagination from '../components/pagination';
import ProductCard from '../components/ProductCard';
import { useGetCatalogProducts } from '../hooks/useGetCatalogProducts';

// Constants

const PER_PAGE = 12;

const CATEGORIES = [
  { value: '', label: 'All Sectors' },
  { value: 'fashion', label: 'Fashion & Textiles' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'staple-foods', label: 'Staple Foods' },
  { value: 'general-goods', label: 'General Goods' },
];

// Catalog

export default function Catalog() {
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useGetCatalogProducts({
    pageNumber: page,
    pageSize: PER_PAGE,
    category: category || undefined,
    country: country || undefined,
  });

  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  // Reset to page 1 when filters change
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // Client-side search filter against the current page results
  const filtered = search
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()),
      )
    : products;

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Category filters  */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => handleCategoryChange(c.value)}
                className={`px-4 py-2 rounded-full text-[12px] font-medium border transition ${
                  category === c.value
                    ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]'
                    : 'bg-transparent text-[#9CA3AF] border-[#1A7A6E]/40 hover:border-[#1A7A6E]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="helix-input pl-9 w-64"
            />
          </div>
        </div>

        {/* Country filter */}
        <div>
          <select
            className="helix-input w-40"
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            <option value="">All Countries</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="Kenya">Kenya</option>
          </select>
        </div>
      </div>

      {/* Loading skeleton */}
      {isPending && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="helix-card overflow-hidden animate-pulse opacity-40"
            >
              <div className="aspect-[4/3] bg-[#1A7A6E]/10" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-[#1A7A6E]/10 rounded w-1/3" />
                <div className="h-4 bg-[#1A7A6E]/10 rounded w-3/4" />
                <div className="h-4 bg-[#1A7A6E]/10 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center text-[#9CA3AF] py-20">
          Failed to load products. Please refresh.
        </div>
      )}

      {/* Grid */}
      {!isPending && !isError && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center text-[#9CA3AF] py-20">
                No products match your filters.
              </div>
            )}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(np) => {
              setPage(np);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </>
      )}
    </>
  );
}
