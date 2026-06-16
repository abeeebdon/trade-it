'use client';
import { useEffect, useMemo, useState } from 'react';
import { formatUSD } from '@/lib/func';
import Stat, { StatSkeleton } from '../components/OverviewStat';
import { mockOverview, mockVerifications } from '../components/data';
import { AdminDashboardData, OverviewType, Verification } from '../types/admin';
import { useGetAdminOverview } from '../hooks/useGetAdminDashboard';
import { DollarSign, Package, Receipt, Users } from 'lucide-react';
import DashboardPendingVerification from '../components/DashboardPendingVerification';

export default function AdminOverview() {
  const [overview, setOverview] = useState<OverviewType | null>(null);
  const [verifs, setVerifs] = useState<Verification[]>([]);

  useEffect(() => {
    // simulate API
    setTimeout(() => {
      setOverview(mockOverview);
      setVerifs(mockVerifications);
    }, 800);
  }, []);
  const { data, isPending } = useGetAdminOverview();

  const adminOverview: AdminDashboardData = useMemo(() => {
    return data ? data : [];
  }, [data]);

  return (
    <main>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {isPending ? (
          Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
        ) : (
          <>
            <Stat
              label="Businesses"
              value={adminOverview.businesses ?? ''}
              icon={Users}
            />
            <Stat
              label="Orders"
              value={adminOverview.orders ?? ''}
              icon={Package}
            />
            <Stat
              label="Transactions"
              value={adminOverview.transactions ?? ''}
              icon={Receipt}
            />
            <Stat
              label="Fees Collected"
              value={formatUSD(adminOverview.feesCollectedUsd) ?? ''}
              icon={DollarSign}
              accent
            />
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="helix-card p-6">
          <p className="helix-label">Volume by Currency</p>
          <div className="mt-4 space-y-3">
            {Object.entries(overview?.total_volume_by_currency || {}).map(
              ([ccy, vol]) => (
                <div
                  key={ccy}
                  className="flex justify-between items-center py-2 border-b border-[#1A7A6E]/15 last:border-0"
                >
                  <span className="text-[13px] text-text">{ccy}</span>
                  <span className="font-mono text-[#C9922A] font-bold">
                    {ccy === 'USD' ? formatUSD(vol) : vol.toLocaleString()}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="helix-card p-6">
          <div className="helix-label">Sector Mix</div>
          <div className="mt-4 space-y-3">
            {Object.entries(overview?.by_sector || {}).map(([sec, v]) => (
              <div key={sec}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="uppercase tracking-wider text-[#9CA3AF]">
                    {sec.replace('-', ' ')}
                  </span>
                  <span className="font-mono text-text">
                    {formatUSD(v.volume_usd)} · {v.count} orders
                  </span>
                </div>
                <div className="h-1.5 bg-[#0A1628] rounded overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-[#1A7A6E] to-[#C9922A]"
                    style={{
                      width: `${Math.min(100, (v.volume_usd / 50000) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DashboardPendingVerification
        pendingVerificationCount={adminOverview.pendingVerificationCount}
        pendingVerifications={adminOverview.pendingVerifications}
      />
    </main>
  );
}
