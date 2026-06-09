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
            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm ${s.done ? 'bg-primary text-bg' : step === s.n ? 'bg-seconsary text-white' : 'bg-surface border border-secondary/30 text-muted'}`}
          >
            {s.done ? <CheckCircle size={16} /> : s.n}
          </div>
          <p className="text-[13px] font-medium">{s.label}</p>
          {i < 2 && <div className="w-10 h-px bg-secondary/30" />}
        </div>
      ))}
    </div>
  );
};

export default Steppers;
