'use client';

import type { ComplianceRequirement } from '../types/exporter';

interface RequirementsCardProps {
  category: string;
  requirement: ComplianceRequirement;
}

export default function RequirementsCard({
  category,
  requirement,
}: RequirementsCardProps) {
  return (
    <div className="helix-card p-5">
      <div className="helix-label">
        {category.replace('-', ' ')} · US import guide
      </div>
      <ul className="mt-2 space-y-1.5 text-[12px] text-[#9CA3AF] leading-relaxed">
        {requirement.us_import_guide?.map((g) => (
          <li key={g} className="flex items-start gap-1.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1A7A6E] shrink-0" />
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
}
