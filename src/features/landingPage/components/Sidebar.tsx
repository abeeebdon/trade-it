'use client';
import Image from 'next/image';
import { NAV } from './data';
import { useAppSelector } from '@/hooks/store/store';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import LogoutModal from './LogoutModal';
import { cookiesStorage } from '@/lib/helpers/cookie';

NAV.super_admin = NAV.admin;

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const items = NAV[user?.role ?? 'admin'] || NAV.exporter;
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      cookiesStorage.clearAll();
      setLoading(false);
      router.push('/login');
    }, 3000);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen hidden sm:flex w-16 lg:w-60 bg-bg border-r border-[#1A7A6E]/20  flex-col z-40">
      <div className="px-4 lg:px-6 py-5 border-b border-[#1A7A6E]/15 flex items-center gap-2">
        <Image
          src="/jomp-icon.png"
          alt="Jomp"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <div className="hidden lg:flex flex-col leading-tight">
          <span className="font-bold tracking-[0.2em] text-[13px]">
            JOMP SHOP
          </span>
          <span className="text-[9px] tracking-[0.3em] text-[#1A7A6E] font-mono">
            EXPORT OS v1.1
          </span>
        </div>
      </div>

      <nav className="flex-1 mt-6 py-4 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.to === pathname;
          return (
            <Link
              key={item.to}
              href={item.to}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              className={`group flex items-center gap-3 px-4 lg:px-6 py-3 border-l-2 transition-colors ${
                isActive
                  ? 'border-[#C9922A] bg-[#C9922A]/6 text-[#C9922A]'
                  : 'border-transparent text-[#9CA3AF] hover:text-[#F5F5F5] hover:bg-[#1A7A6E]/8'
              }`}
            >
              {<Icon size={18} />}
              <span className="hidden lg:block text-[13px] font-medium tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#1A7A6E]/15 px-3 lg:px-4 py-3">
        <div className="hidden lg:flex items-center gap-2 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-[#C9922A] font-bold text-xs">
            {user?.name?.[0] || 'H'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium truncate">{user?.name}</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#1A7A6E]">
              {user?.role}
            </div>
          </div>
        </div>
        <button
          data-testid="logout-btn"
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-[#9CA3AF] hover:text-[#F5F5F5] hover:bg-[#1A7A6E]/10 text-[12px] transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden lg:inline">Sign out</span>
        </button>
      </div>
      <LogoutModal
        open={showLogoutModal}
        onConfirm={logout}
        onClose={() => setShowLogoutModal(false)}
        loading={loading}
      />
    </aside>
  );
}
