'use client';

import { StatusPill } from '@/features/shops/components/StatusPill';
import type { Business } from '../../types/exporter';

interface BusinessSummaryCardProps {
  biz: Business;
}

export default function BusinessSummaryCard({ biz }: BusinessSummaryCardProps) {
  return (
    <div className="helix-card p-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="helix-label">{biz.business_name}</div>
          <div className="helix-h3 mt-1">
            {biz.sector.replace('-', ' ')} · {biz.country}
          </div>
          <div className="text-[12px] text-[#9CA3AF] font-mono mt-1">
            Anchor customer · {biz.anchor_customer_id}
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <div className="text-[10px] tracking-widest text-[#9CA3AF] mb-1">
              KYC
            </div>
            <StatusPill status={biz.kyc_status} />
          </div>
          <div>
            <div className="text-[10px] tracking-widest text-[#9CA3AF] mb-1">
              KYB
            </div>
            <StatusPill status={biz.kyb_status} />
          </div>
        </div>
      </div>
    </div>
  );
}
