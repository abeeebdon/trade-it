'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import type { ReactNode } from 'react';
import ThemeToggle from '@/components/buttons/ToggleButton';

interface HeaderProps {
  title: ReactNode;
  kicker?: ReactNode;
  actions?: ReactNode;
  cartCount: number;
}

export default function Header({
  title,
  kicker,
  actions,
  cartCount,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20  bg-[##1E0038]/95 backdrop-blur border-b border-[#1E0038]/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div>
          {kicker && (
            <div className="helix-kicker mb-1" data-testid="page-kicker">
              {kicker}
            </div>
          )}
          <h1 className="helix-h2" data-testid="page-title">
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {actions}
          <ThemeToggle />
          <Link
            href="/consumer/cart"
            className="relative text-[#9CA3AF] hover:text-[#C9922A]"
            title="Cart"
            data-testid="cs-cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#EFA005] text-[#1E0038] text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 inline-flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
