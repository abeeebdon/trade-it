'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatUSD, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';

import type { CreditApplication } from '../types/exporter';

interface Props {
  applications: CreditApplication[];
}

export default function CreditApplicationsTable({ applications }: Props) {
  return (
    <div className="helix-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1A7A6E]/20">
        <div className="helix-label">My Applications</div>

        <div className="helix-h3 mt-1">
          {applications.length} application(s)
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="p-12 text-center text-[#9CA3AF]">
          No credit applications yet.
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="helix-table min-w-full">
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Amount</th>
                  <th>Term</th>
                  <th>APR</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <Link
                        href={`/exporter/credit/${app.id}`}
                        className="font-mono text-[#C9922A]"
                      >
                        {app.application_number}
                      </Link>
                    </td>

                    <td className="font-mono">
                      {formatUSD(app.offered_amount_usd || app.amount_usd)}
                    </td>

                    <td className="font-mono">
                      {app.offered_term_months || app.term_months}
                      mo
                    </td>

                    <td className="font-mono">
                      {app.offered_apr || app.indicative_apr || '—'}%
                    </td>

                    <td>
                      <StatusPill status={app.status} />
                    </td>

                    <td className="font-mono text-[11px] text-[#9CA3AF]">
                      {formatDateTime(app.created_at)}
                    </td>

                    <td>
                      <Link
                        href={`/exporter/credit/${app.id}`}
                        className="inline-flex items-center gap-1 text-[#C9922A] text-[12px]"
                      >
                        View
                        <ArrowRight size={13} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="grid gap-4 p-4 lg:hidden">
            {applications.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl border border-[#1A7A6E]/20 bg-[#0F172A] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[#C9922A]">
                      {app.application_number}
                    </p>

                    <p className="text-[12px] text-[#9CA3AF] mt-1">
                      {formatDateTime(app.created_at)}
                    </p>
                  </div>

                  <StatusPill status={app.status} />
                </div>

                <div className="grid grid-cols-3 gap-3 mt-5">
                  <div>
                    <p className="text-[11px] text-[#9CA3AF]">Amount</p>

                    <p className="font-mono text-sm">
                      {formatUSD(app.offered_amount_usd || app.amount_usd)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-[#9CA3AF]">Term</p>

                    <p className="font-mono text-sm">
                      {app.term_months}
                      mo
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-[#9CA3AF]">APR</p>

                    <p className="font-mono text-sm">
                      {app.offered_apr || app.indicative_apr}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
