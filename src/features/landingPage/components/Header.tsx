'use client';
import ThemeToggle from '@/components/buttons/ToggleButton';
import { ChevronDown, LogOut, Menu, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';
import SidebarComp from './SidebarComp';
import { NAV_LINKS } from './data';
import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import { cn } from '@/lib/cn';
import useColorScheme from '@/hooks/useColorScheme';
import JompsShopLogoDark from '@/assets/JompshopLogoDark';
import JompsShopLogo from '@/assets/jompshop_logo';
import { logoutAction } from '@/features/authentication/components/helper';
import { logout } from '@/store/auth/auth.slice';
import { useRouter } from 'next/navigation';
import LogoutModal from './LogoutModal';
const Header = ({ className }: { className?: string }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const isDark: boolean = useColorScheme();
  const dashHome =
    user?.role === 'consumer'
      ? '/shop/orders'
      : user?.role === 'super_admin'
        ? '/admin/credit'
        : user?.role === 'retailer'
          ? '/buyer'
          : user
            ? `/${user?.role}`
            : null;
  const handleLogout = async () => {
    await logoutAction();
    dispatch(logout());
    router.push('/login');
  };
  return (
    <>
      <header
        className={
          (cn(
            'fixed top-0 inset-x-0 z-30  dark:bg-[#0A1628]/85 bg-[#ffffffee] backdrop-blur border-b border-[#1A7A6E]/15',
          ),
          className)
        }
      >
        <div className="max-w-350 mx-auto px-6 lg:px-10 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            {isDark ? (
              <JompsShopLogoDark width={120} />
            ) : (
              <JompsShopLogo width={120} />
            )}
          </Link>
          <nav className="hidden md:flex items-center lg:gap-8 gap-2 md:gap-4 text-[13px] text-[#9CA3AF]">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-muted hover:text-text"
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link
                href="/register?role=exporter"
                className="text-muted hover:text-text"
              >
                Become a Seller
              </Link>
            )}

            {user?.role === 'consumer' && (
              <Link href="/shop/orders" className="text-muted hover:text-text">
                My Orders
              </Link>
            )}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer border-[#1A7A6E]/30 text-[12px] hover:border-[#C9922A]/50"
                >
                  <UserCircle size={14} />{' '}
                  <p className="hidden md:block">
                    {user?.fullName.split(' ')[0]}{' '}
                  </p>
                  <ChevronDown size={10} />
                </button>
              </div>
            ) : (
              <div className="md:flex gap-3 hidden items-center">
                <Link
                  href="/login"
                  className="text-[13px] hidden lg:inline-block text-muted hover:text-text"
                >
                  Sign in
                </Link>
                <Link href="/getstarted" className="helix-btn-primary text-sm">
                  Get Started
                </Link>
              </div>
            )}

            <div className="md:hidden items-center flex ">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => setShowSidebar(true)}
              >
                <Menu className="cursor-pointer" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>
      <SidebarComp
        openSidebar={showSidebar}
        setOpenSideBar={() => setShowSidebar(!showSidebar)}
      />
      {menuOpen && (
        <div
          className="fixed right-0 mt-2 w-56 helix-card p-2 shadow-2xl z-40"
          onMouseLeave={() => setMenuOpen(false)}
        >
          <div className="px-3 py-2 border-b border-[#1A7A6E]/20 mb-1">
            <div className="text-[12px] font-semibold truncate">
              {user?.fullName}
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#1A7A6E]">
              {user?.role?.replace('_', ' ')}
            </div>
          </div>
          {dashHome && (
            <Link
              href={dashHome}
              className="block px-3 py-2 text-[12px] hover:bg-[#1A7A6E]/10 rounded"
            >
              {user?.role === 'consumer' ? 'My Orders' : 'Dashboard'}
            </Link>
          )}
          {(user?.role === 'exporter' || user?.role === 'retailer') && (
            <Link
              href={`/${user?.role}`}
              className="block px-3 py-2 text-[12px] hover:bg-[#1A7A6E]/10 rounded"
            >
              Business workspace
            </Link>
          )}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full text-left px-3 py-2 text-[12px] text-[#E74C3C] cursor-pointer hover:bg-[#E74C3C]/10 rounded inline-flex items-center gap-2"
          >
            <LogOut size={12} /> Sign out
          </button>
        </div>
      )}
      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Header;
