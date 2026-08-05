'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import NavGroup from '@/components/nav/NavGroup';
import { useGetProductCategories } from '@/features/exporter/hooks/useProducts';

const CategoriesMenu = () => {
  const router = useRouter();
  const { data, isPending } = useGetProductCategories();

  const items = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((cat) => ({
      label: cat.name,
      href: `/?category=${encodeURIComponent(cat.name)}`,
    }));
  }, [data]);

  const handleCategoryClick = (href: string) => {
    router.push(href, { scroll: false });
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2 font-medium transition-colors text-md text-muted animate-pulse">
        Categories
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        if (link) {
          e.preventDefault();
          handleCategoryClick(link.getAttribute('href')!);
        }
      }}
    >
      <NavGroup label="Categories" items={items} />
    </div>
  );
};

export default CategoriesMenu;
