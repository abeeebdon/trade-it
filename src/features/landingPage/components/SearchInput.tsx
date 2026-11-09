'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/components/debounce/useDebounce';
import { CustomSearchInput } from '@/components/form/CustomSearchInput';

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
      <CustomSearchInput
        id="header-search"
        className="h-9 gap-2 rounded-full border-[#1A7A6E]/30 bg-transparent px-3 focus-within:border-[#C9922A]/50"
        inputClassName="w-30 lg:w-40 text-xs text-[13px]"
        value={search}
        onChange={setSearch}
        placeholder="Search products…"
      />
    </form>
  );
};

export default SearchInput;
