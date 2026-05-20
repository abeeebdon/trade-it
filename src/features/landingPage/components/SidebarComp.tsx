import ThemeToggle from '@/components/buttons/ToggleButton';
import { cn } from '@/lib/cn';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from './data';
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
              className="hover:text-[#F5F5F5]"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/getstarted" className="hover:text-[#F5F5F5]">
            Get Started
          </Link>
          <Link href="/getstarted" className="hover:text-[#F5F5F5]">
            Signin
          </Link>
        </nav>
      </article>
    </>
  );
};

export default SidebarComp;
