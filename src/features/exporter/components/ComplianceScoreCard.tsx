'use client';

import { ComplianceVaultData } from '../compliance/types/compliance';

interface ComplianceScoreCardProps {
  score: ComplianceVaultData | undefined;
}

export default function ComplianceScoreCard({
  score,
}: ComplianceScoreCardProps) {
  const value = score?.complianceScore ?? 0;
  const color = value >= 80 ? '#1A7A6E' : value >= 50 ? '#C9922A' : '#E74C3C';

  return (
    <div className="helix-card p-6">
      <div className="helix-label">Compliance Score</div>
      <div className="font-mono text-5xl font-bold mt-2 text-text">
        {score?.complianceScore ?? '—'}
        <span className="text-muted text-xl">/100</span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 bg-bg rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>

      {/* Category breakdown */}
      {score?.sectorScores && (
        <div className="mt-5 space-y-2">
          {score?.sectorScores?.map(({ sector, score, maxScore }) => (
            <div key={sector}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="uppercase tracking-wider text-muted">
                  {sector.replace('-', ' ')}
                </span>
                <span className="font-mono text-text">
                  {score}/{maxScore}
                </span>
              </div>
              <div className="h-1 bg-bg rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.round((score / maxScore) * 100)}%`,
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
