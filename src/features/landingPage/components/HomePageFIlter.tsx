import {
  FilterButton,
  HomePageFilterProps,
} from '@/features/shops/types/shops';
import { Store, Truck } from 'lucide-react';

const HomePageFIlter = ({
  mode,
  category,
  clearCategory,
  clearMode,
  setMode,
}: HomePageFilterProps) => {
  const filterButtons: FilterButton[] = [
    {
      label: 'All Categories',
      onClick: clearCategory,
      active: !category || category === '',
    },
    {
      label: 'All sources',
      onClick: clearMode,
      active: !mode || mode === '',
    },
    {
      label: 'US In-Stock · 48hr',
      onClick: () => setMode('riby_dtc'),
      active: mode === 'riby_dtc',
      icon: Store,
    },
    {
      label: 'Direct from Africa · Riby of Record',
      onClick: () => setMode('buyer_local'),
      active: mode === 'buyer_local',
      icon: Truck,
    },
  ];
  return (
    <article className="flex flex-wrap gap-3 mb-4 items-center">
      {filterButtons.map((button) => {
        const Icon = button.icon;

        return (
          <button
            key={button.label}
            onClick={button.onClick}
            className={`px-4 py-2 rounded-full text-[12px] border cursor-pointer inline-flex items-center gap-2 ${
              button.active
                ? 'bg-[#C9922A] text-bg border-[#C9922A]'
                : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'
            }`}
          >
            {Icon && <Icon size={10} />}
            {button.label}
          </button>
        );
      })}
    </article>
  );
};

export default HomePageFIlter;
