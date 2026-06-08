'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

import useGetUserTypes from '../hooks/useGetUserTypes';
import RoleCard from '../components/RoleCard';
import { ROLE_VALUES } from '../components/helper';
import RoleCardSkeleton from '../components/RoleCardKeleton';
import { useAppDispatch } from '@/hooks/store/store';
import { setUserRole } from '@/store/auth/auth.slice';
import { AuthRole } from '@/types';

const GetStarted = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<AuthRole | null>(null);
  const handleProceed = () => {
    if (selected) {
      dispatch(setUserRole(selected));
      router.push(`/register/?role=${selected.name}`);
      return;
    } else {
      return toast.message('You have not selected any type ');
    }
  };

  const { data, isLoading } = useGetUserTypes();

  const userTypes: AuthRole[] = data
    ? data
        .filter((d: AuthRole) => d.id <= 3)
        .map((r: AuthRole) => ({ ...r, value: ROLE_VALUES[r.id - 1] }))
    : [];

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
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <RoleCardSkeleton key={i} />
            ))
          : userTypes
              ?.sort((a, b) => a.id - b.id)
              .map((r) => {
                const active = selected?.id === r.id;
                return (
                  <RoleCard
                    key={r.id}
                    r={r}
                    active={active}
                    setSelected={setSelected}
                  />
                );
              })}
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button onClick={handleProceed} className="helix-btn-primary px-8">
          Continue as{' '}
          {selected ? <span className="capitalize">{selected.name}</span> : '→'}
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
