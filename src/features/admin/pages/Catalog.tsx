'use client';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/admin';
import { products } from '../components/data';

const CATEGORIES = [
  { value: '', label: 'All Sectors' },
  { value: 'fashion', label: 'Fashion & Textiles' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'staple-foods', label: 'Staple Foods' },
  { value: 'general-goods', label: 'General Goods' },
];

export default function Catalog() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(products);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     const params = {};
  //     if (category) params.category = category;
  //     if (country) params.country = country;
  //     if (search) params.search = search;
  //     const { data } = await api.get('/products', { params });
  //     setItems(data);
  //     setLoading(false);
  //   })();
  // }, [category, country, search]);

  return (
    <main className="min-h-[70vh]">
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            data-testid={`filter-${c.value || 'all'}`}
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
        <select
          className="helix-input ml-auto w-40"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          data-testid="filter-country"
        >
          <option value="">All Countries</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Ghana">Ghana</option>
          <option value="Kenya">Kenya</option>
        </select>
      </div>

      {loading ? (
        <div className="text-[#9CA3AF]">Loading marketplace…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center text-[#9CA3AF] py-20">
              No products match your filters.
            </div>
          )}
        </div>
      )}
    </main>
  );
}
