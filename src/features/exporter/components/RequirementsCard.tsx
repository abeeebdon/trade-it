'use client';

import { ImportGuide } from '../compliance/types/compliance';

interface RequirementsCardProps {
  cat: ImportGuide;
}

export default function RequirementsCard({ cat }: RequirementsCardProps) {
  return (
    <div className="helix-card p-5">
      <div className="helix-label">{cat?.title ?? ''}</div>
      <ul className="mt-2 space-y-1.5 text-[12px] text-[#9CA3AF] leading-relaxed">
        {cat.alerts?.map((g) => (
          <li key={g} className="flex items-start gap-1.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1A7A6E] shrink-0" />
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
}
