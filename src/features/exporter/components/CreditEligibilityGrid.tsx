'use client';

import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { formatUSD } from '@/lib/func';
import type { CreditEligibility } from '../types/exporter';

interface CreditEligibilityGridProps {
  elig: CreditEligibility;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[#9CA3AF] text-[12px]">{label}</span>
      {value}
    </div>
  );
}

export default function CreditEligibilityGrid({
  elig,
}: CreditEligibilityGridProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-4 mb-8">
      {/* ── Eligibility status ── */}
      <div className="helix-card p-6">
        <div className="helix-label">Eligibility</div>
        <div className="mt-3 flex items-center gap-3">
          {elig.eligible ? (
            <>
              <CheckCircle2 size={28} className="text-[#1A7A6E] shrink-0" />
              <span className="helix-h3">Approved to apply</span>
            </>
          ) : (
            <>
              <AlertTriangle size={28} className="text-[#C9922A] shrink-0" />
              <span className="helix-h3">Not yet eligible</span>
            </>
          )}
        </div>
        {!elig.eligible && (elig.reasons_blocked?.length ?? 0) > 0 && (
          <ul className="mt-4 space-y-1.5 text-[12px] text-[#9CA3AF]">
            {elig.reasons_blocked!.map((r) => (
              <li key={r} className="flex items-start gap-1.5">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#C9922A] shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Credit limit ── */}
      <div className="helix-card p-6">
        <div className="helix-label">Indicative credit limit</div>
        <div
          className="font-mono text-4xl font-bold text-[#C9922A] mt-2 tracking-tight"
          data-testid="credit-limit"
        >
          {formatUSD(elig.max_limit_usd || 0)}
        </div>
        {elig.indicative_apr_percent != null && (
          <div className="text-[12px] text-[#9CA3AF] mt-1 font-mono">
            APR ~{elig.indicative_apr_percent}% · {elig.indicative_term_months}
            mo · Risk score {elig.risk_score}/100
          </div>
        )}
        <div className="mt-4 h-1.5 bg-[#0A1628] rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1A7A6E] to-[#C9922A]"
            style={{ width: `${elig.risk_score || 0}%` }}
          />
        </div>
      </div>

      {/* ── Sales basis ── */}
      <div className="helix-card p-6">
        <div className="helix-label">Sales basis (Helix history)</div>
        <div className="mt-3 space-y-2 text-[13px]">
          <Row
            label="Paid orders"
            value={
              <span className="font-mono">
                {elig.sales?.paid_order_count ?? 0}
              </span>
            }
          />
          <Row
            label="Total volume"
            value={
              <span className="font-mono text-[#C9922A]">
                {formatUSD(elig.sales?.total_volume_usd || 0)}
              </span>
            }
          />
          <Row
            label="Average order"
            value={
              <span className="font-mono">
                {formatUSD(elig.sales?.average_order_usd || 0)}
              </span>
            }
          />
          <Row
            label="Compliance"
            value={
              <span className="font-mono">
                {elig.compliance_score ?? 0}/100
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}
