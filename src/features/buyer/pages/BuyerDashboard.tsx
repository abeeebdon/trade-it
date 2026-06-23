'use client';
import {
  formatDateTime,
  formatDateToMM,
  formatNGN,
  formatUSD,
} from '@/lib/func';
import { useEffect, useMemo, useState } from 'react';
import BalanceCard from '../components/BalanceCard';
import { ArrowUpRight, Coins, Package, Receipt } from 'lucide-react';
import Link from 'next/link';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { dataBuyerDashboard } from '../components/data';
import {
  Business,
  BuyerDashboardData,
  ComplianceScore,
  FXRate,
  Order,
} from '../types/buyers';
import { useAppSelector } from '@/hooks/store/store';
import { useHeader } from '@/context/HeaderContext';
import { useGetCommandCenter } from '@/features/exporter/hooks/useGetCommandCenter';
import { CommandCenterData } from '@/features/exporter/types/command-center';
export const dummyFXRate: FXRate = {
  usd_to_ngn: 1585.75,
  fetched_at: Date.now(),
  source: 'CBN',
};
const BuyerDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [orders, setOrders] = useState<Order[]>([]);
  const [complianceScore, setComplianceScore] =
    useState<ComplianceScore | null>(null);
  const [biz, setBiz] = useState<Business | null>(null);
  const { setHeader } = useHeader();

  const { data: command, isPending } = useGetCommandCenter();

  const commandData: CommandCenterData = useMemo(() => {
    return command ? command : ({} as CommandCenterData);
  }, [command]);

  const title = `Welcome back, ${user?.fullName?.split(' ')[0]}`;
  const anchor_env = 'SANDBOX · MOCK';

  useEffect(() => {
    setHeader({
      title: title,
      kicker: 'Buyer · Trade Desk',
      action: (
        <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-[#1A7A6E]">
          ANCHOR · {anchor_env}
          <span className="w-2 h-2 rounded-full bg-[#1A7A6E] inline-block animate-pulse" />
        </div>
      ),
    });

    return () => setHeader(null);
  }, [setHeader]);

  const [data, setData] = useState<BuyerDashboardData | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(dataBuyerDashboard);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <BalanceCard
          label="USD Balance"
          value={formatUSD(data?.usd_balance ?? 0)}
          sub="Available · USD"
          va={data?.virtual_accounts?.usd}
          accent
        />
        <BalanceCard
          label="NGN Balance"
          value={formatNGN(data?.ngn_balance ?? 0)}
          sub="Available · NGN"
          va={data?.virtual_accounts?.ngn}
        />
        <div className="helix-card p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="helix-label">{commandData?.fxRate?.pair} Rate</p>
              <p className="font-mono text-3xl font-bold text-primary mt-2 tracking-tight">
                ₦{commandData?.fxRate?.rate ?? ''}
              </p>
            </div>
            <Coins size={22} className="text-secondary" />
          </div>
          <div className="mt-4 text-[11px] font-mono text-muted tracking-wider">
            {commandData?.fxRate?.source ?? ''}
            <br />
            {formatDateTime(commandData?.fxRate?.updatedAt ?? '')}
          </div>
        </div>
      </div>

      {/* Row 2: orders + compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="helix-card lg:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1A7A6E]/20">
            <div>
              <div className="helix-label">Recent Orders</div>
              <div className="helix-h3 mt-1">
                {orders.length ? `${orders.length} active` : 'No orders yet'}
              </div>
            </div>
            <Link
              href="/buyer/orders"
              className="text-[12px] text-[#C9922A] hover:underline"
            >
              View all
            </Link>
          </div>
          {orders.length ? (
            <div className="overflow-x-auto">
              <table className="helix-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 6).map((o) => (
                    <tr key={o.id}>
                      <td className="font-mono text-[#C9922A]">
                        <Link href={`/orders/${o.id}`}>{o.order_number}</Link>
                      </td>
                      <td className="max-w-55 truncate">{o.product_name}</td>
                      <td className="font-mono">{o.quantity}</td>
                      <td className="font-mono">
                        {formatUSD(o.agreed_price_usd)}
                      </td>
                      <td>
                        <StatusPill status={o.status} />
                      </td>
                      <td>
                        <StatusPill status={o.payment_status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center text-[#9CA3AF] text-sm">
              <Package size={34} className="mx-auto mb-3 text-[#1A7A6E]" />
              {user?.role === 'retailer'
                ? 'Browse the marketplace to submit your first RFQ.'
                : 'Orders you receive or place will appear here.'}
            </div>
          )}
        </div>

        <div className="helix-card p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="helix-label">Compliance Score</div>
              <div className="font-mono text-4xl font-bold text-[#F5F5F5] mt-2">
                {commandData?.compliance
                  ? `${commandData?.compliance?.score}`
                  : 0}
                <span className="text-[#9CA3AF] text-xl">/100</span>
              </div>
            </div>
            <StatusPill
              status={
                (complianceScore?.score ?? biz?.compliance_score ?? 0) >= 80
                  ? 'active'
                  : 'expiring_soon'
              }
            />
          </div>
          {commandData?.compliance?.missingDocuments &&
            commandData?.compliance?.missingDocuments.length > 0 && (
              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-2">
                  Missing documents
                </div>
                <ul className="space-y-1">
                  {commandData?.compliance?.missingDocuments
                    ?.slice(0, 4)
                    .map((m) => (
                      <li
                        key={m}
                        className="text-[13px] flex items-center gap-2 text-[#F5F5F5]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9922A]" />{' '}
                        {m}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          <Link
            href="/buyer/compliance"
            className="mt-5 inline-flex items-center gap-1 text-[#C9922A] text-[12px] hover:gap-2 transition-all"
          >
            Manage vault <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="helix-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1A7A6E]/20">
          <div>
            <div className="helix-label">Recent Transactions</div>
            <div className="helix-h3 mt-1">Ledger · last 10</div>
          </div>
          <Link
            href="/finance"
            className="text-[12px] text-[#C9922A] hover:underline"
          >
            View full ledger
          </Link>
        </div>
        {data?.recent_transactions?.length ? (
          <div className="overflow-x-auto">
            <table className="helix-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Reference</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_transactions.map((t) => (
                  <tr key={t.id}>
                    <td className="font-mono text-[12px] text-[#9CA3AF]">
                      {formatDateTime(t.timestamp)}
                    </td>
                    <td>
                      <StatusPill
                        status={
                          t.type === 'credit'
                            ? 'received'
                            : t.type === 'fee'
                              ? 'expiring_soon'
                              : 'active'
                        }
                      />
                    </td>
                    <td className="max-w-70 truncate">{t.description}</td>
                    <td className="font-mono text-[12px] text-[#1A7A6E]">
                      {t.anchor_transaction_ref}
                    </td>
                    <td
                      className={`font-mono text-right ${t.type === 'credit' ? 'text-[#C9922A]' : 'text-[#F5F5F5]'}`}
                    >
                      {t.type === 'credit' ? '+' : '-'}
                      {t.currency.toUpperCase() === 'USD'
                        ? formatUSD(t.amount)
                        : formatNGN(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-[#9CA3AF] text-sm">
            <Receipt size={34} className="mx-auto mb-3 text-[#1A7A6E]" />
            No transactions yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
