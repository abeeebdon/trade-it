import { CheckCircle } from 'lucide-react';
import { SteppersProps } from '../types/buyers';

const Steppers = ({ biz, step }: SteppersProps) => {
  return (
    <div className="flex items-center gap-4 mb-10">
      {[
        { n: 1, label: 'Business Profile', done: !!biz },
        {
          n: 2,
          label:
            biz?.registration_type === 'individual'
              ? 'KYC Documents'
              : 'KYB Documents',
          done:
            biz &&
            (biz.kyc_status === 'under_review' ||
              biz.kyb_status === 'under_review' ||
              biz.kyc_status === 'approved' ||
              biz.kyb_status === 'approved'),
        },
        { n: 3, label: 'Anchor Accounts', done: !!biz?.anchor_account_ngn },
      ].map((s, i) => (
        <div key={s.n} className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm ${s.done ? 'bg-[#C9922A] text-[#0A1628]' : step === s.n ? 'bg-[#1A7A6E] text-white' : 'bg-[#0F2040] border border-[#1A7A6E]/30 text-[#9CA3AF]'}`}
          >
            {s.done ? <CheckCircle size={16} /> : s.n}
          </div>
          <p className="text-[13px] font-medium">{s.label}</p>
          {i < 2 && <div className="w-10 h-px bg-[#1A7A6E]/30" />}
        </div>
      ))}
    </div>
  );
};

export default Steppers;
