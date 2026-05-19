'use client';

import type { ComplianceScore } from '../types/exporter';

interface MissingDocsCardProps {
  score: ComplianceScore | null;
}

export default function MissingDocsCard({ score }: MissingDocsCardProps) {
  if (!score?.missing?.length) return null;

  return (
    <div className="helix-card p-6">
      <div className="helix-label">Missing documents</div>
      <ul className="mt-3 space-y-2">
        {score.missing.map((m) => (
          <li
            key={m}
            className="text-[13px] flex items-center gap-2 text-[#F5F5F5]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9922A] shrink-0" />
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
