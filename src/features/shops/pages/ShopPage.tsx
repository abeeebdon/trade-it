'use client';
import { useEffect, useState } from 'react';
import ShopShell from '../components/ShopShell';
import ListingCard from '../components/ListingCard';
import { CATS, goodslistings, Listing } from '../components/data';
import { Search, Store, Truck } from 'lucide-react';
import { ListingCardSkeleton } from '../components/ListingCardSkeleton';

export default function ShopPage() {
  const [items, setItems] = useState<Listing[]>([]);
  const [mode, setMode] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const simulateFetch = setTimeout(() => {
      const fetchedItems: Listing[] = goodslistings;
      setItems(fetchedItems);
      setLoading(false);
    }, 1500); // Simulate a 1.5 second fetch time

    return () => clearTimeout(simulateFetch); // Cleanup on unmount
  }, [mode, category, search]);

  return (
    <ShopShell setMode={setMode}>
      {/* Hero */}
      <section className="mb-10 relative">
        <div className="helix-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#C9922A]/10 blur-3xl pointer-events-none" />
          <div className="helix-kicker mb-3" data-aos="fade-down">
            Jomp Shop · From Africa, to your door
          </div>
          <h1 className="helix-h1 max-w-3xl" data-aos="zoom-in">
            Shop direct from verified African makers &amp; US warehouses.
          </h1>
          <p
            className="text-[15px] text-[#9CA3AF] mt-5 max-w-2xl leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Two ways to buy: pick from our US-stocked warehouse inventory for
            48-hour delivery, or order direct from Africa — <b>Riby Inc</b> is
            the delivery partner of record, handling import and last-mile.
          </p>
        </div>
      </section>

      {/* Mode filters */}
      <article className="flex flex-wrap gap-3 mb-8 items-center">
        <button
          onClick={() => setMode('')}
          className={`px-4 py-2 rounded-full text-[12px] border ${mode == '' ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]' : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'}`}
          data-testid="mode-all"
        >
          All sources
        </button>
        <button
          onClick={() => setMode('stock')}
          className={`px-4 py-2 rounded-full text-[12px] border inline-flex items-center gap-2 ${mode === 'stock' ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]' : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'}`}
          data-testid="mode-local"
        >
          <Store size={14} /> US In-Stock · 48hr
        </button>
        <button
          onClick={() => setMode('direct')}
          className={`px-4 py-2 rounded-full text-[12px] border inline-flex items-center gap-2 ${mode === 'direct' ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]' : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'}`}
          data-testid="mode-dtc"
        >
          <Truck size={14} /> Direct from Africa · Riby of Record
        </button>
        <div className="relative ml-auto flex items-center gap-2 p-2 px-3 border rounded-xl border-[#1A7A6E]/40    ">
          <Search size={14} />
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none border-none"
          />
        </div>
      </article>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATS.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase border ${category === c.value ? 'bg-[#1A7A6E]/20 text-[#1A7A6E] border-[#1A7A6E]' : 'border-[#1A7A6E]/30 text-[#9CA3AF] hover:border-[#1A7A6E]/60'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </article>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((l: Listing) => (
            <ListingCard key={l.id} l={l} />
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center text-[#9CA3AF] py-16">
              No listings match your filters.
            </div>
          )}
        </div>
      )}
    </ShopShell>
  );
}
