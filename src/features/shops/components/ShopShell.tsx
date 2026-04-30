'use client';
import { Handbag, SignOut, UserCircle } from '@phosphor-icons/react';
import ThemeToggle from '@/features/buttons/ToggleButton';
import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import { logout } from '@/store/auth/auth.slice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
interface ShopShellProps {
  setMode?: (mode: string) => void;
}
/** Minimal top-bar shell for the consumer shop experience (no left rail). */
export default function ShopShell({ setMode }: ShopShellProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const handleCLick = (mode: string) => {
    if (setMode) {
      setMode(mode);
    } else {
      router.push('/shop');
    }
  };
  return (
    <div className=" bg-[#0A1628] text-[#F5F5F5] w-full">
      <header className="sticky top-0 z-30 bg-[#0A1628]/95 backdrop-blur border-b border-[#1A7A6E]/20">
        <div className="max-w-350 mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-6">
          <Link
            href="/shop"
            className="flex items-center gap-3"
            data-testid="shop-home-link"
          >
            <Image
              src="/jomp-icon.png"
              alt="Jomp"
              className="w-9 h-9 rounded-full"
              width={36}
              height={36}
            />
            <div className="leading-tight">
              <h2 className="font-bold tracking-[0.22em] text-sm">JOMP SHOP</h2>
              <p className="text-[9px] tracking-[0.3em] text-[#1A7A6E] font-mono">
                DIRECT · FROM AFRICA
              </p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-[13px] text-[#9CA3AF]">
            <Link href="/shop" className="hover:text-[#F5F5F5]">
              Browse
            </Link>
            <button
              className="hover:text-[#F5F5F5]"
              onClick={() => handleCLick('direct')}
            >
              Direct from Africa
            </button>
            <button
              className="hover:text-[#F5F5F5]"
              onClick={() => handleCLick('stock')}
            >
              US In-Stock
            </button>
            {user && (
              <Link
                href="/shop/orders"
                className="hover:text-[#F5F5F5]"
                data-testid="my-orders-link"
              >
                <Handbag size={14} className="inline mr-1" />
                My Orders
              </Link>
            )}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <>
                <span className="hidden sm:inline text-[12px] text-[#9CA3AF]">
                  Hi, {user.name.split(' ')[0]}
                </span>
                {(user.role === 'exporter' || user.role === 'buyer') && (
                  <Link
                    href="/dashboard"
                    className="text-[12px] text-[#C9922A] hover:underline"
                  >
                    Business
                  </Link>
                )}
                <button
                  onClick={() => dispatch(logout())}
                  className="text-[#9CA3AF] hover:text-[#F5F5F5]"
                  data-testid="shop-logout"
                >
                  <SignOut size={16} />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="helix-btn-primary text-sm inline-flex items-center gap-1"
                data-testid="shop-login-cta"
              >
                <UserCircle size={14} /> Sign in
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
