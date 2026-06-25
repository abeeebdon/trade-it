'use client';
import { NAV } from './data';
import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import Link from 'next/link';
import { ChevronLast, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import LogoutModal from './LogoutModal';
import { logout } from '@/store/auth/auth.slice';
import JompShopLogo from '@/assets/JompShopIcon';
import useColorScheme from '@/hooks/useColorScheme';
import { logoutAction } from '@/features/authentication/components/helper';
import { cn } from '@/lib/cn';

NAV.super_admin = NAV.admin;

export default function Sidebar() {
  const isDark = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const [hideLabel, setHideLabel] = useState(false);
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
    <aside
      className={`relative h-screen hidden sm:flex bg-bg border-r border-secondary/20  flex-col z-40 ${hideLabel ? 'w-20' : 'max-w-60'}`}
    >
      <div className="px-4 py-5 border-b border-[#1A7A6E]/15 flex items-center gap-2">
        <JompShopLogo
          primaryColor={isDark ? 'white' : '#31005C'}
          secondaryColor={isDark ? '#EFA005' : '#EFA005'}
          width={40}
          height={60}
          className=""
        />
        <button
          onClick={() => setHideLabel((prev) => !prev)}
          className="absolute hidden md:block -right-1 z-50 top-20 bg-bg border border-secondary/30 rounded-full p-1 shadow"
        >
          <ChevronLast
            size={16}
            className={cn(
              'transition-transform duration-300',
              !hideLabel && 'rotate-180',
            )}
          />
        </button>
        {!hideLabel && (
          <div className="hidden md:flex flex-col ">
            <span className="font-bold text-secondary tracking-widest text-lg">
              JOMPSHOP
            </span>
            <span className="text-xs ml-0.5  dark:text-[#1A7A6E] text-[#4a2e8a]  font-mono">
              EXPORT OS v1.1
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1  mt-6 py-4 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.to === pathname;
          return (
            <div key={item.to} className="group overflow-hidden relative">
              <Link
                href={item.to}
                className={`flex items-center gap-3 px-4  py-3 border-l-2 ${
                  isActive
                    ? 'border-[#C9922A] bg-[#C9922A]/6 text-[#C9922A]'
                    : 'border-transparent text-[#9CA3AF] hover:text-[#F5F5F5] hover:bg-secondary/50'
                }`}
              >
                {<Icon size={18} />}
                {!hideLabel && (
                  <span className="hidden md:block text-muted text-[13px] font-medium tracking-wide">
                    {item.label}
                  </span>
                )}
              </Link>
              {hideLabel && (
                <p className="absolute left-full z-[9999] top-1/2 -translate-y-1/2 text-text whitespace-nowrap  text-xs hidden group-hover:block transition pointer-events-none">
                  {item.label}
                </p>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-[#1A7A6E]/15 px-3 py-3">
        <div className="hidden md:flex items-center gap-2 mb-3 px-2">
          <p className="w-8 h-8 rounded-full bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-[#C9922A] font-bold text-xs">
            {user?.fullName[0] || 'H'}
          </p>
          {!hideLabel && (
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-muted truncate">
                {user?.fullName}
              </p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#1A7A6E]">
                {user?.role}
              </p>
            </div>
          )}
        </div>
        <button
          data-testid="logout-btn"
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-[#9CA3AF] hover:text-[#F5F5F5] hover:bg-secondary/50 text-[12px] transition-colors"
        >
          <LogOut size={16} />
          {!hideLabel && <span className="hidden md:inline">Sign out</span>}
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
