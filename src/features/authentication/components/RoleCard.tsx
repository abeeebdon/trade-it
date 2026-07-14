import { CheckCircle } from 'lucide-react';
import { getRoleBlurb } from './helper';
import { AuthRole } from '@/types';

const RoleCard = ({
  r,
  active,
  setSelected,
}: {
  r: AuthRole;
  active: boolean;
  setSelected: (value: AuthRole) => void;
}) => {
  const role = getRoleBlurb(r.name.toLowerCase());
  const Icon = role?.Icon;

  return (
    <button
      onClick={() => setSelected(r)}
      className={`helix-card p-6 text-left transition-all ${
        active
          ? 'border-[#C9922A] ring-2 ring-[#C9922A]/30'
          : 'hover:border-[#1A7A6E]/60'
      }`}
    >
      <div className="flex items-start justify-between">
        {Icon ? <Icon /> : null}

        {active && <CheckCircle size={18} className="text-[#C9922A]" />}
      </div>
      <div className="mt-5">
        <p className="helix-h3 text-[16px]">{r.name}</p>
        <p className="text-[12px] text-[#1A7A6E] font-mono tracking-wider uppercase mt-1">
          {r.description}
        </p>
      </div>
      <p className="text-[13px] text-[#9CA3AF] mt-3 leading-relaxed">
        {' '}
        {role?.blurb}
      </p>{' '}
      <div className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#C9922A]/80 border border-[#C9922A]/30 rounded-full px-2.5 py-1">
        {' '}
        {role?.sub}
      </div>
    </button>
  );
};

export default RoleCard;
