'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/components/debounce/useDebounce';

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const debouncedSearch = useDebounce(search, 700);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set('q', debouncedSearch);
    } else {
      params.delete('q');
    }

    router.push(`/?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set('q', search);
    } else {
      params.delete('q');
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={submitSearch} className="hidden sm:flex items-center gap-2">
      <div className="flex items-center h-9 gap-2 rounded-full border border-[#1A7A6E]/30 px-3 bg-transparent focus-within:border-[#C9922A]/50 transition-colors">
        <label htmlFor="header-search">
          <Search size={14} className="text-[#9CA3AF]" />
        </label>
        <input
          id="header-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className="w-30 lg:w-40 text-[13px] bg-transparent border-none outline-none text-text text-xs placeholder:text-[#9CA3AF]"
        />
      </div>
    </form>
  );
};

export default SearchInput;
