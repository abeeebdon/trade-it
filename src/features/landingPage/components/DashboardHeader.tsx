'use client';
import { usePathname } from 'next/navigation';
import { getKicker, getTitle } from './homeFunc';
import ThemeToggle from '@/components/buttons/ToggleButton';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

const DashboardHeader = () => {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);

  const title = getTitle(pathname);
  const kicker = getKicker(pathname);

  const isExporter = pathname.startsWith('/exporter');

  return (
    <header className="sticky top-0 z-30 w-full border bg-bg backdrop-blur border-b border-[#1A7A6E]/15">
      <div className="max-w-350 mx-auto px-6 lg:px-10 py-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="helix-kicker mb-2">{kicker}</p>
          <h1 className="helix-h2">{title}</h1>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {isExporter && (
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#1A7A6E]">
              ANCHOR · SANDBOX · MOCK
              <span className="w-2 h-2 rounded-full bg-[#1A7A6E] inline-block animate-pulse" />
            </div>
          )}
          <ThemeToggle />
          <div className="sm:hidden items-center flex">
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

      <DashboardSidebar
        openSidebar={showSidebar}
        setOpenSideBar={setShowSidebar}
      />
    </header>
  );
};

export default DashboardHeader;
