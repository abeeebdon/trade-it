'use client';

type FilterValue = 'quotes' | 'orders' | '';

interface FilterTabsProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}

const TABS: { value: FilterValue; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'quotes', label: 'Quote Requests' },
  { value: 'orders', label: 'My Orders' },
];
const OrderPageFilter = ({ active, onChange }: FilterTabsProps) => {
  return (
    <div className="flex gap-2">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 outline-none rounded border text-[12px] min-w-20 font-semibold transition ${
            active === tab.value
              ? 'border-[#C9922A] bg-[#C9922A]/8 text-[#C9922A]'
              : 'border-[#1A7A6E]/30 text-[#9CA3AF]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default OrderPageFilter;
