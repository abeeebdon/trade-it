'use client';

import { StatusPill } from '@/features/shops/components/StatusPill';
import { OnboardingRespType } from '../types/exporterOnboardingtypes';

interface BusinessSummaryCardProps {
  biz: OnboardingRespType;
}

export default function BusinessSummaryCard({ biz }: BusinessSummaryCardProps) {
  return (
    <div className="helix-card p-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="helix-label">{biz.businessProfile.businessName}</div>
          <div className="helix-h3 mt-1">
            {biz.businessProfile.sector.replace('-', ' ')} ·{' '}
            {biz.businessProfile.country}
          </div>
          <div className="text-[12px] text-[#9CA3AF] font-mono mt-1">
            Anchor customer ·{/* {biz.businessProfile.} */}
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <div className="text-[10px] tracking-widest text-[#9CA3AF] mb-1">
              KYC
            </div>
            <StatusPill status={biz.verification.kycStatus} />
          </div>
          <div>
            <div className="text-[10px] tracking-widest text-[#9CA3AF] mb-1">
              KYB
            </div>
            <StatusPill status={biz.verification.kybStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}
