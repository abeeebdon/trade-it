'use client';

import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
import { shoppingMenu } from './data';

export default function ShoppingMenu() {
  return (
    <div className="relative group z-9999">
      <button className="flex items-center gap-2 font-medium text-sm transition-colors">
        Shopping
        <MoveUpRight
          size={16}
          className="transition-transform duration-200 group-hover:rotate-180"
        />
      </button>

      <div className="absolute -left-5 top-full pt-2 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 z-9999">
        <div className="w-56 rounded-xl border border-border bg-bg shadow-lg overflow-hidden">
          {shoppingMenu.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 text-sm text-text hover:bg-[#1A7A6E]/5 hover:text-primary transition-colors"
            >
              <span>{label}</span>
              <MoveUpRight size={14} className="" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
