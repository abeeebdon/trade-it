'use client';
import { useState } from 'react';
import { ROLES } from '../components/data';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { authRoleType } from '@/types';

const GetStarted = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<authRoleType | null>(null);
  const handleProceed = () => {
    if (selected) {
      router.push(`/register/?role=${selected}`);
      return;
    } else {
      return toast.message('You have not selected any type ');
    }
  };
  return (
    <div className="w-full mx-auto p-6 my-6 max-w-4xl fade-up">
      <div className="text-center mb-8">
        <div className="helix-kicker mb-2">Jomp Shop · Create account</div>
        <h1 className="helix-h2">How would you like to use Jomp Shop?</h1>
        <p className="text-[#9CA3AF] text-sm mt-2">
          Pick the path that fits — you can change later in settings.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {ROLES.map((r) => {
          const Icon = r.Icon;
          const active = selected === r.value;
          return (
            <button
              key={r.value}
              onClick={() => setSelected(r.value)}
              className={`helix-card p-6 text-left transition-all ${active ? 'border-[#C9922A] ring-2 ring-[#C9922A]/30' : 'hover:border-[#1A7A6E]/60'}`}
              data-testid={`role-card-${r.value}`}
            >
              <div className="flex items-start justify-between">
                <Icon
                  size={30}
                  className={active ? 'text-[#C9922A]' : 'text-[#1A7A6E]'}
                />
                {active && <CheckCircle size={18} className="text-[#C9922A]" />}
              </div>
              <div className="mt-5">
                <div className="helix-h3 text-[16px]">{r.title}</div>
                <div className="text-[12px] text-[#1A7A6E] font-mono tracking-wider uppercase mt-1">
                  {r.sub}
                </div>
              </div>
              <p className="text-[13px] text-[#9CA3AF] mt-3 leading-relaxed">
                {r.blurb}
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#C9922A]/80 border border-[#C9922A]/30 rounded-full px-2.5 py-1">
                {r.pill}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={handleProceed}
          className="helix-btn-primary px-8"
          data-testid="role-continue-btn"
        >
          Continue as{' '}
          {selected ? <span className="capitalize">{selected}</span> : '→'}
        </button>
      </div>
      <div className="mt-8 text-center text-[13px] text-[#9CA3AF]">
        Already have an account?{' '}
        <Link href="/login" className="text-[#C9922A] font-semibold">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
