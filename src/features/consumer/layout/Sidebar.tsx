'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBasket, LogOut } from 'lucide-react';
import { NAV_GROUPS } from './nav-config';
import NavGroup from './NavGroup';

export interface SidebarUser {
  name?: string;
  role?: string;
}

interface SidebarProps {
  user: SidebarUser | null;
  orderBadge: number;
  onSignOut: () => void;
}

export default function Sidebar({ user, orderBadge, onSignOut }: SidebarProps) {
  const initials =
    (user?.name || '')
      .split(' ')
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || '🙂';

  return (
    <aside className="w-16 lg:w-[240px] shrink-0 bg-[#1E0038] border-r border-[#1A7A6E]/15 flex flex-col sticky top-0 h-screen overflow-y-auto">
      <div className="px-4 lg:px-5 py-5 border-b border-white/5">
        <Link href="/" className="flex items-center">
          <Image
            src="/jompshop-icon.png"
            alt="JompShop"
            width={36}
            height={36}
            className="lg:hidden"
          />
          <Image
            src="/jompshop-logo-dark.png"
            alt="JompShop"
            width={140}
            height={32}
            className="hidden lg:block h-8 w-auto"
          />
        </Link>
      </div>

      {/* Profile block */}
      <div className="hidden lg:flex items-center gap-3 px-5 py-4 border-b border-white/5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px]"
          style={{
            background: 'linear-gradient(135deg,#EFA005,#7B2CBF)',
            color: '#1E0038',
          }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <div className="text-[13px] font-semibold truncate">
            {user?.name || 'Guest'}
          </div>
          <div className="text-[10px] text-[#B0A4C0] font-mono uppercase tracking-wider truncate">
            {user?.role || 'consumer'}
          </div>
        </div>
      </div>

      {/* Marketplace CTA */}
      <div className="px-3 pt-4">
        <Link
          href="/?beta=1"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-[10px] font-semibold text-[13px] transition-all"
          style={{ background: '#EFA005', color: '#1E0038' }}
        >
          <ShoppingBasket size={16} />
          <span className="hidden lg:inline">Marketplace</span>
        </Link>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-4">
        {NAV_GROUPS.map((group) => (
          <NavGroup key={group.label} group={group} orderBadge={orderBadge} />
        ))}
      </nav>

      <div className="border-t border-white/5 p-3">
        <button
          onClick={onSignOut}
          className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-[#B0A4C0] hover:text-[#F5F5F5] rounded"
          data-testid="cs-signout"
        >
          <LogOut size={13} />
          <span className="hidden lg:inline">Sign out</span>
        </button>
      </div>
    </aside>
  );
}
