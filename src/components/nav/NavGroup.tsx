'use client';

import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';

export interface NavGroupItem {
  label: string;
  href: string;
}

interface NavGroupProps {
  label: string;
  items: NavGroupItem[];
}

const NavGroup = ({ label, items }: NavGroupProps) => {
  return (
    <div className="relative group z-9999">
      <button className="flex items-center gap-2 font-medium transition-colors text-lg">
        {label}
        <MoveUpRight
          size={18}
          className="transition-transform duration-200 group-hover:rotate-180"
        />
      </button>

      <div className="absolute -left-2 top-full opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 z-9999">
        <div className="w-56  bg-bg shadow-lg overflow-hidden">
          {items.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 text-sm text-text hover:bg-[#1A7A6E]/5 hover:text-primary transition-colors"
            >
              <span>{label}</span>
              <MoveUpRight size={14} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavGroup;
