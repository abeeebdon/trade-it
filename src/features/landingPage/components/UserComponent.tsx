import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import { logout } from '@/store/auth/auth.slice';
import { ChevronDown, LogOut, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import LogoutModal from './LogoutModal';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/features/authentication/components/helper';

const UserComponent = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useAppDispatch();
  const dashHome =
    user?.role === 'consumer'
      ? '/shop/orders'
      : user?.role === 'super_admin'
        ? '/admin/credit'
        : user
          ? `/${user?.role}`
          : null;

  const handleLogout = async () => {
    await logoutAction();
    dispatch(logout());
    router.push('/login');
  };
  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((o) => !o)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer border-[#1A7A6E]/30 text-[12px] hover:border-[#C9922A]/50"
        data-testid="user-menu-trigger"
      >
        <UserCircle size={14} />{' '}
        <p className="hidden md:block">{user?.fullName.split(' ')[0]} </p>
        <ChevronDown size={10} />
      </button>
      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-56 helix-card p-2 shadow-2xl z-40"
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
            data-testid="shop-logout"
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
    </div>
  );
};

export default UserComponent;
