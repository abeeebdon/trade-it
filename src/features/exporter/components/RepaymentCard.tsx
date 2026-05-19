'use client';

import { CheckCircle2 } from 'lucide-react';
import { formatUSD, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import type { RepaymentApplication } from '../types/exporter';

interface RepaymentCardProps {
  app: RepaymentApplication;
}

export default function RepaymentCard({ app }: RepaymentCardProps) {
  const { application: a, outstanding_usd, next_due, installments } = app;

  // Progress: paid installments out of total
  const paidCount = installments.filter((i) => i.status === 'paid').length;
  const progressPct = Math.round((paidCount / installments.length) * 100);

  return (
    <div className="helix-card p-6 mb-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-[#1A7A6E]">
            {a.application_number}
          </div>
          <div className="helix-h3 mt-1">
            {formatUSD(a.offered_amount_usd)} · {a.offered_term_months}mo @{' '}
            {a.offered_apr}%
          </div>
          <div className="text-[12px] text-[#9CA3AF] mt-1">
            Outstanding:{' '}
            <span className="font-mono text-[#C9922A]">
              {formatUSD(outstanding_usd)}
            </span>
          </div>
        </div>

        {/* Next due */}
        {next_due && (
          <div className="text-right">
            <div className="helix-label">Next due</div>
            <div className="font-mono text-lg">
              {formatUSD(next_due.total_due_usd - next_due.paid_usd)}
            </div>
            <div className="text-[11px] text-[#9CA3AF] font-mono">
              on {formatDateTime(next_due.due_date)}
            </div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-[11px] font-mono text-[#9CA3AF] mb-1">
          <span>
            {paidCount} of {installments.length} installments paid
          </span>
          <span>{progressPct}%</span>
        </div>
        <div className="h-1.5 bg-[#0A1628] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1A7A6E] to-[#C9922A] rounded-full transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Installments table — desktop */}
      <div className="mt-5 hidden sm:block overflow-x-auto">
        <table className="helix-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Due</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {installments.map((i) => (
              <tr
                key={i.id}
                data-testid={`inst-${i.installment_number}`}
                className={i.status === 'overdue' ? 'bg-[#E74C3C]/5' : ''}
              >
                <td className="font-mono">{i.installment_number}</td>
                <td className="font-mono text-[12px] text-[#9CA3AF]">
                  {formatDateTime(i.due_date)}
                </td>
                <td className="font-mono">{formatUSD(i.principal_usd)}</td>
                <td className="font-mono text-[#9CA3AF]">
                  {formatUSD(i.interest_usd)}
                </td>
                <td className="font-mono text-[#C9922A]">
                  {formatUSD(i.total_due_usd)}
                </td>
                <td className="font-mono">{formatUSD(i.paid_usd)}</td>
                <td>
                  {i.status === 'paid' ? (
                    <span className="helix-status helix-status-ok inline-flex items-center gap-1">
                      <CheckCircle2 size={10} /> paid
                    </span>
                  ) : (
                    <StatusPill status={i.status} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Installments — mobile cards ── */}
      <div className="mt-4 sm:hidden space-y-2">
        {installments.map((i) => (
          <div
            key={i.id}
            data-testid={`inst-${i.installment_number}`}
            className={`rounded border p-3 ${
              i.status === 'overdue'
                ? 'border-[#E74C3C]/40 bg-[#E74C3C]/5'
                : 'border-[#1A7A6E]/15'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[12px] text-[#9CA3AF]">
                #{i.installment_number} · {formatDateTime(i.due_date)}
              </span>
              {i.status === 'paid' ? (
                <span className="helix-status helix-status-ok inline-flex items-center gap-1 text-[10px]">
                  <CheckCircle2 size={10} /> paid
                </span>
              ) : (
                <StatusPill status={i.status} />
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 text-[12px]">
              <div>
                <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">
                  Principal
                </div>
                <div className="font-mono">{formatUSD(i.principal_usd)}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">
                  Interest
                </div>
                <div className="font-mono text-[#9CA3AF]">
                  {formatUSD(i.interest_usd)}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">
                  Total
                </div>
                <div className="font-mono text-[#C9922A]">
                  {formatUSD(i.total_due_usd)}
                </div>
              </div>
            </div>
            {i.paid_usd > 0 && i.paid_usd < i.total_due_usd && (
              <div className="mt-2 text-[11px] font-mono text-[#1A7A6E]">
                Paid so far: {formatUSD(i.paid_usd)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Auto-debit notice ── */}
      <div className="mt-4 pt-3 border-t border-[#1A7A6E]/15 text-[11px] text-[#9CA3AF] leading-relaxed">
        Auto-debit: whenever USD lands in your wallet (trade payments or
        consumer orders), Helix deducts up to the next installment in full and
        sends it to JompStart.
      </div>
    </div>
  );
}
