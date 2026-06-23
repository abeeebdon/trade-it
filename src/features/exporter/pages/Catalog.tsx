'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Pagination from '../components/pagination';
import ProductCard from '../components/ProductCard';
import { useGetCatalogProducts } from '../hooks/useGetCatalogProducts';
import {
  useGetProductCategories,
  useGetProductCountries,
} from '../hooks/useProducts';

const PER_PAGE = 12;

// Catalog

export default function Catalog() {
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // API-driven filter options
  const { data: categoryData, isPending: categoriesLoading } =
    useGetProductCategories({ pageNumber: 1, pageSize: 100 });

  const { data: countryData, isPending: countriesLoading } =
    useGetProductCountries();

  const categoryOptions = categoryData?.data ?? [];
  const countryOptions = countryData?.data ?? [];

  // Products
  const { data, isPending, isError } = useGetCatalogProducts({
    pageNumber: page,
    pageSize: PER_PAGE,
    category: category || undefined,
    country: country || undefined,
  });

  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  // Reset to page 1 on filter change
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

  // Client-side search against current page — API has no search param
  const filtered = search
    ? products.filter(
        (p) =>
          p.productName.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()),
      )
    : products;

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Category filter buttons */}
          <div className="flex flex-wrap gap-2">
            {/* All button always present */}
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-full text-[12px] font-medium border transition ${
                category === ''
                  ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]'
                  : 'bg-transparent text-[#9CA3AF] border-[#1A7A6E]/40 hover:border-[#1A7A6E]'
              }`}
            >
              All Sectors
            </button>

            {/* Skeleton while loading */}
            {categoriesLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-24 rounded-full bg-[#1A7A6E]/10 animate-pulse opacity-40"
                  />
                ))
              : categoryOptions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCategoryChange(c.name)}
                    className={`px-4 py-2 rounded-full text-[12px] font-medium border transition ${
                      category === c.name
                        ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]'
                        : 'bg-transparent text-[#9CA3AF] border-[#1A7A6E]/40 hover:border-[#1A7A6E]'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
          </div>

          {/* Search */}
          <div className="flex items-center w-full max-w-60 p-2 rounded-xl border-border gap-2 border ">
            <Search size={14} className=" text-[#9CA3AF]" />
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full outline-none border-none"
            />
          </div>
        </div>

        {/* Country filter */}
        <div>
          {countriesLoading ? (
            <div className="helix-input w-40 h-10 animate-pulse opacity-40" />
          ) : (
            <select
              className="helix-input w-40"
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              <option value="">All Countries</option>
              {countryOptions.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
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
