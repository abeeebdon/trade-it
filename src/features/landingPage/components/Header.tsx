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
import { useRouter } from 'next/navigation';
import LogoutModal from './LogoutModal';
import UserMenu from './UserMenu';
import JompFullLogo from '@/features/authentication/components/JompFullLogo';
import { getSavedCookie } from '@/store/auth/cookies';

const navLinks = [
  { label: 'Benefits', href: '#benefits' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

const Header = ({ className }: { className?: string }) => {
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
            'fixed top-0 inset-x-0 z-30  bg-bg backdrop-blur border-b border-[#1A7A6E]/15',
          ),
          className)
        }
      >
        <div className="max-w-350 mx-auto px-6 lg:px-10 py-4 flex  items-center justify-between">
          <Link href="/" className="outline-none flex items-center gap-2">
            <JompFullLogo />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className=" text-text/65 transition hover:text-text"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
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
                <Link href="/register" className="helix-btn-primary text-sm">
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
