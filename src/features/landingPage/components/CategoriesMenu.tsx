'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import NavGroup from '@/components/nav/NavGroup';
import MobileNavGroup from '@/components/nav/MobileNavGroup';
import { useGetProductCategories } from '@/features/exporter/hooks/useProducts';

interface CategoriesMenuProps {
  /** 'desktop' renders the hover dropdown; 'mobile' renders the collapsible sidebar variant. */
  variant?: 'desktop' | 'mobile';
  /** Called after a category is selected — e.g. to close a mobile sidebar. */
  onNavigate?: () => void;
}

const CategoriesMenu = ({
  variant = 'desktop',
  onNavigate,
}: CategoriesMenuProps) => {
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
    onNavigate?.();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    if (link) {
      e.preventDefault();
      handleCategoryClick(link.getAttribute('href')!);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2 font-medium transition-colors text-md text-muted animate-pulse">
        Categories
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div onClick={handleNavClick}>
        <MobileNavGroup
          label="Categories"
          items={items}
          onNavigate={onNavigate}
        />
      </div>
    );
  }

  return (
    <div onClick={handleNavClick}>
      <NavGroup label="Categories" items={items} />
    </div>
  );
};

export default CategoriesMenu;
