'use client';

import { useEffect, useState } from 'react';
import { HandCoins } from 'lucide-react';
import { toast } from 'sonner';
import { useHeader } from '@/context/HeaderContext';
import CreditPartnerBanner from '../components/CreditPartnerBanner';
import CreditEligibilityGrid from '../components/CreditEligibilityGrid';
import CreditApplicationsTable from '../components/CreditApplicationsTable';
import ApplyCreditModal from '../modals/ApplyCreditModal';
import { CreditApplication, CreditEligibility } from '../types/exporter';

import {
  mockCreditApplications,
  mockCreditEligibility,
} from '../components/data';

export default function Credit() {
  const { setHeader } = useHeader();

  const [eligibility] = useState<CreditEligibility | null>(
    mockCreditEligibility,
  );

  const [applications, setApplications] = useState<CreditApplication[]>(
    mockCreditApplications,
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setHeader({
      title: 'Business Credit',
      kicker: 'JompStart Digital · Export Financing',

      action: eligibility?.eligible ? (
        <button
          onClick={() => setOpen(true)}
          className="helix-btn-primary inline-flex items-center gap-2"
          data-testid="apply-credit-btn"
        >
          <HandCoins size={16} />
          Apply for credit
        </button>
      ) : null,
    });

    return () => setHeader(null);
  }, [eligibility, setHeader]);

  const handleSubmitApplication = (payload: {
    amount: number;
    term: number;
    purpose: string;
  }) => {
    if (!eligibility) return;

    const newApp: CreditApplication = {
      id: crypto.randomUUID(),

      application_number: `JMP-${Date.now()}`,

      amount_usd: payload.amount,

      offered_amount_usd: payload.amount,

      term_months: payload.term,

      offered_term_months: payload.term,

      indicative_apr: eligibility.indicative_apr_percent ?? undefined,

      offered_apr: eligibility.indicative_apr_percent ?? undefined,

      created_at: new Date().toISOString(),

      status: 'submitted',
    };

    setApplications((prev) => [newApp, ...prev]);

    toast.success('Application submitted successfully');

    setOpen(false);
  };

  if (!eligibility) {
    return (
      <div className="py-20 text-center text-[#9CA3AF]">
        Loading credit data...
      </div>
    );
  }

  return (
    <>
      <CreditPartnerBanner />

      <CreditEligibilityGrid elig={eligibility} />

      <CreditApplicationsTable applications={applications} />

      {open && (
        <ApplyCreditModal
          eligibility={eligibility}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmitApplication}
        />
      )}
    </>
  );
}
