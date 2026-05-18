'use client';

import type { ComplianceScore } from '../types/exporter';

interface ComplianceScoreCardProps {
  score: ComplianceScore | null;
}

export default function ComplianceScoreCard({
  score,
}: ComplianceScoreCardProps) {
  const value = score?.score ?? 0;
  const color = value >= 80 ? '#1A7A6E' : value >= 50 ? '#C9922A' : '#E74C3C';

  return (
    <div className="helix-card p-6">
      <div className="helix-label">Compliance Score</div>
      <div className="font-mono text-5xl font-bold mt-2 text-[#F5F5F5]">
        {score?.score ?? '—'}
        <span className="text-[#9CA3AF] text-xl">/100</span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 bg-[#0A1628] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>

      {/* Category breakdown */}
      {score?.category_scores && (
        <div className="mt-5 space-y-2">
          {Object.entries(score.category_scores).map(([cat, v]) => (
            <div key={cat}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="uppercase tracking-wider text-[#9CA3AF]">
                  {cat.replace('-', ' ')}
                </span>
                <span className="font-mono text-[#F5F5F5]">
                  {v.score}/{v.max}
                </span>
              </div>
              <div className="h-1 bg-[#0A1628] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.round((v.score / v.max) * 100)}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
