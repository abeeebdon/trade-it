'use client';
import ThemeToggle from '@/components/buttons/ToggleButton';
import { ChevronDown, Menu, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import SidebarComp from './SidebarComp';
import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import { cn } from '@/lib/cn';
import { logoutAction } from '@/features/authentication/components/helper';
import { logout } from '@/store/auth/auth.slice';
import { usePathname, useRouter } from 'next/navigation';
import LogoutModal from './LogoutModal';
import SearchInput from './SearchInput';
import ShoppingMenu from './ShoppingMenu';
import UserMenu from './UserMenu';
import ShopMenu from './ShopMenu';
import JompFullLogo from '@/features/authentication/components/JompFullLogo';
import CategoriesMenu from './CategoriesMenu';
import { getSavedCookie } from '@/store/auth/cookies';
const Header = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await logoutAction();
    dispatch(logout());
    router.push('/login');
  };
  const pathToDashboard =
    user?.role === 'retailer' ? `/buyer` : `/${user?.role}`;

  const token = getSavedCookie('token');
  useEffect(() => {
    if (!token && !user) {
      dispatch(logout());
    }
  }, [user, token]);
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
        <div className="max-w-350 mx-auto px-6 lg:px-10 py-4 flex  items-center justify-between">
          <Link href="/" className="outline-none flex items-center gap-2">
            <JompFullLogo />
          </Link>
          <nav className="hidden md:flex basis-1/2 justify-center h-full items-center lg:gap-8 gap-2 md:gap-4 text-[13px] text-[#9CA3AF]">
            <ShopMenu />
            <CategoriesMenu />
            {user && <ShoppingMenu />}
            <div className="hidden lg:block">
              {!user || !token ? (
                <Link
                  href="/register?role=exporter"
                  className="text-muted hover:text-text text-lg"
                >
                  Become a Seller
                </Link>
              ) : (
                <Link
                  href={pathToDashboard}
                  className="text-muted hover:text-text text-lg"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </nav>
          <div className="flex items-center gap-2">
            {pathname === '/' && <SearchInput />}
            <ThemeToggle />

            {user && token ? (
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
        <UserMenu
          setMenuOpen={setMenuOpen}
          setShowLogoutModal={setShowLogoutModal}
        />
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
