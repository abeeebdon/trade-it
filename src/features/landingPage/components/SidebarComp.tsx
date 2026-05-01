import ThemeToggle from '@/components/buttons/ToggleButton';
import { cn } from '@/lib/cn';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface Props {
  setOpenSideBar: (open: boolean) => void;
  openSidebar: boolean;
}
const SidebarComp = ({ setOpenSideBar, openSidebar }: Props) => {
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
          'fixed inset-y-0 right-0 z-1999 w-2/3 max-w-64 bg-[#39414fe4] h-screen  justify-between p-4 shadow-lg md:hidden transform transition-transform duration-600  ease-in-out',
          !openSidebar ? 'translate-x-full' : 'translate-x-0',
        )}
      >
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <motion.button onClick={() => setOpenSideBar(false)}>
            <X className="cursor-pointer" />
          </motion.button>
        </div>
        <nav className=" flex mt-10 flex-col items-center gap-8 text-[13px] text-[#e4e8f0]">
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
      </article>
    </>
  );
};

export default SidebarComp;
