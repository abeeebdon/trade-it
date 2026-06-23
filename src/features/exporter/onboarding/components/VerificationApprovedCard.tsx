'use client';

import { CheckCircle2 } from 'lucide-react';
import { OnboardingRespType } from '../types/exporterOnboardingtypes';

interface VerificationApprovedCardProps {
  biz: OnboardingRespType;
}

export default function VerificationApprovedCard({
  biz,
}: VerificationApprovedCardProps) {
  return (
    <div className="helix-card p-6">
      <div className="flex items-start gap-4">
        <CheckCircle2 size={28} className="text-[#C9922A] shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="helix-h3">Verification approved</h3>
          <p className="text-[#9CA3AF] text-sm mt-1">
            Your NGN and USD deposit accounts are active.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
            <div>
              <div className="text-[11px] text-[#9CA3AF] uppercase tracking-widest mb-1">
                NGN Virtual Account
              </div>
              <div className="text-[15px] text-[#C9922A]">
                {biz.anchorAccounts.ngnVirtualAccount ?? '—'}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#9CA3AF] uppercase tracking-widest mb-1">
                USD Virtual Account
              </div>
              <div className="text-[15px] text-[#C9922A]">
                {biz.anchorAccounts.usdVirtualAccount ?? '—'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
