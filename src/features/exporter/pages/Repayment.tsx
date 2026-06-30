'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatUSD } from '@/lib/func';
import { useHeader } from '@/context/HeaderContext';
import type { RepaymentData } from '../types/exporter';
import { mockRepaymentData } from '../components/data';
import RepaymentCard from '../components/RepaymentCard';
import RepaymentSummaryBar from '../components/RepaymentSummaryBar';

// Repayment

export default function Repayment() {
  const { setHeader } = useHeader();
  const [data, setData] = useState<RepaymentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockRepaymentData);
      setLoading(false);
    }, 800);
  }, []);

  // Set header once data loads
  useEffect(() => {
    if (!data) {
      setHeader({
        title: 'JompStart Repayments',
        kicker: 'Auto-debit · Schedule',
      });
      return;
    }

    if (data.applications.length === 0) {
      setHeader({
        title: 'JompStart Repayments',
        kicker: 'Auto-debit · Schedule',
      });
    } else {
      setHeader({
        title: 'JompStart Repayments',
        kicker: `${formatUSD(data.total_outstanding_usd)} outstanding · Auto-debit from incoming USD`,
      });
    }

    return () => {
      setHeader(null);
    };
  }, [data, setHeader]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="helix-card p-5 h-24 animate-pulse opacity-40" />
        {[0, 1].map((i) => (
          <div
            key={i}
            className="helix-card p-6 h-64 animate-pulse opacity-40"
          />
        ))}
      </div>
    );
  }

  // No active credit
  if (!data || data.applications.length === 0) {
    return (
      <div className="helix-card p-12 text-center text-[#9CA3AF]">
        No active credit.{' '}
        <Link
          href="/exporter/credit"
          className="text-[#C9922A] hover:underline"
        >
          Apply for credit →
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Summary bar */}
      <RepaymentSummaryBar data={data} />

      {/* Per-loan repayment cards */}
      {data.applications.map((app) => (
        <RepaymentCard key={app.application.id} app={app} />
      ))}
    </>
  );
}
