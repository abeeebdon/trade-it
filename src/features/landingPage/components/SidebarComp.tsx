import ThemeToggle from '@/components/buttons/ToggleButton';
import { cn } from '@/lib/cn';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { NAV_LINKS } from './data';
import { useAppSelector } from '@/hooks/store/store';
interface Props {
  setOpenSideBar: (open: boolean) => void;
  openSidebar: boolean;
}
const SidebarComp = ({ setOpenSideBar, openSidebar }: Props) => {
  const user = useAppSelector((state) => state.auth.user);

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
          <motion.button onClick={() => setOpenSideBar(false)}>
            <X className="cursor-pointer" />
          </motion.button>
        </div>
        <nav className=" flex mt-10 flex-col items-center gap-8 text-[13px] dark:text-[#e4e8f0]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpenSideBar(false)}
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
          <Link href="/getstarted" className="text-muted hover:text-text">
            Get Started
          </Link>
          <Link href="/login" className="text-muted hover:text-text">
            Signin
          </Link>
        </nav>
      </article>
    </>
  );
};

export default SidebarComp;
