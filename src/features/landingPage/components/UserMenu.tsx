'use client';

import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useAppSelector } from '@/hooks/store/store';

interface UserMenuProps {
  setMenuOpen: (open: boolean) => void;
  setShowLogoutModal: (open: boolean) => void;
}

const UserMenu = ({ setMenuOpen, setShowLogoutModal }: UserMenuProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const pathToDashboard =
    user?.role === 'retailer' ? `/buyer` : `/${user?.role}`;
  return (
    <section
      className="fixed right-0 mt-2 w-56 helix-card p-2 shadow-2xl z-40"
      onMouseLeave={() => setMenuOpen(false)}
    >
      <article className="px-3 py-2 border-b border-[#1A7A6E]/20 mb-1">
        <div className="text-[12px] font-semibold truncate">
          {user?.fullName}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-[#1A7A6E]">
          {user?.role?.replace('_', ' ')}
        </div>
      </article>
      <Link
        href={pathToDashboard}
        className="block px-3 py-2 text-[12px] hover:bg-[#1A7A6E]/10 rounded"
      >
        Dashboard
      </Link>
      <Link
        href="/profile"
        className="block px-3 py-2 text-[12px] hover:bg-[#1A7A6E]/10 rounded"
      >
        My Profile
      </Link>

      <button
        onClick={() => setShowLogoutModal(true)}
        className="w-full text-left px-3 py-2 text-[12px] text-[#E74C3C] cursor-pointer hover:bg-[#E74C3C]/10 rounded inline-flex items-center gap-2"
      >
        <LogOut size={12} /> Sign out
      </button>
    </section>
  );
};

export default UserMenu;
