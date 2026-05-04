'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Users, Package, Receipt, CurrencyDollar } from '@phosphor-icons/react';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateTime, formatUSD } from '@/lib/func';
import Stat from '../components/OverviewStat';
import { mockOverview, mockVerifications } from '../components/data';
import { OverviewType, Verification } from '../types/admin';

export default function AdminOverview() {
  const [overview, setOverview] = useState<OverviewType | null>(null);
  const [verifs, setVerifs] = useState<Verification[]>([]);
  //   useEffect(() => {
  //     (async () => {
  //       const [o, v] = await Promise.all([
  //         api.get('/admin/finance/overview'),
  //         api.get('/admin/verifications'),
  //       ]);
  //       setOverview(o.data);
  //       setVerifs(v.data);
  //     })();
  //   }, []);
  //   if (!overview)
  //     return (
  //       <Shell title="Admin">
  //         <div />
  //       </Shell>
  //     );
  useEffect(() => {
    // simulate API
    setTimeout(() => {
      setOverview(mockOverview);
      setVerifs(mockVerifications);
    }, 800);
  }, []);
  return (
    <main>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Stat
          label="Businesses"
          value={overview?.business_count ?? ''}
          icon={Users}
        />
        <Stat
          label="Orders"
          value={overview?.order_count ?? ''}
          icon={Package}
        />
        <Stat
          label="Transactions"
          value={overview?.transaction_count ?? ''}
          icon={Receipt}
        />
        <Stat
          label="Fees Collected"
          value={formatUSD(overview?.fees_collected_usd ?? 0)}
          icon={CurrencyDollar}
          accent
        />
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

      <div className="mt-8 helix-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1A7A6E]/15">
          <h3 className="helix-label">Pending Verifications</h3>
          <p className="helix-h3 mt-1">{verifs.length} in queue</p>
        </div>
        {verifs.length === 0 ? (
          <div className="p-10 text-center text-muted">
            No pending verifications.
          </div>
        ) : (
          <table className="w-full mx-4  overflow-auto   ">
            <thead className="space-y-4">
              <tr className="text-text text-left ">
                <th className="pt-4">Business</th>
                <th>Country</th>
                <th>Sector</th>
                <th>KYC</th>
                <th>KYB</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody className="">
              {verifs.slice(0, 8).map((v) => (
                <tr key={v.id} className="   text-text">
                  <td className="py-2">{v.business_name}</td>
                  <td>{v.country}</td>
                  <td className="text-muted">{v.sector}</td>
                  <td>
                    <StatusPill status={v.kyc_status} />
                  </td>
                  <td>
                    <StatusPill status={v.kyb_status} />
                  </td>
                  <td className="text-[11px] font-mono text-muted">
                    {formatDateTime(v.updated_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
