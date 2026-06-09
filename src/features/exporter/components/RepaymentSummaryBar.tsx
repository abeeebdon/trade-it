'use client';

import { formatUSD } from '@/lib/func';
import type { RepaymentData } from '../types/exporter';

interface RepaymentSummaryBarProps {
  data: RepaymentData;
}

export default function RepaymentSummaryBar({
  data,
}: RepaymentSummaryBarProps) {
  const totalInstallments = data.applications.flatMap((a) => a.installments);
  const paid = totalInstallments.filter((i) => i.status === 'paid').length;
  const overdue = totalInstallments.filter(
    (i) => i.status === 'overdue',
  ).length;
  const pending = totalInstallments.filter(
    (i) => i.status === 'pending',
  ).length;

  return (
    <div className="helix-card p-5 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div>
        <div className="helix-label">Total outstanding</div>
        <div className="font-mono text-xl font-bold text-[#C9922A] mt-1">
          {formatUSD(data.total_outstanding_usd)}
        </div>
      </div>
      <div>
        <div className="helix-label">Active loans</div>
        <div className="font-mono text-xl font-bold text-[#F5F5F5] mt-1">
          {data.applications.length}
        </div>
      </div>
      <div>
        <div className="helix-label">Paid installments</div>
        <div className="font-mono text-xl font-bold text-[#1A7A6E] mt-1">
          {paid}
        </div>
      </div>
      <div>
        <div className="helix-label">{overdue > 0 ? 'Overdue' : 'Pending'}</div>
        <div
          className={`font-mono text-xl font-bold mt-1 ${
            overdue > 0 ? 'text-[#E74C3C]' : 'text-[#9CA3AF]'
          }`}
        >
          {overdue > 0 ? overdue : pending}
        </div>
      </div>
    </div>
  );
}
