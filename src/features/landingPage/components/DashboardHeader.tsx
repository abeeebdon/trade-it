'use client';

import { usePathname } from 'next/navigation';
import { getKicker, getTitle } from './homeFunc';
import { useHeader } from '@/context/HeaderContext';
import ThemeToggle from '@/components/buttons/ToggleButton';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import JompsShopLogoDark from '@/assets/JompshopLogoDark';
import useColorScheme from '@/hooks/useColorScheme';
import JompsShopLogo from '@/assets/jompshop_logo';

const DashboardHeader = () => {
  const pathname = usePathname();
  const {
    title: customTitle,
    kicker: customKicker,
    badge,
    action,
  } = useHeader(); // ← action added

  const [showSidebar, setShowSidebar] = useState(false);

  const fallbackTitle = getTitle(pathname);
  const fallbackKicker = getKicker(pathname);

  const title = customTitle ?? fallbackTitle;
  const kicker = customKicker ?? fallbackKicker;

  const isExporter = pathname.startsWith('/exporter');

  // ANCHOR badge only when on exporter pages with no dynamic badge or action
  const showAnchorBadge = isExporter && !badge && !action; // ← also suppress when action present
  const isDark: boolean = useColorScheme();
  return (
    <>
      <header className="sticky top-0 z-30 w-full border bg-bg backdrop-blur border-b border-[#1A7A6E]/15">
        <article className="flex flex-col-reverse md:block ">
          <div className="max-w-350 mx-auto px-6 lg:px-10 py-6 flex items-start justify-between gap-4 flex-wrap">
            {/* LEFT: Kicker + Title */}
            <div>
              <p className="helix-kicker mb-2">{kicker}</p>
              <h1 className="helix-h2">{title}</h1>
            </div>

            {/* RIGHT: Actions — priority: action > badge > ANCHOR badge */}
            <div className="flex items-center gap-3 flex-wrap">
              {action ? (
                <>{action}</>
              ) : badge ? (
                <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#C9922A]">
                  {badge}
                  <span className="w-2 h-2 rounded-full bg-[#C9922A] inline-block animate-pulse" />
                </div>
              ) : showAnchorBadge ? (
                <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#1A7A6E]">
                  ANCHOR · SANDBOX · MOCK
                  <span className="w-2 h-2 rounded-full bg-[#1A7A6E] inline-block animate-pulse" />
                </div>
              ) : null}
              <div className="hidden sm:flex items-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
          <article className="flex sm:hidden p-3 justify-between items-center my-2">
            {isDark ? (
              <JompsShopLogoDark width={140} />
            ) : (
              <JompsShopLogo width={140} />
            )}
            <div className=" items-center flex">
              <div className="sm:hidden flex items-center">
                <ThemeToggle />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => setShowSidebar(true)}
              >
                <Menu className="cursor-pointer text-muted" />
              </motion.button>
            </div>
          </article>
        </article>
      </header>
      <DashboardSidebar
        openSidebar={showSidebar}
        setOpenSideBar={setShowSidebar}
      />
    </>
  );
};

export default DashboardHeader;
