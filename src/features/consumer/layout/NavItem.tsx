'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItemConfig } from './nav-config';

interface NavItemProps {
  item: NavItemConfig;
  badge?: number;
  showLabel?: boolean;
}

export default function NavItem({
  item,
  badge = 0,
  showLabel = false,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-4 py-2 rounded-md text-[13px] transition-all border-l-2 ${
        isActive
          ? 'border-[#C9922A] text-[#C9922A] bg-[#C9922A]/10 font-semibold'
          : 'border-transparent text-[#9CA3AF] hover:text-[#F5F5F5] hover:bg-white/5'
      }`}
    >
      <Icon size={16} />
      <span
        className={
          showLabel == true
            ? 'inline flex-1 truncate'
            : showLabel == false
              ? 'hidden flex-1 truncate'
              : 'hidden lg:inline flex-1 truncate'
        }
      >
        {item.label}
      </span>
      {badge > 0 && (
        <span className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded-full bg-[#EFA005] text-[#1E0038] font-semibold">
          {badge}
        </span>
      )}
    </Link>
  );
}
