'use client';
import { useEffect, useState } from 'react';
import ListingCard from '../shops/components/ListingCard';
import { CATS, goodslistings, Listing } from '../shops/components/data';
import { Search } from 'lucide-react';
import { ListingCardSkeleton } from '../shops/components/ListingCardSkeleton';
import { useRouter, useSearchParams } from 'next/navigation';
import HomePageFIlter from './components/HomePageFIlter';

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
    <main className="min-h-screen bg-white  dark:bg-[#0A1628] w-full max-w-350 mx-auto dark:text-[#F5F5F5]">
      {/* Hero */}
      <section className="mb-4 relative">
        <div className="helix-card p-6  md:px-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#C9922A]/15 blur-3xl pointer-events-none" />
          <p className="helix-kicker mb-3" data-aos="fade-down">
            Africa&apos;s marketplace · From maker to your door
          </p>
          <h1 className="helix-h2 max-w-4xl">
            Shop authentic African goods. Direct from makers.
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1 max-w-2xl leading-relaxed">
            Fashion, food, beauty, art &amp; home — sourced direct from verified
            African makers. Buy from US warehouses for 48-hour delivery, or
            order direct with <span className="font-bold">Riby Inc</span> as
            your delivery partner of record. Every order is{' '}
            <span className="font-bold">escrow-protected</span>.
          </p>
          <form
            onSubmit={submitSearch}
            className="mt-4 flex sm:flex-row flex-col gap-2 max-w-2xl"
            data-testid="hero-search-form"
          >
            <div className="flex-1 flex items-center h-12 gap-2  helix-input">
              <label htmlFor="hero-search border">
                <Search size={18} className="  text-[#9CA3AF]" />
              </label>
              <input
                value={search}
                id="hero-search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search shea butter, ankara, cocoa beans, jewelry…"
                className="w-full text-sm py-1.5 sm:text-[15px] sm:py-3.5 border-none outline-none"
              />
            </div>
            <button
              type="submit"
              className="helix-btn-primary py-2! px-7"
              data-testid="hero-search-submit"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Mode filters */}
      <HomePageFIlter
        category={category}
        clearMode={clearMode}
        mode={mode}
        setMode={setMode}
        clearCategory={clearCategory}
      />

      {/* Category chips */}
      {showCategoryGrid && (
        <section className="mb-4 ">
          <div className="flex items-end justify-between mb-5">
            <h2 className="helix-h3">Shop by category</h2>
          </div>
          <article className="flex py-1 max-w-[90vw] hide-scrollbar overflow-x-scroll gap-4">
            {CATS.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className="helix-card min-w-42 shrink-0 cursor-pointer space-y-1 p-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  {c.icon}
                  <p className="text-[12px] font-semibold leading-tight">
                    {c.label}
                  </p>
                </div>
                <p className="text-[10.5px] text-[#9CA3AF] mt-1.5 ">{c.hint}</p>
              </button>
            ))}
          </article>
        </section>
      )}
      {!showCategoryGrid && (
        <div className="flex flex-wrap gap-2 mb-8">
          {CATS.map((c) => (
            <button
              onClick={() => setCategory(c.value)}
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
