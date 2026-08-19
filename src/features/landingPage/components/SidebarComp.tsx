import ThemeToggle from '@/components/buttons/ToggleButton';
import { cn } from '@/lib/cn';
import { X } from 'lucide-react';
import Link from 'next/link';
import { NAV_LINKS } from './data';
import { useAppSelector } from '@/hooks/store/store';
import CategoriesMenu from './CategoriesMenu';
import ShoppingMenu from './ShoppingMenu';
import MobileNavGroup from '@/components/nav/MobileNavGroup';
import { getSavedCookie } from '@/store/auth/cookies';
interface Props {
  setOpenSideBar: (open: boolean) => void;
  openSidebar: boolean;
}
const SidebarComp = ({ setOpenSideBar, openSidebar }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const token = getSavedCookie('token');
  const pathToDashboard =
    user?.role === 'retailer' ? `/buyer` : `/${user?.role}`;

  return (
    <>
      {openSidebar && (
        <div
          className="fixed w-full inset-0 bg-black opacity-10 h-screen z-40"
          onClick={() => setOpenSideBar(false)}
        ></div>
      )}
      <article
        className={cn(
          'fixed inset-y-0 right-0 z-1999 w-2/3 max-w-64 bg-white dark:bg-[#39414fe4] h-screen  justify-between p-4 shadow-lg md:hidden transform transition-transform duration-600  ease-in-out',
          !openSidebar ? 'translate-x-full' : 'translate-x-0',
        )}
      >
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <button onClick={() => setOpenSideBar(false)}>
            <X className="cursor-pointer" />
          </button>
        </div>
        <nav className=" flex mt-6 flex-col items-stretch w-full gap-1 text-[13px] dark:text-[#e4e8f0]">
          {user && token && (
            <Link
              href={pathToDashboard}
              className="text-muted hover:text-text text-lg"
            >
              Dashboard
            </Link>
          )}
          <MobileNavGroup
            label="Shop"
            items={NAV_LINKS}
            defaultOpen
            onNavigate={() => setOpenSideBar(false)}
          />

          {user && token && (
            <ShoppingMenu
              variant="mobile"
              onNavigate={() => setOpenSideBar(false)}
            />
          )}

          {user?.role === 'consumer' && (
            <Link
              href="/shop/orders"
              onClick={() => setOpenSideBar(false)}
              className="text-muted hover:text-text px-1 py-3 border-b border-border/60"
            >
              My Orders
            </Link>
          )}
          {!user ||
            (!token && (
              <>
                <Link
                  href="/getstarted"
                  onClick={() => setOpenSideBar(false)}
                  className="text-muted hover:text-text px-1 py-3 border-b border-border/60"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpenSideBar(false)}
                  className="text-muted hover:text-text px-1 py-3 border-b border-border/60"
                >
                  Signin
                </Link>
              </>
            ))}
          <CategoriesMenu
            variant="mobile"
            onNavigate={() => setOpenSideBar(false)}
          />
        </nav>
      </article>
    </>
  );
};

export default SidebarComp;
