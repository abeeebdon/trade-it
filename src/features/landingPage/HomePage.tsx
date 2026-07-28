'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import HomePageFIlter from './components/HomePageFIlter';
import { useDebounce } from '@/components/debounce/useDebounce';
import HomepageProducts from './components/HomepageProducts';
import LandingPageCatFilter from './components/LandingPageCatFilter';

export default function HomePage() {
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

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

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
            <button type="submit" className="helix-btn-primary py-2! px-7">
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
      <LandingPageCatFilter
        showFullCategory={showCategoryGrid}
        setCategory={setCategory}
        category={category}
      />

      <HomepageProducts
        showCategoryGrid={showCategoryGrid}
        category={category}
        debouncedSearch={debouncedSearch}
      />
    </main>
  );
}
