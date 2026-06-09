'use client';
import ThemeToggle from '@/components/buttons/ToggleButton';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';
import SidebarComp from './SidebarComp';
import { NAV_LINKS } from './data';
import { useAppSelector } from '@/hooks/store/store';
import UserComponent from './UserComponent';
import { cn } from '@/lib/cn';
import useColorScheme from '@/hooks/useColorScheme';
import JompsShopLogoDark from '@/assets/JompshopLogoDark';
import JompsShopLogo from '@/assets/jompshop_logo';
const Header = ({ className }: { className?: string }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const isDark: boolean = useColorScheme();
  return (
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
        <nav className="hidden md:flex items-center lg:gap-8 gap-2 text-[13px] text-[#9CA3AF]">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="text-muted hover:text-text"
            >
              {link.label}
            </Link>
          ))}

          {user?.role === 'consumer' && (
            <Link href="/shop/orders" className="text-muted hover:text-text">
              My Orders
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <UserComponent />
          ) : (
            <div className="md:flex gap-3 hidden items-center">
              <Link
                href="/login"
                className="text-[13px] hidden lg:inline-block text-muted hover:text-text"
              >
                Sign in
              </Link>
              <Link
                href="/getstarted"
                data-testid="register-cta"
                className="helix-btn-primary text-sm"
              >
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
          <SidebarComp
            openSidebar={showSidebar}
            setOpenSideBar={() => setShowSidebar(!showSidebar)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
