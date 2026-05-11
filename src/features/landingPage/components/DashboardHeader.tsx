'use client';

import { usePathname } from 'next/navigation';
import { getKicker, getTitle } from './homeFunc';
import { useHeader } from '@/context/HeaderContext';
import ThemeToggle from '@/components/buttons/ToggleButton';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

const DashboardHeader = () => {
  const pathname = usePathname();
  const { title: customTitle, kicker: customKicker, badge } = useHeader();

  const [showSidebar, setShowSidebar] = useState(false);

  const fallbackTitle = getTitle(pathname);
  const fallbackKicker = getKicker(pathname);

  const title = customTitle ?? fallbackTitle;
  const kicker = customKicker ?? fallbackKicker;

  const isExporter = pathname.startsWith('/exporter');

  // Show ANCHOR badge only on exporter pages that are NOT dynamic order/product pages
  // (those pages set their own badge via context instead)
  const showAnchorBadge = isExporter && !badge;

  return (
    <header className="sticky top-0 z-30 w-full border bg-bg backdrop-blur border-b border-[#1A7A6E]/15">
      <div className="max-w-350 mx-auto px-6 lg:px-10 py-6 flex items-start justify-between gap-4 flex-wrap">
        {/* LEFT: Kicker + Title */}
        <div>
          <p className="helix-kicker mb-2">{kicker}</p>
          <h1 className="helix-h2">{title}</h1>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Static ANCHOR badge — shown on exporter pages without a dynamic badge */}
          {showAnchorBadge && (
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#1A7A6E]">
              ANCHOR · SANDBOX · MOCK
              <span className="w-2 h-2 rounded-full bg-[#1A7A6E] inline-block animate-pulse" />
            </div>
          )}

          {/* Dynamic badge — shown on pages that call setHeader with a badge value */}
          {badge && (
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#C9922A]">
              {badge}
              <span className="w-2 h-2 rounded-full bg-[#C9922A] inline-block animate-pulse" />
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
