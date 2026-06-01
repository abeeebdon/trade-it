'use client';
import { NAV } from './data';
import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import LogoutModal from './LogoutModal';
import { logoutAction } from '@/app/action/auth';
import { logout } from '@/store/auth/auth.slice';
import JompShopLogo from '@/assets/JompShopIcon';
import useColorScheme from '@/hooks/useColorScheme';

NAV.super_admin = NAV.admin;

export default function Sidebar() {
  const isDark = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const items = NAV[user?.role ?? 'admin'] || NAV.exporter;
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useAppDispatch();
  const handlelogout = () => {
    setLoading(true);
    setTimeout(() => {
      logoutFn();
      setLoading(false);
    }, 2000);
  };
  const logoutFn = async () => {
    await logoutAction();
    dispatch(logout());
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen hidden sm:flex w-16 lg:w-60 bg-bg border-r border-secondary/20  flex-col z-40">
      <div className="px-4 lg:px-6 py-5 border-b border-[#1A7A6E]/15 flex items-center gap-2">
        <div className="">
          <JompShopLogo
            primaryColor={isDark ? 'white' : '#31005C'}
            secondaryColor={isDark ? '#EFA005' : '#EFA005'}
            width={40}
            height={60}
          />
        </div>
        <div className="hidden lg:flex flex-col leading-tight">
          <span className="font-bold text-secondary tracking-[0.2em] text-[13px]">
            JOMP SHOP
          </span>
          <span className="text-[9px] tracking-[0.3em] dark:text-[#1A7A6E] text-[#4a2e8a]  font-mono">
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
              className={`group flex items-center gap-3 px-4 lg:px-6 py-3 border-l-2 transition-colors ${
                isActive
                  ? 'border-[#C9922A] bg-[#C9922A]/6 text-[#C9922A]'
                  : 'border-transparent text-[#9CA3AF] hover:text-[#F5F5F5] hover:bg-secondary/50'
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
          <p className="w-8 h-8 rounded-full bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-[#C9922A] font-bold text-xs">
            {user?.name?.[0] || 'H'}
          </p>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-muted truncate">
              {user?.name}
            </p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#1A7A6E]">
              {user?.role}
            </p>
          </div>
        </div>
        <button
          data-testid="logout-btn"
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-[#9CA3AF] hover:text-[#F5F5F5] hover:bg-secondary/50 text-[12px] transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden lg:inline">Sign out</span>
        </button>
      </div>
      <LogoutModal
        open={showLogoutModal}
        onConfirm={handlelogout}
        onClose={() => setShowLogoutModal(false)}
        loading={loading}
      />
    </aside>
  );
}
