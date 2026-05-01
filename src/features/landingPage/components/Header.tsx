'use client';
import ThemeToggle from '@/components/buttons/ToggleButton';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';
import SidebarComp from './SidebarComp';
const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-30 bg-[#0A1628]/85 backdrop-blur border-b border-[#1A7A6E]/15">
      <div className="max-w-350 mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
          data-testid="brand-link"
        >
          <Image
            src="/appLogo.png"
            alt="Jomp"
            width={36}
            height={36}
            className="w-9 h-9 rounded-full"
          />
          <div className="leading-tight">
            <div className="font-bold tracking-[0.22em] text-sm">JOMP SHOP</div>
            <div className="text-[10px] tracking-[0.3em] text-[#1A7A6E] font-mono">
              EXPORT OS
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[13px] text-[#9CA3AF]">
          <a href="#solutions" className="hover:text-[#F5F5F5]">
            Solutions
          </a>
          <a href="#modules" className="hover:text-[#F5F5F5]">
            Modules
          </a>
          <Link
            href="/shop"
            className="hover:text-[#F5F5F5]"
            data-testid="shop-nav-link"
          >
            Shop
          </Link>
          <a href="#partners" className="hover:text-[#F5F5F5]">
            Partners
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="md:flex gap-3 hidden items-center">
            <Link
              href="/login"
              data-testid="login-link"
              className="text-[13px] text-[#9CA3AF] hover:text-[#F5F5F5]"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              data-testid="register-cta"
              className="helix-btn-primary text-sm"
            >
              Get Started
            </Link>
          </div>
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
