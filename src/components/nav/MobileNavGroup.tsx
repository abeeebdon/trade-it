'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, MoveUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { NavGroupItem } from './NavGroup';

interface MobileNavGroupProps {
  label: string;
  items: NavGroupItem[];
  defaultOpen?: boolean;
  onNavigate?: () => void;
}

const MobileNavGroup = ({
  label,
  items,
  defaultOpen = false,
  onNavigate,
}: MobileNavGroupProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="w-full border-b border-border/60">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 px-1 py-3 text-left text-sm font-medium text-text transition-colors hover:text-primary"
      >
        <span>{label}</span>
        <ChevronDown
          size={16}
          className={`text-muted transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="flex flex-col pb-3">
              {items.map(({ label: itemLabel, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onNavigate}
                  className="group flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-muted transition-colors hover:bg-[#1A7A6E]/5 hover:text-primary"
                >
                  <span>{itemLabel}</span>
                  <MoveUpRight
                    size={13}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavGroup;
