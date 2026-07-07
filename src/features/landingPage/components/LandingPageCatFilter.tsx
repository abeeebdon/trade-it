'use client';

import { getCategoryIcon } from '@/components/icons/CategoryIcon';
import { useGetProductCategories } from '@/features/exporter/hooks/useProducts';

interface LandingPageCatFilterProps {
  setCategory: (value: string) => void;
  showFullCategory?: boolean;
  category: string;
}

const LandingPageCatFilter = ({
  setCategory,
  showFullCategory,
  category,
}: LandingPageCatFilterProps) => {
  const { data, isPending } = useGetProductCategories();

  const handleSelect = (value: string) => {
    setCategory(value);
  };

  if (isPending) {
    return (
      <article className="flex py-1 max-w-[90vw] hide-scrollbar overflow-x-scroll gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="helix-card min-w-42 shrink-0 space-y-1 p-4 py-3 text-left animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-white/10" />
              <div className="h-4 w-20 rounded bg-white/10" />
            </div>
            <div className="h-3.5 w-28 rounded bg-white/10 mt-1.5" />
          </div>
        ))}
      </article>
    );
  }

  return (
    <section className="mb-4 ">
      <div className="flex items-end justify-between mb-5">
        <h2 className="helix-h3">Shop by category</h2>
      </div>
      <article className="flex py-1 max-w-[90vw] hide-scrollbar overflow-x-scroll gap-4">
        {data?.data?.map((cat) => {
          const Icon = getCategoryIcon(cat.name);
          return showFullCategory ? (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.name)}
              className={`helix-card min-w-42 shrink-0 cursor-pointer space-y-1 p-4 py-3 text-left ${
                category === cat.name ? 'ring-1 ring-[#C9922A]' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                {Icon && <Icon color="#f39c12" className="w-5 h-5" />}{' '}
                <p className="text-[12px] font-semibold leading-tight">
                  {cat.name}
                </p>
              </div>
              <p className="text-[10.5px] text-[#9CA3AF] mt-1.5">
                {cat.description}
              </p>
            </button>
          ) : (
            <button
              onClick={() => setCategory(cat.name)}
              key={cat.id}
              className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase border ${category === cat.name ? 'bg-[#1A7A6E]/20 text-[#1A7A6E] border-[#1A7A6E]' : 'border-[#1A7A6E]/30 text-[#9CA3AF] hover:border-[#1A7A6E]/60'}`}
            >
              {cat.name}
            </button>
          );
        })}
      </article>
    </section>
  );
};

export default LandingPageCatFilter;
