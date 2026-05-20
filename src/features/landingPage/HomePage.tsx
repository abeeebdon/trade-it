'use client';
import { useEffect, useState } from 'react';
import ListingCard from '../shops/components/ListingCard';
import { CATS, goodslistings, Listing } from '../shops/components/data';
import { Search, Store, Truck } from 'lucide-react';
import { ListingCardSkeleton } from '../shops/components/ListingCardSkeleton';
import { useRouter, useSearchParams } from 'next/navigation';

export default function HomePage() {
  const [items, setItems] = useState<Listing[]>([]);
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') ?? '';
  const category = searchParams.get('category') ?? '';
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  const setMode = (value: string) => {
    params.set('mode', value);

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };
  const setCategory = (value: string) => {
    params.set('category', value);

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSimulate = () => {
      setLoading(true);

      const simulateFetch = setTimeout(() => {
        let filteredItems = [...goodslistings];

        if (category) {
          filteredItems = filteredItems.filter(
            (item) => item.category === category,
          );
        }

        if (mode) {
          filteredItems = filteredItems.filter(
            (item) => item.fulfillment_mode === mode,
          );
        }

        if (search.trim()) {
          filteredItems = filteredItems.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase()),
          );
        }

        setItems(filteredItems);
        setLoading(false);
      }, 1500);

      return () => clearTimeout(simulateFetch);
    };
    fetchSimulate();
  }, [mode, category, search]);
  const clearCategory = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };
  const clearMode = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('mode');
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };
  const showCategoryGrid = !category && !mode && !search;
  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <main className="min-h-screen  bg-white text-[] dark:bg-[#0A1628] w-full max-w-350 mx-auto dark:text-[#F5F5F5]">
      {/* Hero */}
      <section className="mb-10  relative">
        <div className="helix-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#C9922A]/10 blur-3xl pointer-events-none" />
          <div className="helix-kicker mb-3">
            Africa&apos;s marketplace · From maker to your door
          </div>
          <h1 className="helix-h1 max-w-4xl">
            Shop authentic African goods. Direct from makers.
          </h1>
          <p className="text-[15px] text-[#9CA3AF] mt-5 max-w-2xl leading-relaxed">
            Fashion, food, beauty, art &amp; home — sourced direct from verified
            African makers. Buy from US warehouses for 48-hour delivery, or
            order direct with <span className="font-bold">Riby Inc</span> as
            your delivery partner of record. Every order is{' '}
            <span className="font-bold">escrow-protected</span>.
          </p>
          <form
            onSubmit={submitSearch}
            className="mt-7 flex gap-2 max-w-2xl"
            data-testid="hero-search-form"
          >
            <div className="flex-1 flex items-center h-14 gap-2  helix-input">
              <label htmlFor="hero-search border">
                <Search size={18} className="  text-[#9CA3AF]" />
              </label>
              <input
                value={search}
                id="hero-search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search shea butter, ankara, cocoa beans, jewelry…"
                className="w-full text-[15px] py-3.5 border-none outline-none"
              />
            </div>
            <button
              type="submit"
              className="helix-btn-primary px-7"
              data-testid="hero-search-submit"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Mode filters */}
      <article className="flex flex-wrap gap-3 mb-8 items-center">
        <button
          onClick={clearCategory}
          className={`cursor-pointer px-4 py-2 rounded-full text-[12px] border ${!category || category == '' ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]' : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'}`}
        >
          All Categories
        </button>
        <button
          onClick={clearMode}
          className={`px-4 py-2 rounded-full text-[12px] border ${!mode || mode == '' ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]' : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'}`}
        >
          All sources
        </button>
        <button
          onClick={() => setMode('riby_dtc')}
          className={`px-4 py-2 rounded-full text-[12px] border inline-flex items-center gap-2 ${mode === 'riby_dtc' ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]' : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'}`}
        >
          <Store size={14} /> US In-Stock · 48hr
        </button>
        <button
          onClick={() => setMode('buyer_local')}
          className={`px-4 py-2 rounded-full text-[12px] border inline-flex items-center gap-2 ${mode === 'buyer_local' ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]' : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'}`}
        >
          <Truck size={14} /> Direct from Africa · Riby of Record
        </button>
      </article>

      {/* Category chips */}
      {showCategoryGrid && (
        <section className="mb-10">
          <div className="flex items-end justify-between mb-5">
            <h2 className="helix-h3">Shop by category</h2>
          </div>
          <article className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 justify-around">
            {CATS.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className="helix-card cursor-pointer space-y-1 p-4 text-left hover:border-[#C9922A]/60 transition-colors group"
                // className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase border ${category === c.value ? 'bg-[#1A7A6E]/20 text-[#1A7A6E] border-[#1A7A6E]' : 'border-[#1A7A6E]/30 text-[#9CA3AF] hover:border-[#1A7A6E]/60'}`}
              >
                {c.icon}
                <p className="text-[13px] font-semibold leading-tight">
                  {c.label}
                </p>
                <p className="text-[10.5px] text-[#9CA3AF] mt-1.5 line-clamp-2">
                  {c.hint}
                </p>
              </button>
            ))}
          </article>
        </section>
      )}
      {!showCategoryGrid && (
        <div className="flex flex-wrap gap-2 mb-8">
          {CATS.map((c) => (
            <button
              key={c.value}
              className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase border ${category === c.value ? 'bg-[#1A7A6E]/20 text-[#1A7A6E] border-[#1A7A6E]' : 'border-[#1A7A6E]/30 text-[#9CA3AF] hover:border-[#1A7A6E]/60'}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
      <section>
        <h2 className="text-lg font-semibold mb-5">
          {showCategoryGrid ? 'Featured today' : `${items.length} products`}
        </h2>
        {loading ? (
          <article className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <ListingCardSkeleton key={i} />
            ))}
          </article>
        ) : (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
      </section>
    </main>
  );
}
