'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Pagination from '../components/pagination';
import ProductCard from '../components/ProductCard';
import { products as mockProducts } from '../components/data';
import type { Product } from '../types/exporter';
import { paginate } from '@/lib/utils';

// ─── Constants ──────────────────────────────────────────────────────────────────

const PER_PAGE = 12;

const CATEGORIES = [
  { value: '', label: 'All Sectors' },
  { value: 'fashion', label: 'Fashion & Textiles' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'staple-foods', label: 'Staple Foods' },
  { value: 'general-goods', label: 'General Goods' },
];

// Catalog Page
export default function Catalog() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Simulated fetch
  useEffect(() => {
    setTimeout(() => {
      setItems(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  // Reset page on filter change
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
    }, 0);
    return () => clearTimeout(timer);
  }, [category, country, search]);

  // Filtering
  const filtered = useMemo(() => {
    return items.filter((p) => {
      const matchCat = category ? p.category === category : true;

      const matchCountry = country ? p.country === country : true;
      const matchSearch = search
        ? p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
        : true;

      return matchCat && matchCountry && matchSearch;
    });
  }, [items, category, country, search]);

  const paginated = paginate(filtered, page, PER_PAGE);

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Buttons (LEFT) */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
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

          {/* Search (RIGHT) */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="helix-input pl-9 w-64"
            />
          </div>
        </div>

        {/* Row 2: Select (below) */}
        <div>
          <select
            className="helix-input w-40"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">All Countries</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="Kenya">Kenya</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
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
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.items.map((it) => (
              <ProductCard key={it.id} p={it} />
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center text-[#9CA3AF] py-20">
                No products match your filters.
              </div>
            )}
          </div>

          <Pagination
            page={paginated.page}
            totalPages={paginated.totalPages}
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
