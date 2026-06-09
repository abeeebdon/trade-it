import PressableBtn from '@/components/buttons/PressableBtn';
import { VerificationField } from './VerificationFIeld';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { Check, X } from 'lucide-react';
import { useState } from 'react';
import { VerificationCardPRops } from '../types/verifications';
import {
  useApproveVerification,
  useRejectVerification,
} from '../hooks/useGetAdminVerifications';

const VerificationCard = ({ b }: VerificationCardPRops) => {
  const [note, setNote] = useState('');
  const { mutate, isPending: isApproving } = useApproveVerification();
  const { mutate: rejectVerif, isPending: isRejecting } =
    useRejectVerification();
  const handleApprove = () => {
    mutate({
      id: b.id,
      data: {
        note: note,
      },
    });
  };
  const handleReject = () => {
    rejectVerif({
      id: b.id,
      data: {
        note: note,
      },
    });
  };
  return (
    <article key={b.id} className="helix-card p-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="helix-h3">{b.businessName}</p>
          <p className="text-[12px] text-[#9CA3AF] mt-1">
            {b.businessType} · {b.country} · {b.sector}
          </p>
          <div className="text-[11px] font-mono text-secondary mt-2">
            Anchor: {b.anchorCustomerId}
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px]">
            {b.cacNumber && (
              <VerificationField label="CAC" value={b.cacNumber} />
            )}
            {b.bvn && <VerificationField label="BVN" value={b.bvn} />}
            {b.tin && <VerificationField label="TIN" value={b.tin} />}
            {b.ein && <VerificationField label="EIN" value={b.ein} />}
            {b.directorName && (
              <VerificationField label="Director" value={b.directorName} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <StatusPill status={b.kycStatus} />
          <StatusPill status={b.kybStatus} />
        </div>
      </div>
      <div className="mt-5 flex flex-col md:flex-row items-center gap-3">
        <input
          placeholder="Optional note to applicant..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="helix-input w-full flex-1 min-w-50"
        />
        <div className="flex max-[500px]:flex-col justify-between items-center w-full md:w-auto gap-4">
          <PressableBtn
            title="Approve & Provision"
            loading={isApproving}
            handleClick={handleApprove}
            leftComponent={<Check size={16} />}
            className="helix-btn-primary min-w-35  flex justify-center items-center"
          />

          <PressableBtn
            loading={isRejecting}
            handleClick={handleReject}
            title="Reject"
            leftComponent={<X size={16} />}
            className="helix-btn-secondary border-[#E74C3C]! flex-1 text-[#E74C3C]!  min-w-35   justify-center  inline-flex items-center gap-2"
          />
        </div>
      </div>
    </article>
  );
};

export default VerificationCard;
